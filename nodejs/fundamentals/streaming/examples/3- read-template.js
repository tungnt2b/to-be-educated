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

    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Page Not found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000.');
});
