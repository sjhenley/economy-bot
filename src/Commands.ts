import { Command } from './Command';
import AddFunds from './commands/AddFunds';
import Balance from './commands/Balance';
import Give from './commands/Give';

const Commands: Command[] = [Balance, AddFunds, Give];

export default Commands;
