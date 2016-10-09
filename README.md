# maze-generator-backtrack
A maze generator based on Prim's algorithm

This is a plugin for the `sbj42/maze-generator` package.

Prim's algorithm tends to generate lots of dead-ends.

This algorithm works by digging multiple random passages at a time,
randomly deciding which passage to work on at each step.

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
