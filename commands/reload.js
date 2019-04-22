const path = require('path');

module.exports = class ReloadCommand {
  constructor(client) {
    this.client = client;
    this.name = 'reload';
    this.description = 'Reload a command';
  }

  run(msg, args) {
    if(!this.client.admins.includes(msg.author.id)) return; // Admin only command

    if (args) {
      try {
        delete require.cache[require.resolve(path.join(__dirname, args[0]))];
        const Command = require(path.join(__dirname, args[0]));
        const command = new Command(this.client);
        const name = this.client.capitalize(command.name) + 'Command';
        if (this.client.commands.get(name)) {
          this.client.commands.delete(name);
          this.client.commands.set(name, command);
          return msg.reply('Successfully reloaded command');
        }
        else {
          return msg.reply(`Command is not loaded. Use ${this.client.prefix}load instead.`);
        }
      }
      catch(error) {
        return console.error('Could not reload command', error);
      }
    }
    else {
      return msg.reply(`**Usage:** ${this.client.prefix}reload filename`);
    }
  }
}