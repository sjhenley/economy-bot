import { Client } from 'discord.js';

console.log('Bot is starting...');

require('dotenv').config();

const client = new Client({
  intents: [],
});

client.login(process.env.BOT_TOKEN);

console.log(client);
