import { Client } from 'discord.js';
import Commands from '../Commands';

import { ADMIN_ID } from '../const/idList';

export default (client: Client): void => {
  client.on('ready', async () => {
    if (!client.user || !client.application) {
      return;
    }

    await client.application.commands.set(Commands);

    console.log(`${client.user.username} is online`);
    client.users.fetch(ADMIN_ID).then((user) => {
      user.send(client.user ? `${client.user.username} is online` : 'An error occurred');
    });
  });
};
