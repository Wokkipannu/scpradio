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
  .on('ready', () => {
    logger.log('Ready to play some tunes');
    client.user.setActivity('::help', { type: 'PLAYING' });
  })
  .on('command', (msg, cmd) => logger.log(`${msg.author.username} ran command ${cmd.name}`));

client.login(TOKEN);