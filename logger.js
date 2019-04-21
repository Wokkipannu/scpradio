const moment = require('moment');

class Logger {
  constructor(options = {}) {
    this.format = options.format || 'DD.MM.YYYY HH.mm.ss'
  }

  log(message) {
    console.log(`[${moment().format(this.format)}] ${message}`);
  }
}

module.exports = Logger;