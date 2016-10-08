var support = require('@sbj42/maze-generator-support');
var GridMask = support.GridMask;
var dirs = support.directions;

function randomInt(options, max) {
    return Math.floor(options.random() * max);
}
function randomChoice(options, array) {
    return array[randomInt(options, array.length)];
}

function prim(maze, options) {
    var width = maze.width();
    var height = maze.height();
    var inMask = new GridMask(width, height);
    var outMask = new GridMask(width, height, {interior: true});

    function getIncludedNeighborDirections(pos) {
        var ret = [];
        for (var i = 0; i < dirs.ALL.length; i ++) {
            var dir = dirs.ALL[i];
            if (inMask.get(pos[0] + dirs.dx(dir), pos[1] + dirs.dy(dir)))
                ret.push(dir);
        }
        return ret;
    }

    function addToFrontier(pos) {
        frontier.push(pos);
        outMask.set(pos[0], pos[1], false);
    }

    function addExcludedNeighborsToFrontier(pos) {
        for (var i = 0; i < dirs.ALL.length; i ++) {
            var dir = dirs.ALL[i];
            var neighbor = [pos[0] + dirs.dx(dir), pos[1] + dirs.dy(dir)];
            if (outMask.get(neighbor[0], neighbor[1]))
                addToFrontier(neighbor);
        }
    }

    var frontier = [];

    var cur = [randomInt(options, width), randomInt(options, height)];
    inMask.set(cur[0], cur[1], true);
    outMask.set(cur[0], cur[1], false);

    addExcludedNeighborsToFrontier(cur);

    while (frontier.length > 0) {
        var index = randomInt(options, frontier.length);
        cur = frontier.splice(index, 1)[0];
        addExcludedNeighborsToFrontier(cur);
        var neighbors = getIncludedNeighborDirections(cur);
        if (neighbors.length) {
            var dir = randomChoice(options, neighbors);
            maze.setPassage(cur[0], cur[1], dir, true);
            inMask.set(cur[0], cur[1], true);
        }
    }
}

module.exports = prim;
