const fs = require("fs");
const readline = require("readline");

async function* readlineAsyncGenerator(path) {
  const filestream = fs.createReadStream(path);

  const rl = readline.createInterface({
    input: filestream,
    srlfDelay: Infinity,
  });
  for await (const line of rl) {
    yield line;
  }
}

module.exports = readlineAsyncGenerator;
