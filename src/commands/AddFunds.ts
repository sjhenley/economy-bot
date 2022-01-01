import { BaseCommandInteraction, Client } from 'discord.js';
import { Command } from '../Command';
import balanceService from '../services/balance.service';

const AddFunds: Command = {
  name: 'addfunds',
  description: 'Add funds to the given account',
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
      description: 'The amount of funds to add to the account',
      type: 4,
      required: true,
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const sourceUser = interaction.user;

    if (parseInt(sourceUser.id, 10) !== 192821137036541950) {
      await interaction.followUp({
        ephemeral: true,
        content: 'You are not admin!',
      });
    } else {
      const targetUser = interaction.options.getUser('user');
      const amount = interaction.options.get('amount')?.value;

      if (targetUser === null || !targetUser || !amount) {
        await interaction.followUp({
          ephemeral: true,
          content: 'Error finding user',
        });
      } else {
        try {
          await balanceService.addBalanceToUser(parseInt(targetUser.id, 10), amount as number);
          await interaction.followUp({
            ephemeral: true,
            content: `Added ${amount} loungebucks to ${targetUser.username}`,
          });
        } catch (err) {
          await interaction.followUp({
            ephemeral: true,
            content: 'could not add funds',
          });
        }
      }
    }
  },
};

export default AddFunds;
