const moment = require('moment');

class JoinCommand {
  constructor(client) {
    this.client = client;
    this.name = 'join';
    this.connections = new Map();
    this.sounds = [
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio1.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio2.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio3.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio4.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio5.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio6.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio7.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio0.ogg",
      "sounds/scpradio8.ogg"
    ];
  }

  run(msg) {
    if (msg.member.voiceChannel) {
      if (this.connections.get(msg.guild.id)) return msg.reply('Connection already exists, cannot start a new one');
      msg.member.voiceChannel.join()
        .then(connection => {
          this.connections.set(msg.guild.id, { voice: connection, current: 0 });
          this.play(msg);
        });
    }
    else {
      return msg.reply('Join a voice channel first');
    }
  }

  async play(msg) {
    try {
      let connection = this.connections.get(msg.guild.id);
      if (!connection) {
        this.connections.delete(msg.guild.id);
        return console.error('Tried to play without a connection, deleting connection');
      }

      try {
        const dispatcher = connection.voice.playFile(this.sounds[connection.current], { volume: 0.1})
          .on('end', reason => {
            if (reason === 'leavecmd') return;
            connection.current = connection.current + 1;
            if (connection.current > this.sounds - 1) connection.current = 0;
            this.client.logger.log(`Playing ${this.sounds[connection.current]} in guild ${msg.guild.name} (${msg.guild.id})`);
            this.play(msg.guild.id);
          })
          .on('error', error => {
            console.error('Dispatcher error', error);
          });
      }
      catch(error) {
        console.error('Play function error', error);
      }
    }
    catch(error) {
      this.connections.delete(msg.guild.id);
      console.error('Failed to get connection', error);
    }
  }
}

module.exports = JoinCommand;