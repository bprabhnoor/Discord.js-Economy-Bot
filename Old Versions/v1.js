const Discord = require("discord.js");

//Future file system read and writing. Player character, stats, and reading csv and txt files.
const fs = require("fs");

const { token } = require("./config.json");

const client = new Discord.Client();

// To Do: Display update: server info
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("guildMemberAdd", (member) => {
  // Creates profile
  // To Do: needs testing by joining and leaving server
  fs.open("users/" + member.id, "w", function (err, file) {
    if (err) {
      client.channels.cache
        .get(`1001568565364789248`)
        .send("Unable to create profile for new user, please contact Paul.");
      console.log(err);
    } else {
      client.channels.cache
        .get(`1001568565364789248`)
        .send(
          "Welcome to the server." +
            member.user.username +
            " Your profile has been created."
        );
    }
  });
});

client.on("message", (message) => {
  if (message.content === "commands") {
    message.reply("stats, profilereset, rarity, opendoor");
  } else if (message.content === "stats") {
    // Reads user txt file
    fs.readFile("users/" + message.member.id, (err, data) => {
      if (err) {
        message.reply(
          "You have no profile. Please create a profile using profilecreate."
        );
      } else {
        message.reply("Your stats: " + data);
      }
    });
  } else if (message.content === "profilereset") {
    // Reset save file
    fs.writeFile(
      "users/" + message.member.id,
      "Hello content!",
      function (err) {
        if (err) {
          console.log(err);
        }
        message.reply("Profile reset.");
      }
    );
  } else if (message.content === "rarity") {
    // Spawns thing, gives rartiy, saves to user.
    // Thing, Rarity, Quality, Pattern
    var items = Array(
      "SSG 08",
      "M4A4 Howl",
      "AWP Dragon Lore",
      "Dual Berettas Cobalt Quartz",
      "Tec-9 Nuclear Threat",
      "P250 Nuclear Threat"
    );
    var item = items[Math.floor(Math.random() * items.length)];
    thing = "Item: " + item + " Quality: " + Math.random();
    message.reply(thing);
  } else if (message.content === "gameplay") {
    // To Do: makes images be an item and create different 
    
  } else if (message.content === "casino") {
    // To Do: Casino
  } else if (message.content.startsWith("opendoor")) {
    // Roll a door
    const doors = ["right", "left", "center"];
    var chosendoor = Math.floor(Math.random() * doors.length);
    // Pick a door
    if (message.content.includes("right")) {
      message.reply(
        "The door you choose is right. The correct door is " + doors[chosendoor]
      );
    } else if (message.content.includes("left")) {
      message.reply(
        "The door you choose is left. The correct door is " + doors[chosendoor]
      );
    } else if (message.content.includes("center")) {
      message.reply(
        "The door you choose is center. The correct door is " +
          doors[chosendoor]
      );
    }
  } else {
    // To Do: Check else syntax
  }
});

client.login(token);
