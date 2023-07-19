const fs = require('fs');
const zlib = require('zlib');
const { Writable } = require('stream');

const readStream = fs.createReadStream('./assets/names.txt', {
  // encoding: 'utf8',
  // highWaterMark: 10,
});

// readStream.on('error', (err) => {
//   console.error(err);
// });

readStream.on('data', (chunk) => {
  console.log('chunk: ', chunk);
});

readStream.on('end', () => {
  console.log('end');
});

const writeStream = fs.createWriteStream('./assets/names-2.txt');
readStream.pipe(writeStream);

// const writeStream = fs.createWriteStream('./assets/names.txt.gz');
// const z = zlib.createGzip();
// readStream.pipe(z).pipe(writeStream);

// const writeStream = new Writable({
//   write(chunk, encoding, callback) {
//     console.log(chunk.toString());
//     callback();
//   },
// });
// readStream.pipe(writeStream);