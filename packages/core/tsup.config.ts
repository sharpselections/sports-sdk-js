import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
	entry: ["src/index.ts"], // Entry point of your package
	format: ["esm", "cjs"], // Output both ESM and CommonJS formats
	dts: true, // Generate .d.ts files
	splitting: false, // Disable code splitting for simplicity
	sourcemap: false, // Optionally enable sourcemaps
	clean: true, // Clean output directory before building
	external: [], // List your external dependencies here
	treeshake: true, // Enable tree-shaking
	target: "esnext", // Target modern JavaScript
	outDir: "dist", // Ensure output directory is correctly set
	...options,
}));