import * as React from 'react';
import ReactTerminal from 'react-terminal-component';
import Window from './Window';
import Machine from '../classes/Machine.block';

type TerminalProps = {
    computer: Machine;
};
const Terminal: React.FunctionComponent<TerminalProps> = (
    {
        // computer
    }
) => (
    <Window title="terminal">
        <ReactTerminal clickToFocus />
    </Window>
);
export default Terminal;
