import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
	entry: {
		'index': 'src/index.ts',
	},
	format: ["esm", "cjs"],
	dts: true,
	splitting: false,
	sourcemap: false,
	clean: true,
	treeshake: true,
	external: [],
	target: "esnext",
	outDir: "dist",
	...options,
}));