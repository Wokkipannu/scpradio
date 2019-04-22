const path = require('path');

module.exports = class UnloadCommand {
  constructor(client) {
    this.client = client;
    this.name = 'unload';
    this.description = 'Unload a command';
  }

  run(msg, args) {
    if(!this.client.admins.includes(msg.author.id)) return; // Admin only command

    if (args) {
      try {
        const name = this.client.capitalize(args[0]) + 'Command';
        if (this.client.commands.get(name)) {
          delete require.cache[require.resolve(path.join(__dirname, args[0]))];
          this.client.commands.delete(name);
          return msg.reply('Command unloaded successfully');
        }
        else {
          return msg.reply('Command is not loaded');
        }
      }
      catch(error) {
        return console.error('Could not unload command', error);
      }
    }
    else {
      msg.reply(`**Usage**: ${this.client.prefix}unload filename`);
    }
  }
}