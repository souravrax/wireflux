import { defineConfig } from "wireflux";

export default defineConfig([
	{
		input: "http://localhost:8080/openapi",
		output: "./src/api/operations",
		fetchClient: "./src/api/fetchClient",
		types: "typescript",
	},
]);
