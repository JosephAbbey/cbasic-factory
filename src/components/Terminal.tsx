import * as React from 'react';
import ReactTerminal from 'react-terminal-component';
import Window from '../components/Window';

type TerminalProps = {};
const Terminal: React.FunctionComponent<TerminalProps> = ({}) => (
    <Window title="terminal">
        <ReactTerminal clickToFocus />
    </Window>
);
export default Terminal;
