import { BaseCommandInteraction, Client } from 'discord.js';
import { Command } from '../Command';
import balanceService from '../services/balance.service';

const Give: Command = {
  name: 'give',
  description: 'give funds to a user',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'user',
      description: 'Target user',
      type: 6,
      required: true,
    },
    {
      name: 'amount',
      description: 'The amount of funds to give',
      type: 4,
      required: true,
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const sourceUser = interaction.user;
    const targetUser = interaction.options.getUser('user');
    const amount = interaction.options.get('amount')?.value;

    if (targetUser !== null) {
      try {
        await balanceService.removeBalanceFromUser(parseInt(sourceUser.id, 10), amount as number);
        await balanceService.addBalanceToUser(parseInt(targetUser.id, 10), amount as number);

        await interaction.followUp({
          ephemeral: true,
          content: `Gave ${targetUser.username} ${amount} loungebucks`,
        });
      } catch (err) {
        await interaction.followUp({
          ephemeral: true,
          content: 'An error occurred',
        });
      }
    } else {
      await interaction.followUp({
        ephemeral: true,
        content: 'An error occurred',
      });
    }
  },
};

export default Give;
