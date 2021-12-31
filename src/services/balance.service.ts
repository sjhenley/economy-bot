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
}

export default new BalanceService();
