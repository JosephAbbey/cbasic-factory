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

    render() {
        var startColumn = Math.floor(this.game.camera.x / this.game.targetSize);
        var startRow = Math.floor(this.game.camera.y / this.game.targetSize);
        var offsetX = -this.game.camera.x + startColumn * this.game.targetSize;
        var offsetY = -this.game.camera.y + startRow * this.game.targetSize;

        const x = (this.x - startColumn) * this.game.targetSize + offsetX;
        const y = (this.y - startRow) * this.game.targetSize + offsetY;
        this.game.context?.save();
        this.game.context?.translate(Math.round(x), Math.round(y));
        this.game.context?.drawImage(
            this.texture, // image
            0, // source x
            0, // source y
            this.game.tileMap.tileSize, // source width
            this.game.tileMap.tileSize, // source height
            0, // target x
            0, // target y
            this.game.targetSize, // target width
            this.game.targetSize // target height
        );
        this.game.context?.restore();
    }

    interact(): boolean {
        return true;
    }
}

export default block;
