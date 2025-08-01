import { z } from "zod";

export const wirefluxConfigSchema = z.array(
	z.object({
		input: z.string().describe("The input file to read the API from"),
		output: z.string().describe("The output file to write the API to"),
		fetchClient: z.string().describe("The fetch client to use for the API"),
		extendedClients: z
			.array(z.enum(["swr", "react-query"]))
			.optional()
			.describe(
				"The extended clients which depends on the fetch client, e.g. swr, react-query, etc.",
			),
		types: z
			.enum(["typescript", "zod"])
			.optional()
			.default("typescript")
			.describe("The type of the API, e.g. typescript, zod, etc."),
	}),
);

export type WirefluxConfig = z.infer<typeof wirefluxConfigSchema>;

export type ConfigExport =
	| WirefluxConfig
	| { config: WirefluxConfig }
	| { default: WirefluxConfig };

export type Flatten<T> = T extends object
	? { [K in keyof T]: Flatten<T[K]> }
	: T;
