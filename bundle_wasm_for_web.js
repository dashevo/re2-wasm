const fs = require('fs');

const fileToPatch = './build/wasm/re2.js';

const wasm = fs.readFileSync('./build/wasm/re2.wasm');
const wasmBase64 = wasm.toString('base64');

const codeToPaste = `
var wasmBinaryFile = "re2.wasm";

if (typeof window === "object") {
  const buf = Buffer.from("${wasmBase64}", "base64");
  var blob = new Blob([buf], { type: "application/wasm" });
  wasmBinaryFile = URL.createObjectURL(blob);
  scriptDirectory = '';
}
`;

const originalSourceCode = fs.readFileSync(fileToPatch, 'utf-8');
const modifiedSourceCode = originalSourceCode
    .replace(`var wasmBinaryFile="re2.wasm";`, codeToPaste);

fs.writeFileSync(fileToPatch, modifiedSourceCode, 'utf-8');

