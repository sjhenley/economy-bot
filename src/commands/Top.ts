import { BaseCommandInteraction, Client } from 'discord.js';

import balanceService from 'src/services/balance.service';
import { Command } from '../Command';

const Top: Command = {
  name: 'top',
  description: 'Returns users with the highest balance',
  type: 'CHAT_INPUT',
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    balanceService.getAll().then(async (users) => {
      users.sort((a, b) => b.balance - a.balance);
      let msg: string = 'Top Users:\n';
      for (let i = 0; i < 5; i += 1) {
        const username = client.users.fetch(users[i].discordID.toString());
        msg += `${i + 1}. ${username} (${users[i].balance})\n`;
      }
      await interaction.followUp({
        ephemeral: true,
        content: msg,
      });
    }).catch(async (err) => {
      console.error(err);
      await interaction.followUp({
        ephemeral: true,
        content: 'An error occurred while processing this request',
      });
    });
  },
};

export default Top;
