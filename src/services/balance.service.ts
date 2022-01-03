import { BaseCommandInteraction, TextChannel } from 'discord.js';
import { memberNicknameMention } from '@discordjs/builders';

import balanceRepository from '../repositories/balanceRepository';
import User from '../models/User';
import { TOP_ROLE_ID, GENERAL_CHANNEL_ID } from '../const/idList';

class BalanceService {
  constructor(
    private repo = balanceRepository,
  ) {}

  async getBalance(discordID: number): Promise<number> {
    return this.repo.getBalanceByDiscordID(discordID);
  }

  async addBalanceToUser(discordID: number, amount: number): Promise<boolean> {
    const curBalance: number = await this.repo.getBalanceByDiscordID(discordID);
    return this.repo.putUser(new User(discordID, curBalance + amount));
  }

  async removeBalanceFromUser(discordID: number, amount: number): Promise<boolean> {
    const curBalance: number = await this.repo.getBalanceByDiscordID(discordID);
    if (curBalance < amount) {
      throw new Error('Insufficient account balance');
    }
    return this.repo.putUser(new User(discordID, curBalance - amount));
  }

  async calculateTopUser(interaction: BaseCommandInteraction): Promise<boolean> {
    // get the User Manager
    const { guild } = interaction;
    if (!guild) return false;
    const memberMngr = guild.members;

    // Get all users
    this.repo.getAllUsers().then((users) => {
      // find users with the highest balance
      const topUser = users.reduce((max, user) => (user.balance > max.balance ? user : max));
      const topUsers = users.filter((u) => u.balance === topUser.balance).map((u) => u.discordID);

      // Get the top role
      guild.roles.fetch(TOP_ROLE_ID).then((role) => {
        if (!role) {
          console.log('Role not found');
          return;
        }

        const curTopUsers = role.members.map((u) => parseInt(u.user.id, 10));
        console.log(`Current Top: ${curTopUsers}`);
        console.log(`New top: ${topUsers}`);

        if (!topUsers.every((u) => curTopUsers.includes(u))) {
          // Get list of guild members
          memberMngr.list({ limit: 100 }).then((members) => {
          // Build a list of top members' usernames for later
            const topUserNames: string[] = [];

            // Give top users the top role, remove from others
            members.forEach((u) => {
              if (topUsers.includes(parseInt(u.id, 10))) {
                u.roles.add(role);
                topUserNames.push(u.nickname || u.user?.username);
              } else {
                u.roles.remove(role);
              }
            });

            // Announce the new lounge lads
            guild.channels.fetch(GENERAL_CHANNEL_ID).then((channel) => {
              if (!channel) {
                console.log('Channel not found');
              } else {
                let topUserString = '';
                topUsers.forEach((u, idx) => {
                  topUserString += memberNicknameMention(u.toString());
                  if (topUserNames.length > 1 && idx !== topUserNames.length - 1) {
                    topUserString += ', ';
                  }
                });

                (channel as TextChannel).send(`Congrats to the new LoungeLad(s)! ${topUserString}`);
              }
            });
          });
        }
      });
    });

    return true;
  }
}

export default new BalanceService();
