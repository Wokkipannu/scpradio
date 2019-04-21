const Radio = require('./radio');
const Logger = require('./logger');
const { TOKEN, DEVTOKEN } = require('./config');

const logger = new Logger({
  format: 'DD.MM.YYYY HH.mm.ss'
});

const client = new Radio({
  prefix: '::',
  logger: logger
});

client
  .on('ready', () => logger.log('Ready!'))
  .on('message', msg => logger.log(`${msg.author.username}: ${msg.content}`))
  .on('command', (msg, cmd) => logger.log(`${msg.author.username} ran command ${cmd.name}`));

client.login(DEVTOKEN);