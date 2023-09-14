import csvtojson from 'csvtojson';
import fs from 'fs';
import readline from 'readline';

function handleError(error) {
  console.error('Something when wrong:', error);
}

function jsonToFile(jsonObj) {
  const outputStream = fs.createWriteStream(outputFilePath);
  jsonObj.forEach((item) => {
    outputStream.write(`${JSON.stringify(item)}\n`, (err) => {
      if (err) {
        handleError(err);
      }
    });
  });
}

function csvToText(inputFilePath) {
  const inputStream = fs.createReadStream(inputFilePath);

  const rl = readline.createInterface({input: inputStream});

  let csvContent = '';

  rl.on('line', (line) => {
    csvContent += line + '\n\n';
  });

  rl.on('error', (error) => {
    handleError(error);
  });

  rl.on('close', () => {
    csvtojson({trim: true})
      .fromString(csvContent)
      .then(jsonToFile)
  });
}

const inputFilePath = './csvdirectory/hw1.csv';
const outputFilePath = './csvdirectory/hw1.txt';

csvToText(inputFilePath, outputFilePath);
