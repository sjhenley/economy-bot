import { BaseCommandInteraction } from 'discord.js';

import balanceRepository from '../repositories/balanceRepository';
import User from '../models/User';

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
    // id of the top role
    const topRole = '927047429675692122';

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
      guild.roles.fetch(topRole).then((role) => {
        if (!role) {
          console.log('Role not found');
          return;
        }

        console.log(`Role: ${role.name}`);

        // Get list of guild members
        memberMngr.list({ limit: 100 }).then((members) => {
          // Give top users the top role, remove from others
          members.forEach((u) => {
            if (topUsers.includes(parseInt(u.id, 10))) {
              u.roles.add(role);
            } else {
              u.roles.remove(role);
            }
          });
        });
      });
    });

    return true;
  }
}

export default new BalanceService();
