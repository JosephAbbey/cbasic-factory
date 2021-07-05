import Game from './TileMap.class';
import { tiles } from './TileMap.class/TileMap';

class block {
    texture: CanvasImageSource;
    game: Game;
    x: number;
    y: number;
    constructor(game: Game, x: number, y: number) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.texture = game.images.tiles[tiles.red];
    }

    // render() {
    //     return this.texture;
    // }

    interact(): boolean {
        return true;
    }
}

export default block;
