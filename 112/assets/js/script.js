var fetchAndInstantiateWasm = (url, imports) => {
  fetch(url)
    .then(res => {
      if (res.ok) {
        return res.arrayBuffer();
      } else {
        throw new Error(`Unable to fetch WASM`);
      }
    })
    .then(bytes => {
      return WebAssembly.compile(bytes);
    })
    .then(module => {
      return WebAssembly.instantiate(module);
    })
    .then(instance => {
      window.wasmSqrt = instance.exports.sqrt;
    });
};

fetchAndInstantiateWasm("assets/wasm/test.wasm");
