import React, { Component, createRef, RefObject } from 'react';
import Game from '../classes/TileMap.class';

class Index extends Component {
    worldRef: RefObject<HTMLCanvasElement>;
    windowRef: RefObject<HTMLDivElement>;
    isGameRunning: boolean;
    game: Game | null;
    constructor(props: object) {
        super(props);
        this.isGameRunning = false;
        this.worldRef = createRef<HTMLCanvasElement>();
        this.windowRef = createRef<HTMLDivElement>();
        this.game = null;
    }

    componentDidMount() {
        this.start();
    }

    async start() {
        if (!this.isGameRunning) {
            if (this.worldRef.current) {
                this.worldRef.current.width = window.innerWidth;
                this.worldRef.current.height = window.innerHeight;
            }
            this.game = new Game(this.windowRef.current, this.getContext());
            await this.game.init();
            this.renderGame();
        }
        this.isGameRunning = !this.isGameRunning;
    }

    renderGame = () => {
        requestAnimationFrame((elapsed) => {
            this.game?.render(elapsed);

            if (this.isGameRunning) {
                this.renderGame();
            }
        });
    };

    getContext = () => this.worldRef.current?.getContext('2d');

    render() {
        return (
            <div id="root">
                <canvas
                    ref={this.worldRef}
                    id="world"
                    width="512"
                    height="512"
                ></canvas>
                <div ref={this.windowRef} id="WindowMenu"></div>
            </div>
        );
    }
}
export default Index;
