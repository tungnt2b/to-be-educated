const http = require('http');
const server = http.createServer();
const fs = require('fs');
const zlib = require('zlib');

server.on('request', (req, res) => {
  switch (req.url) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('Hello world!');
      res.end();
      break;

    case '/index':
      fs.readFile('./templates/index.html', (err, data) => {
        if (err) {
          console.error(err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Something went wrong');
          return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
      break;

    case '/download':
      const readStream = fs.createReadStream('./assets/mushroom.jpg');

      readStream.on('error', (err) => {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Something went wrong');
      });

      // readStream.on('data', (chunk) => {
      //   console.log('data: ', chunk);
      // });

      readStream.on('end', () => {
        console.log('end');
      });

      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      readStream.pipe(res);
      break;

    case '/upload':
      let filename = req.headers['filename'] || 'untitled';

      const writeStream = fs.createWriteStream(`./assets/upload/${filename}`);
      // const writeStream = fs.createWriteStream(`./assets/upload/${filename}.gz`);

      writeStream.on('error', (err) => {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Something went wrong');
      });

      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File uploaded');
      });

      req.pipe(writeStream);

      // const z = zlib.createGzip();
      // req.pipe(z).pipe(writeStream);

      break;

    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Page Not found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000.');
});
