class TimeCommand {
  constructor(client) {
    this.client = client;
    this.name = 'time';
  }

  async run(msg) {
    const connection = await this.connections.get(msg.guild.id);
    if (!connection) return msg.reply('Radio is not connected');

    msg.reply(`Radio has been playing for ${this.timeFormat(connection.dispatcher.time / 1000)} (${connection.dispatcher.time / 1000})`);
  }

  timeFormat(time) {
    let hrs = ~~(time / 3600);
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;

    let ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? 0 : '');
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
  }

  get connections() {
    return this.client.commands.get('JoinCommand').connections;
  }
}

module.exports = TimeCommand;