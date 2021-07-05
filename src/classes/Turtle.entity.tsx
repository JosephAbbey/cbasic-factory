import Game from './TileMap.class';
import entity from './entity';

class Turtle extends entity {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y);
    }
}

export default Turtle;
