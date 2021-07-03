import React from 'react';
import Window from '../components/Window';

const Index: React.FunctionComponent = () => (
    <div>
        <Window title="test window">
            <h1>Hello</h1>
        </Window>
        <Window title="test window2">
            <h1>Hello World</h1>
        </Window>
    </div>
);
export default Index;
