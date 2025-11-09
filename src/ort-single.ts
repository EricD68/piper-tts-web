// Force ONNX Runtime Web to single-thread and non-threaded wasm.
// This file MUST be imported before any other use of onnxruntime-web.
import * as ort from "onnxruntime-web";

// 1) single thread, simd ok (doesn't require cross-origin isolation)
ort.env.wasm.numThreads = 1;
ort.env.wasm.simd = true;

// 2) prevent any later code from bumping threads back up
try {
  Object.defineProperty(ort.env.wasm, "numThreads", { value: 1, writable: false, configurable: false });
} catch { /* ignore if already locked */ }

// 3) (optional) stop the lib from selecting threaded wasm names
// If their code picks by filename, make sure only non-threaded names exist.
// If they set wasmPaths, we set them here to the non-threaded defaults:
if (!ort.env.wasm.wasmPaths) ort.env.wasm.wasmPaths = {};
// Provide the two non-threaded binaries (your consumer can override paths if they host locally)
ort.env.wasm.wasmPaths["wasm"]      = ort.env.wasm.wasmPaths["wasm"]      || "ort-wasm.wasm";
ort.env.wasm.wasmPaths["wasm-simd"] = ort.env.wasm.wasmPaths["wasm-simd"] || "ort-wasm-simd.wasm";

// Export re-usable ort in case other modules import it from globalThis
// @ts-ignore
(globalThis as any).ort = ort;
export { ort };
