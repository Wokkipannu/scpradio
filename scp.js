const Radio = require('./radio');
const Logger = require('./logger');
const { TOKEN } = require('./config');

const logger = new Logger({
  format: 'DD.MM.YYYY HH.mm.ss'
});

const client = new Radio({
  prefix: '::',
  logger: logger
});

client
  .on('ready', () => logger.log('Ready!'))
  .on('message', msg => logger.log(`${msg.author.username}: ${msg.content}`));

client.login(TOKEN);