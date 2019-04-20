const Discord = require('discord.js');

const client = new Discord.Client();
const { TOKEN } = require('./config')

client.login(TOKEN);



// Queue in which order to play
const soundsQueue = [
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

// Connections map
let connections = new Map();

client.on('ready', () => {
  console.log('Radio has entered the facility');
});

// When we recieve a message
client.on('message', msg => {
  // If it is a command
  if (msg.content.startsWith('.scp')) {
    // If command is to join
    if (msg.content === '.scp join') {
      // Check if user is in a voice channel
      if (msg.member.voiceChannel) {
        // Connect to voice channel
        msg.member.voiceChannel.join()
          .then(connection => {
            connections.set(msg.guild.id, { channel: connection, current: 0 }); // Set required values for guild
            play(msg.guild.id); // Start playing
          });
      }
      else {
        // Tell user to join a channel
        msg.reply('Tune to a channel to listen');
      }
    }
    // If command is to leave
    if (msg.content === '.scp leave') {
      let connection = connections.get(msg.guild.id); // Get the existing connection
      connection.channel.leave(); // Leave the channel
      connections.delete(msg.guild.id); // Delete map
      msg.reply('Radio has left the facility');
    }
  }
});

async function play(guild) {
  // Get the connection
  let connection = connections.get(guild);
  // If connection does not exist
  if (!connection) {
    connections.delete(guild); // Delete connection
    return console.error('Tried to play without a connection, deleting connection'); // Return error
  }
  // Try playing
  try {
    // Create dispatcher
    const dispatcher = connection.channel.playFile(soundsQueue[connection.current], { volume: 0.25 })
      .on('end', reason => {
        console.log('Stream ended', reason);
        connection.current = connection.current + 1; // Shift to next sound in queue
        if (connection.current > soundsQueue.length) connection.current = 0; // If current is higher than queue lenght, reset it to 0
        console.log(`Playing ${soundsQueue[connection.current]} in guild ${guild}`);
        play(guild); // Play again
      })
      .on('error', error => {
        console.error('Dispatcher error', error); // Console log the error
      });
  }
  catch(error) {
    console.error('Play function error', error); // Console log the error
  }
}