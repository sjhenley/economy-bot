import { BaseCommandInteraction, Client } from 'discord.js';
import { Command } from '../Command';
import balanceService from '../services/balance.service';

const Balance: Command = {
  name: 'balance',
  description: 'Check the balance of a user',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'user',
      description: 'Target user',
      type: 6,
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const userParam = interaction.options.getUser('user');
    let targetUser;

    if (userParam) {
      targetUser = userParam;
    } else {
      targetUser = interaction.user;
    }

    const balance = await balanceService.getBalance(parseInt(targetUser.id, 10));

    await interaction.reply({
      ephemeral: true,
      content: `Balance for user ${targetUser.username} is ${balance} loungebucks`,
    });
  },
};

export default Balance;
