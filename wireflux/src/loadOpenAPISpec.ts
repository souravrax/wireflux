import fs from "node:fs";
import path from "node:path";
import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPIV3_1 as OpenAPI } from "openapi-types";
import converter from "swagger2openapi";
import { parse } from "yaml";

const isUrl = (path: string) => {
	return path.startsWith("http");
};

const downloadSpec = async (path: string) => {
	const response = await fetch(path);
	const data = await response.json();
	return data;
};

export async function loadOpenAPISpec(
	inputPath: string,
): Promise<OpenAPI.Document> {
	if (!isUrl(inputPath)) {
		const filePath = path.resolve(inputPath);
		if (!fs.existsSync(filePath)) {
			throw new Error(`OpenAPI spec file not found: ${filePath}`);
		}
	}

	const derefSpec = await SwaggerParser.dereference(
		isUrl(inputPath) ? await downloadSpec(inputPath) : inputPath,
	);
	let convertedSpec: any;
	try {
		convertedSpec = (
			await converter.convertObj(parse(JSON.stringify(derefSpec)), {
				patch: true,
			})
		).openapi;
	} catch (e) {
		console.log(inputPath);
		convertedSpec = derefSpec;
	}
	return convertedSpec;
}
