const Discord = require("discord.js");

// Write, read, save
const fs = require("fs");

// Token retrevied from config file
const { token } = require("./config.json");

// Using old discord.js
const client = new Discord.Client();

// Prefix
const prefix = "//";

// Maybe add better notifcation on server upon startup
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  // Prevent bot msgs loop
  if (message.author.bot) return;

  //Prefix + Args System: Seperte all messages in to parts and turn all args into lowercase
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Don't read msg if no prefix with tests
  if (message.content.startsWith("//")) {
    /*
    message.reply("args: " + args + " command: " + command);
    console.log(args);
    console.log(args[0]);
    console.log(args[1]);
    console.log(command);
    */
  } else {
    return;
  }

  // Check if user has a profile
  function checkprofile() {
    fs.access("users/" + message.member.id, (err) => {
      if (err) {
        console.log(err);
        createprofile();
      }
    });
  }

  // Create a new profile
  function createprofile() {
    var profile = "Name: message.author, Balance: 0, Inventory: Empty";
    fs.writeFile("users/" + message.member.id, profile, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("The file has been saved!");
      }
    });
  }

  // Command reading
  switch (command) {
    case "stats":
      // Reads user txt file
      fs.readFile("users/" + message.member.id, (err, data) => {
        if (err) {
          message.reply("Profile Error. Please contact Paul.");
          console.log(err);
        } else {
          message.reply("Your stats: " + data);
        }
      });
      break;
    default:
      checkprofile();
      break;
  }
});

client.login(token);
