# maze-generator-prim
A maze generator using a randomized Prim's algorithm

This is a plugin for the `sbj42/maze-generator` package.

Prim's algorithm is a method of generating a "minimum spanning tree"
of an arbitrary graph.  This adapts naturally to generating mazes,
since every perfect maze is also a spanning tree.  The walls in the
maze are given equal weight, so we replace the part of Prim's
algorithm that finds the minimum-weight edge with code that simply
chooses a random edge.

Basically, this algorithm works by digging multiple random passages
at a time, randomly deciding which passage to work on at each step.
Compared to the 'recursive-backtracking' algorithm, this generator
tends to have more, shorter dead ends.

```
___________________________________________________
|__ | |__ | | _ _ _ | __| ____| | ____| ______| _ |
| |__ | | ____| |_|______ |____ ___ ___ | _____ |_|
|____ |___| | |_| _ ____| __|___| _ __|_| ____|_| |
|__ _________ |___| | | | _ | | |_| | | ____| | __|
| |_|______ ___ _ |__ __|_| | | | | ___ ______| | |
| | |__ |__ | | |____ __|__ __|__ | __| ___ | | __|
|________ |_| __| _ |____ _ | | | _ | |___| ___ | |
| __|____ ____|___| | __| |__ ___ |___| __| |__ _ |
| __| ___ | __|____ __| |_|__ |__ _ ____| | __|_| |
| ____|___| ___ | | ___ _ _ _ |__ |_| ___ |_|__ __|
| |__ |____ | |__ |_|__ | | |___| _ _ __|__ |____ |
|___| ___ |_|__ _____ __| |_| _ | |_|_____| ____| |
|__ |_|__ _ _ _ __| ____| |___| _ _ ____| |_| __| |
|____ _ _ | |_| __|_|____ | ___ | | __| | ____| |_|
|_____|_|_|___|___|_______|_|___|_|_______________|
```
