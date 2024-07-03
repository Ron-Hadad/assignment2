const path = require('path');
const fs = require('fs');

const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const fileLogger = path.join(logDirectory, 'log.txt');

const loggerAppend = (request, response, next) => {
  const log1 = `${request.method}\n
                ${new Date().toString()}\n
                ${request.url} ${JSON.stringify(request.body)}\n`;
  fs.appendFileSync(fileLogger, log1);
  next();
};

module.exports = loggerAppend;
