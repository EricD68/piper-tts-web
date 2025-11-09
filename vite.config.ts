import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/entry-single.ts",
      name: "piper-tts-web",
      fileName: () => "piper-tts-web.js",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["onnxruntime-web"],
    },
    sourcemap: false,
    minify: true,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: "dist",
    }),
  ],
});
