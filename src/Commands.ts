import { Command } from './Command';
import AddFunds from './commands/AddFunds';
import Balance from './commands/Balance';
import Give from './commands/Give';
import Top from './commands/Top';

const Commands: Command[] = [Balance, AddFunds, Give, Top];

export default Commands;
