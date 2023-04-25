const fs = require('fs');
const { Transform } = require('stream');

let wordCount = 0;

const wordCounter = new Transform({
  transform(chunk, encoding, callback) {
    const words = chunk.toString().split(/\s+/);
    wordCount += words.length;
    callback(null, chunk);
  }
});

const fileStream = fs.createReadStream('file.txt', 'utf8');
fileStream.pipe(wordCounter);

fileStream.on('end', () => {
  console.log(`Total word count: ${wordCount}`);
});