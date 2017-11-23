(async () => {
  // const main = Module.cwrap('run');
  const run = Module.cwrap('run', null, ['number', 'number']);
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext('2d');

  canvas.width = 256;
  canvas.height = 240;

  const res = await fetch('./roms/giko005.nes');
  const arrayBuf = await res.arrayBuffer();
  const nes = new Uint8Array(arrayBuf);
  const size = nes.byteLength;
  const ptr = Module._malloc(size);
  const buf = new Uint8Array(Module.HEAPU8.buffer, ptr, size);
  for (let i = 0; i < nes.length - 1; i = i + 1) {
    buf[i] = nes[i];
  }
  run(size, buf.byteOffset);
  // main();
})().catch(e => {
  if (e == 'SimulateInfiniteLoop') {
    Module['noExitRuntime'] = true;
    return;
  }
});




