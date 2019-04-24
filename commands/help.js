const { MessageEmbed } = require('discord.js');

module.exports = class HelpCommand {
  constructor(client) {
    this.client = client;
    this.name = 'help';
    this.description = 'Display list of commands';
  }

  run(msg) {
    let embed = new MessageEmbed()
      .setColor('3bff00')
      .setTitle('Commands');

    this.client.commands.forEach(command => {
      embed.addField(command.name, command.description, false);
    });

    return msg.reply(embed);
  }
}