const http = require('http');
const server = http.createServer();
const fs = require('fs');

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
      const readStream = fs.createReadStream('./assets/mushroom.jpg', {
        // encoding: 'utf8',
      });

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

    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Page Not found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000.');
});
