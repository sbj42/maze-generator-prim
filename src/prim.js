var core = require('@sbj42/maze-generator-core');
var GridMask = core.GridMask;
var dirs = core.directions;

/**
 * @typedef {Object} MGOptions
 * @property {Function} random Returns a random float between 0 (inclusive) and 1 (exclusive)
 */

/**
 * Chooses a random integer between 0 (inclusive) and max (exclusive)
 *
 * @param {MGOptions} options
 * @param {integer} max
 */
function randomInt(options, max) {
    return Math.floor(options.random() * max);
}

/**
 * Chooses a random element from an array
 *
 * @param {MGOptions} options
 * @param {Array} array
 */
function randomChoice(options, array) {
    return array[randomInt(options, array.length)];
}

/**
 * Returns which directions from the given cell lead to
 * cells in the given mask.  This is for deciding how to
 * connect a frontier cell to the maze.
 *
 * @param {GridMask} inMask
 * @param {integer[]} pos
 */
function getIncludedNeighborDirections(inMask, pos) {
    var ret = [];
    for (var i = 0; i < dirs.ALL.length; i ++) {
        var dir = dirs.ALL[i];
        if (inMask.get(pos[0] + dirs.dx(dir), pos[1] + dirs.dy(dir)))
            ret.push(dir);
    }
    return ret;
}

/**
 * Adds any neighbor from the outMask into the frontier array.
 *
 * @param {GridMask} outMask
 * @param {Array} frontier
 * @param {integer[]} pos
 */
function addNeighborsToFrontier(outMask, frontier, pos) {
    for (var i = 0; i < dirs.ALL.length; i ++) {
        var dir = dirs.ALL[i];
        var neighbor = [pos[0] + dirs.dx(dir), pos[1] + dirs.dy(dir)];
        if (outMask.get(neighbor[0], neighbor[1])) {
            frontier.push(neighbor);
            outMask.set(neighbor[0], neighbor[1], false);
        }
    }
}

/**
 * Prim's algorithm maze generator.
 *
 * @param {Maze} maze
 * @param {MGOptions} options
 */
function prim(maze, options) {
    var width = maze.width();
    var height = maze.height();

    // inMask tracks which cells have been added to the maze
    var inMask = new GridMask(width, height);
    // outMask tracks cells that are neither in the maze nor
    // in the "frontier".  At first, every cell in the grid
    // is in this mask.
    var outMask = new GridMask(width, height, {interior: true});

    // The frontier array tracks cells that are in the frontier
    var frontier = [];

    // Choose a random cell in the grid to start from
    var cur = [randomInt(options, width), randomInt(options, height)];

    // Take the initial cell out of outMask and put it in inMask
    // (it is now part of the maze)
    inMask.set(cur[0], cur[1], true);
    outMask.set(cur[0], cur[1], false);

    // Move all of its neighbors into the frontier
    addNeighborsToFrontier(outMask, frontier, cur);

    // Loop until the frontier is empty
    while (frontier.length > 0) {
        // Choose a random cell from the frontier
        var index = randomInt(options, frontier.length);
        // Get the cell and remove it from the frontier
        cur = frontier.splice(index, 1)[0];
        // Choose a random direction, toward a neighbor that is already in the maze
        var dir = randomChoice(options, getIncludedNeighborDirections(inMask, cur));

        // Connect the two cells
        maze.setPassage(cur[0], cur[1], dir, true);
        // This cell is now in the maze
        inMask.set(cur[0], cur[1], true);
        // And its neighbors are now in the frontier
        addNeighborsToFrontier(outMask, frontier, cur);
    }
}

module.exports = prim;
