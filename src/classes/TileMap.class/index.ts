import Loader from './Loader';
import TileMap from './TileMap';
import Camera from './Camera';
import Keyboard from './Keyboard';
import TerrainGen from './TerrainGen';
import block from '../block';
import Machine from '../Machine.block';

interface images {
    tiles: Array<CanvasImageSource>;
    selected: CanvasImageSource;
}

const directions = [0, Math.PI / 2, Math.PI, -Math.PI / 2];

export default class Game {
    context: CanvasRenderingContext2D | null | undefined;
    loader: Loader;
    tileMap: TileMap;
    blocks: Array<Array<block>>;
    camera: Camera;
    keyboard: Keyboard;
    _previousElapsed: number;
    images: images;
    targetSize: number;
    windowcontainer: HTMLDivElement | null;
    constructor(
        windowcontainer: HTMLDivElement | null,
        context: CanvasRenderingContext2D | null | undefined
    ) {
        this.targetSize = 32;
        this.windowcontainer = windowcontainer;
        this.context = context;
        this.loader = new Loader();
        this.tileMap = new TileMap(TerrainGen(100, 100));
        this.blocks = [[]];
        this.camera = new Camera(this, 512, 512);
        this.keyboard = new Keyboard();
        this._previousElapsed = 0;
        this.images = { tiles: [], selected: new Image() };
    }

    init = async () => {
        this.keyboard.listenForEvents([
            this.keyboard.LEFT,
            this.keyboard.RIGHT,
            this.keyboard.UP,
            this.keyboard.DOWN,
            this.keyboard.A,
            this.keyboard.D,
            this.keyboard.W,
            this.keyboard.S,
        ]);
        const tilesImg = await this.loader.loadImage(
            'tilesImg',
            '/assets/tiles.png'
        );
        const tilesarr: Array<CanvasImageSource> = [];
        for (
            var y = 0;
            y < tilesImg.naturalHeight;
            y += this.tileMap.tileSize
        ) {
            for (
                var x = 0;
                x < tilesImg.naturalWidth;
                x += this.tileMap.tileSize
            ) {
                var img = document.createElement('canvas');
                var ctx = img.getContext('2d');
                ctx?.drawImage(
                    tilesImg, // image
                    x, // source x
                    y, // source y
                    32, // source width
                    32, // source height
                    0, // target x
                    0, // target y
                    this.tileMap.tileSize, // target width
                    this.tileMap.tileSize // target height
                );
                var out = new Image();
                out.src = img.toDataURL();
                tilesarr.push(out);
            }
        }
        const selected = await this.loader.loadImage(
            'selected',
            '/assets/selected.png'
        );
        this.images = {
            tiles: tilesarr,
            selected,
        };
        this.camera.width = window.innerWidth;
        this.camera.height = window.innerHeight;
        this.camera.maxX =
            this.tileMap.columns * this.tileMap.tileSize - this.camera.width;
        this.camera.maxY =
            this.tileMap.rows * this.tileMap.tileSize - this.camera.height;
        this.blocks[0][0] = await new Machine(this, 0, 0).init();
        this.blocks[0][1] = await new Machine(this, 0, 1).init();
    };

    drawLayer = (layerIndex: number) => {
        var startColumn = Math.floor(this.camera.x / this.targetSize);
        var endColumn = startColumn + 1 + this.camera.width / this.targetSize;
        var startRow = Math.floor(this.camera.y / this.targetSize);
        var endRow = startRow + 1 + this.camera.height / this.targetSize;
        var offsetX = -this.camera.x + startColumn * this.targetSize;
        var offsetY = -this.camera.y + startRow * this.targetSize;

        for (
            let columnIndex = startColumn;
            columnIndex < endColumn;
            columnIndex++
        ) {
            for (let rowIndex = startRow; rowIndex < endRow; rowIndex++) {
                let tile = this.tileMap.getTile(
                    layerIndex,
                    columnIndex,
                    rowIndex
                );
                const x =
                    (columnIndex - startColumn) * this.targetSize + offsetX;
                const y = (rowIndex - startRow) * this.targetSize + offsetY;
                if (tile) {
                    // undefined => empty tile
                    this.context?.save();
                    this.context?.translate(Math.round(x), Math.round(y));
                    this.context?.translate(
                        0.5 * this.targetSize,
                        0.5 * this.targetSize
                    );
                    this.context?.rotate(directions[tile.rotation]);
                    this.context?.translate(
                        -0.5 * this.targetSize,
                        -0.5 * this.targetSize
                    );
                    this.context?.drawImage(
                        this.images.tiles[tile.tile], // image
                        0, // source x
                        0, // source y
                        this.tileMap.tileSize, // source width
                        this.tileMap.tileSize, // source height
                        0, // target x
                        0, // target y
                        this.targetSize, // target width
                        this.targetSize // target height
                    );
                    this.context?.restore();
                }
            }
        }
    };

    update = (delta: number) => {
        // handle camera movement with arrow keys
        let dirX = 0;
        let dirY = 0;
        if (
            this.keyboard.isDown(this.keyboard.LEFT) ||
            this.keyboard.isDown(this.keyboard.A)
        ) {
            dirX = -1;
        }
        if (
            this.keyboard.isDown(this.keyboard.RIGHT) ||
            this.keyboard.isDown(this.keyboard.D)
        ) {
            dirX = 1;
        }
        if (
            this.keyboard.isDown(this.keyboard.UP) ||
            this.keyboard.isDown(this.keyboard.W)
        ) {
            dirY = -1;
        }
        if (
            this.keyboard.isDown(this.keyboard.DOWN) ||
            this.keyboard.isDown(this.keyboard.S)
        ) {
            dirY = 1;
        }

        this.camera.move(delta, dirX, dirY);
    };

    getDelta = (elapsed: number) => {
        // compute delta time in seconds -- also cap it
        let delta = (elapsed - this._previousElapsed) / 1000.0;
        delta = Math.min(delta, 0.25); // maximum delta of 250 ms
        this._previousElapsed = elapsed;
        return delta;
    };

    interact(mouse) {
        if (this.blocks[mouse.x]?.[mouse.y])
            this.blocks[mouse.x][mouse.y].interact();
    }

    render(elapsed: number) {
        this.context?.clearRect(0, 0, this.camera.width, this.camera.height);
        this.update(this.getDelta(elapsed));
        for (var layer = 0; layer < this.tileMap.layers.length; layer++) {
            this.drawLayer(layer);
        }

        var mouse = this.camera.getMouse();
        for (var column of this.blocks) {
            for (var block of column) {
                if (block) {
                    block.render();
                }
            }
        }

        this.context?.drawImage(
            this.images.selected, // image
            0, // source x
            0, // source y
            64, // source width
            64, // source height
            mouse.x * this.targetSize - this.camera.x, // target x
            mouse.y * this.targetSize - this.camera.y, // target y
            this.targetSize, // target width
            this.targetSize // target height
        );
    }
}
