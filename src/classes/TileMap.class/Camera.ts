import Game from './';

var mouseX = 0,
    mouseY = 0;

export default class Camera {
    x: number;
    y: number;
    width: number;
    height: number;
    maxX: number;
    maxY: number;
    SPEED: number;
    game: Game;
    constructor(game: Game, width: number, height: number) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.maxX = game.tileMap.columns * game.targetSize - width;
        this.maxY = game.tileMap.rows * game.targetSize - height;
        this.SPEED = 256; // pixels per second
        document.onmousemove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        if (game.windowcontainer) {
            game.windowcontainer.onclick = () => {
                this.game.interact(this.getMouse());
            };
        }
        this.game = game;
    }

    move = (delta, dirX, dirY) => {
        // move camera
        this.x += dirX * this.SPEED * delta;
        this.y += dirY * this.SPEED * delta;
        // clamp values
        this.x = Math.max(0, Math.min(this.x, this.maxX));
        this.y = Math.max(0, Math.min(this.y, this.maxY));
    };

    getMouse() {
        return {
            x: Math.floor((mouseX + this.x) / this.game.targetSize),
            y: Math.floor((mouseY + this.y) / this.game.targetSize),
        };
    }
}
