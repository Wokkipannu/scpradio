const Discord = require('discord.js');
const path = require('path');

class Radio extends Discord.Client {
  constructor(options = {}) {
    super();
    this.prefix = options.prefix || '!';
    this.logger = options.logger;

    //this.commands = [];
    this.commands = new Map();
    this.commandsPath = options.commandsPath || 'commands';
    this.registerCommands();

    this.on('message', message => this.handleMessage(message));
  }

  registerCommands() {
    let that = this;
    require('require-all')({
      dirname: path.join(__dirname, 'commands'),
      resolve: function(Command) {
        that.commands.set(Command.name, new Command(that));
      }
    })
  }

  handleMessage(msg) {
    try {
      if (msg.content.startsWith(this.prefix)) {
        const command = this.commands.get(this.capitalize(msg.content.split(this.prefix)[1]) + 'Command');
        if (command) {
          this.emit('command', msg, command);
          return command.run(msg);
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