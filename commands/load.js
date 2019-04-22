const path = require('path');

module.exports = class LoadCommand {
  constructor(client) {
    this.client = client;
    this.name = 'load';
    this.description = 'Load a new command';
  }

  run(msg, args) {
    if(!this.client.admins.includes(msg.author.id)) return; // Admin only command

    if (args) {
      try {
        const Command = require(path.join(__dirname, args[0]));
        const command = new Command(this.client);
        const name = this.client.capitalize(command.name) + 'Command';
        if (this.client.commands.get(name)) return msg.reply('Command is already loaded');
        this.client.commands.set(command.name, command);
        return msg.reply(`Command ${command.name} loaded successfully`);
      }
      catch(error) {
        msg.reply('Command load failed');
        return console.error('Could not load a command', error);
      }
    }
    else {
      return msg.reply(`**Usage:** ${this.client.prefix}load filename`);
    }
  }
}