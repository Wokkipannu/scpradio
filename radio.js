const Discord = require('discord.js');
const path = require('path');

class Radio extends Discord.Client {
  constructor(options = {}) {
    super();
    this.prefix = options.prefix || '!';
    this.logger = options.logger;

    this.commands = new Map();
    this.commandsPath = options.commandsPath || 'commands';
    this.registerCommands();

    this.on('message', message => this.handleMessage(message));
  }

  registerCommands() {
    let that = this;
    require('require-all')({
      dirname: path.join(__dirname, this.commandsPath),
      resolve: function(Command) {
        that.commands.set(Command.name, new Command(that));
      }
    })
  }

  handleMessage(msg) {
    try {
      if (msg.content.startsWith(this.prefix)) {
        const args = msg.content.slice(this.prefix).trim().split(/ +/g);
        const cmd = args.shift().split(this.prefix)[1].toLowerCase();

        const command = this.commands.get(this.capitalize(cmd) + 'Command');
        if (command) {
          this.emit('command', msg, command);
          return command.run(msg, args);
        }
      }
    }
    catch(error) {
      return console.error(error);
    }
  }

  capitalize(word) {
    if (typeof word !== 'string') return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}

module.exports = Radio;