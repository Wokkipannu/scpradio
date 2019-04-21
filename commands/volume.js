class VolumeCommand {
  constructor(client) {
    this.client = client;
    this.name = 'volume';
  }

  async run(msg) {
    const connection = await this.connections.get(msg.guild.id);
    if (!connection) return msg.reply('Radio is not connected');

    let volume = parseInt(msg.content.split(" ")[1]);
    if (volume > 100 || volume < 1) return msg.reply('Volume must be between 1 and 100');
    volume = volume / 100;

    connection.dispatcher.setVolume(volume);
  }

  get connections() {
    return this.client.commands.get('JoinCommand').connections;
  }
}

module.exports = VolumeCommand;