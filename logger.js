const moment = require('moment');

class Logger {
  constructor(options = {}) {
    this.format = options.format || 'DD.MM.YYYY HH.mm.ss'
  }

  log(message, param) {
    if (param) console.log(`[${moment().format(this.format)}] ${message}`, param);
    else console.log(`[${moment().format(this.format)}] ${message}`);
  }
}

module.exports = Logger;