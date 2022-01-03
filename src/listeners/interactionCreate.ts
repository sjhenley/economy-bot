import { BaseCommandInteraction, Client, Interaction } from 'discord.js';
import Commands from '../Commands';
import balanceService from '../services/balance.service';

const handleSlashCommand = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    interaction.followUp({ content: 'Command not found' });
    return;
  }

  await interaction.deferReply({ ephemeral: true });

  slashCommand.run(client, interaction);
};

export default (client: Client): void => {
  client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      await handleSlashCommand(client, interaction).then(() => balanceService.calculateTopUser(interaction));
    }
  });
};
