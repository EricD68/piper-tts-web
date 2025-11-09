import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/entry-single.ts",          // <- our entry that imports the lock first
      name: "piper-tts-web",
      fileName: () => "piper-tts-web.js",
      formats: ["es"],
    },
    outDir: "dist",                           // <- be explicit
    rollupOptions: {
      external: [],                           // <- DO NOT externalize ORT; we want the lock in-bundle
    },
    treeshake: false,                         // <- keep side-effects (the lock)
    sourcemap: false,
    minify: true
  },
  plugins: [
    dts({ insertTypesEntry: true, outDir: "dist" })
  ],
});
