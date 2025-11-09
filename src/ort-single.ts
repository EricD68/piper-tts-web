// Force ONNX Runtime Web to single-thread and use NON-threaded wasm.
// MUST run before anything else imports onnxruntime-web.
import * as ort from "onnxruntime-web";

// 1) lock threads + allow SIMD (no COEP needed)
ort.env.wasm.numThreads = 1;
ort.env.wasm.simd = true;
try {
  Object.defineProperty(ort.env.wasm, "numThreads", { value: 1, writable: false, configurable: false });
} catch { /* already locked */ }

// 2) tell ORT where to load the NON-threaded binaries (typesafe way)
ort.env.wasm.wasmPaths = "/piper/runtime/"; 
// (It will look for /piper/runtime/ort-wasm.wasm and /piper/runtime/ort-wasm-simd.wasm)

// Optional: expose for sanity checks
// @ts-ignore
(globalThis as any).ort = ort;

export { ort };
