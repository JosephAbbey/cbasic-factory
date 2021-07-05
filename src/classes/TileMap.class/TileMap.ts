enum tiles {
    lightgrass1,
    lightgrass2,
    lightgrass3,
    lightgrass4,
    nothing1,
    nothing2,
    lightgrassp1,
    lightgrassp2,
    lightgrassp3,
    lightgrassp4,
    lightgrassp5,
    lightgrassp6,
    darkgrass1,
    darkgrass2,
    darkgrass3,
    darkgrass4,
    nothing3,
    nothing4,
    darkgrassp1,
    darkgrassp2,
    darkgrassp3,
    darkgrassp4,
    darkgrassp5,
    darkgrassp6,
    flowers1,
    flowers2,
    flowers3,
    flowers4,
    flowers5,
    flowers6,
    flowers7,
    flowers8,
    flowers9,
    flowers10,
    nothing5,
    nothing6,
    dirt1,
    dirt2,
    dirt3,
    gravel,
    nothing7,
    red,
    sand,
    water,
}

class Tile {
    tile: tiles;
    rotation: number;
    constructor(tile: tiles, rotation: number) {
        this.tile = tile;
        this.rotation = rotation;
    }
}

export default class TileMap {
    columns: number;
    rows: number;
    tileSize: number;
    layers: Array<Array<Array<Tile>>>;
    constructor(layers: Array<Array<Array<Tile>>>) {
        console.log(layers);
        this.columns = 100;
        this.rows = 100;
        this.tileSize = 32;
        this.layers = layers;
    }

    getTile(layerIndex: number, columnIndex: number, rowIndex: number) {
        try {
            return this.layers[layerIndex][rowIndex][columnIndex];
        } catch {
            return undefined;
        }
    }
}
export { Tile, tiles };
