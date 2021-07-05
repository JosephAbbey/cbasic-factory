import ReactDom from 'react-dom';
import FS from './FS.class';
import block from './block';
import Game from './TileMap.class';
import Terminal from '../components/Terminal';

class Machine extends block {
    FS: FS;
    terminal: HTMLDivElement | null;
    constructor(game: Game, x: number, y: number) {
        super(game, x, y);
        this.FS = new FS();
        this.terminal = null;
    }

    async init() {
        this.texture = await this.game.loader.loadImage(
            'Machine',
            '/assets/Machine.png'
        );
        return this;
    }

    interact(): boolean {
        if (!this.game.windowcontainer) {
            return false;
        }
        if (this.terminal) {
            // @ts-ignore
            this.terminal?.focus();
        } else {
            this.terminal = document.createElement('div');
            this.terminal.classList.add('container');
            this.terminal.focus = () => {
                // @ts-ignore
                for (var e of this.terminal.parentElement.children) {
                    e.style.zIndex--;
                }
                // @ts-ignore
                this.terminal.style.zIndex = 100000;
            };
            this.game.windowcontainer.appendChild(this.terminal);
            ReactDom.render(<Terminal computer={this} />, this.terminal);
        }
        return true;
    }
}

export default Machine;
