import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
	entry: ["src/index.ts"], // Entry point of your package
	format: ["esm", "cjs"], // Output both ESM and CommonJS formats
	dts: true, // Generate .d.ts files
	splitting: false, // Disable code splitting for simplicity
	sourcemap: false, // Optionally enable sourcemaps
	clean: true, // Clean output directory before building
	external: [
		// Mark test-related packages as external
		"nock",
		"jest",
		"ts-jest",
		// Also exclude other Node.js-only dependencies
		"util",
		"process"
	],
	treeshake: true, // Enable tree-shaking
	target: "esnext", // Target modern JavaScript
	outDir: "dist", // Ensure output directory is correctly set
	...options,
}));