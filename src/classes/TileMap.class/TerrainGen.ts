import { Tile, tiles } from './TileMap';
import { noise, noiseSeed } from './perlin';

const dirt = [tiles.dirt1, tiles.dirt2, tiles.dirt3];
const lightgrass = [
    tiles.lightgrass1,
    tiles.lightgrass2,
    tiles.lightgrass3,
    tiles.lightgrass4,
];
const darkgrass = [
    tiles.darkgrass1,
    tiles.darkgrass2,
    tiles.darkgrass3,
    tiles.darkgrass4,
];
const flowers = [
    tiles.flowers1,
    tiles.flowers2,
    tiles.flowers3,
    tiles.flowers4,
    tiles.flowers5,
    tiles.flowers6,
    tiles.flowers7,
    tiles.flowers8,
    tiles.flowers9,
    tiles.flowers10,
];

function randomInt(max: number): number {
    return Math.round(Math.random() * max);
}

const scale = 0.05;
noiseSeed(new Date().getMilliseconds());

function getTile(x: number, y: number): tiles {
    var v = noise(x * scale, y * scale, 0);
    if (v < 0.2) {
        return tiles.water, 0;
    } else if (v < 0.4) {
        return tiles.sand, 0;
    } else if (v < 0.5) {
        return dirt[randomInt(2)];
    } else if (v < 0.6) {
        return lightgrass[randomInt(3)];
    } else {
        return darkgrass[randomInt(3)];
    }
}

// function getState(
//     bottom: number,
//     right: number,
//     top: number,
//     left: number,
//     bottom_left: number,
//     bottom_right: number,
//     top_left: number,
//     top_right: number
// ): number {
//     return (
//         bottom_right * 128 +
//         bottom_left * 64 +
//         top_left * 32 +
//         top_right * 16 +
//         bottom * 8 +
//         right * 4 +
//         top * 2 +
//         left * 1
//     );
// }

// function test(bits: string, test: RegExp): number | undefined {
//     for (var i = 0; i < 4; i++) {
//         if (bits.match(test)) return i;
//         bits =
//             bits[4] +
//             bits[7] +
//             bits[6] +
//             bits[5] +
//             bits[2] +
//             bits[1] +
//             bits[0] +
//             bits[3];
//     }
//     return undefined;
// }

export default function TerrainGen(
    width: number,
    height: number
): Array<Array<Array<Tile>>> {
    var layers: Array<Array<Array<Tile>>> = [];

    // perlin noise
    var layer: Array<Array<Tile>> = [];
    for (var x = 0; x < width; x++) {
        var column: Array<Tile> = [];
        for (var y = 0; y < height; y++) {
            column.push(new Tile(getTile(x, y), 0));
        }
        layer.push(column);
    }
    layers.push(layer);

    // // multi-material marching squares
    // var mslayers: Array<Array<Array<Tile>>> = [[], []];
    // for (var x = 0; x < width; x++) {
    //     for (var l of mslayers) {
    //         l[x] = [];
    //     }
    //     for (var y = 0; y < height; y++) {
    //         var tile: Tile = layer[x][y];
    //         if (!(tile.tile in lightgrass)) {
    //             var state = getState(
    //                 Number(layer[x + 1]?.[y]?.tile in lightgrass),
    //                 Number(layer[x]?.[y + 1]?.tile in lightgrass),
    //                 Number(layer[x - 1]?.[y]?.tile in lightgrass),
    //                 Number(layer[x]?.[y - 1]?.tile in lightgrass),
    //                 Number(layer[x + 1]?.[y - 1]?.tile in lightgrass),
    //                 Number(layer[x + 1]?.[y + 1]?.tile in lightgrass),
    //                 Number(layer[x - 1]?.[y - 1]?.tile in lightgrass),
    //                 Number(layer[x - 1]?.[y + 1]?.tile in lightgrass)
    //             );

    //             var binstate = state.toString(2).padStart(8, '0');

    //             var rotation = test(binstate, /[10][10]000010/g);
    //             if (rotation !== undefined && !mslayers[0][x][y]) {
    //                 mslayers[0][x][y] = new Tile(tiles.lightgrassp1, rotation);
    //             }
    //             rotation = test(binstate, /[10][10][10][10]0010/g);
    //             if (rotation !== undefined && !mslayers[0][x][y]) {
    //                 mslayers[0][x][y] = new Tile(tiles.lightgrassp2, rotation);
    //             }

    //             rotation = test(binstate, /00000110/g);
    //             if (rotation !== undefined && !mslayers[0][x][y]) {
    //                 mslayers[0][x][y] = new Tile(tiles.lightgrassp3, rotation);
    //             }
    //             rotation = test(binstate, /00010110/g);
    //             if (rotation !== undefined && !mslayers[0][x][y]) {
    //                 mslayers[0][x][y] = new Tile(tiles.lightgrassp4, rotation);
    //             }

    //             rotation = test(binstate, /00100000/g);
    //             if (rotation !== undefined && !mslayers[0][x][y]) {
    //                 mslayers[0][x][y] = new Tile(tiles.lightgrassp5, rotation);
    //             }

    //             rotation = test(binstate, /10100000/g);
    //             if (rotation !== undefined && !mslayers[0][x][y]) {
    //                 mslayers[0][x][y] = new Tile(tiles.lightgrassp6, rotation);
    //             }
    //         }
    //     }
    // }
    // layers = layers.concat(mslayers);

    // decorations
    var decorations: Array<Array<Tile>> = [];
    for (var x = 0; x < width; x++) {
        decorations[x] = [];
        for (var y = 0; y < height; y++) {
            var tile: Tile = layer[x][y];
            if (
                (lightgrass.includes(tile.tile) ||
                    darkgrass.includes(tile.tile)) &&
                !randomInt(10)
            ) {
                decorations[x][y] = new Tile(flowers[randomInt(9)], 0);
            } else if (dirt.includes(tile.tile) && !randomInt(10)) {
                decorations[x][y] = new Tile(tiles.gravel, 0);
            }
        }
    }
    layers.push(decorations);

    return layers;
}
