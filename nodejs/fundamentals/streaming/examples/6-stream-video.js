const http = require('http');
const server = http.createServer();
const fs = require('fs');

server.on('request', (req, res) => {
  switch (req.url) {
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

    case '/video':
      const range = req.headers.range;
      const videoPath = './assets/large-video.mp4';
      const videoSize = fs.statSync(videoPath).size;
      const CHUNK_SIZE = 10 ** 6; // 1MB
      const start = Number(range.replace(/\D/g, ''));
      const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
      const contentLength = end - start + 1;
      const headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, headers);
      const videoStream = fs.createReadStream(videoPath, { start, end });
      videoStream.pipe(res);
      break;

    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Page Not found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000.');
});
