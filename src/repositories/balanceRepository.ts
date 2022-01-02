import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';

import User from '../models/User';

class BalanceRepository {
  constructor(
    private client: DocumentClient = dynamo,
  ) {}

  async putUser(user: User): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'lounge-economy',
      Item: user,
      ReturnConsumedCapacity: 'TOTAL',
    };

    console.debug('Calling PUT action with the following paramaters: \n', params);

    try {
      const result = await this.client.put(params).promise();
      console.debug('Response from PUT action: \n', result);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getBalanceByDiscordID(discordID: number): Promise<number> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'lounge-economy',
      AttributesToGet: ['balance'],
      Key: {
        discordID,
      },
    };

    console.debug('Calling GET action with the following paramaters: \n', params);

    try {
      const result = await this.client.get(params).promise();
      console.debug('Response from GET action: \n', result);
      return result.Item ? result.Item.balance : 0;
    } catch (error) {
      console.error(error);
      throw new Error();
    }
  }
}

export default new BalanceRepository();
