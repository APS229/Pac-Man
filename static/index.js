window.onload = () => {
    const PLAYER_SPEED = 200;
    const GHOST_HUNT_SPEED = 250;
    const GHOST_RUN_SPEED = 500;
    const RUN_TIMER = 10000;
    const PLAYER_SEARCH_DISTANCE = 9;
    const SEARCH_DISTANCE_MAX = 10;
    const SEARCH_DISTANCE_MIN = 5;
    const GHOST_COLORS = ['red', 'green', 'orange', 'pink'];
    const MAP_SIZE = 23;
    const MAP = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 3, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 3, 0],
        [0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0],
        [0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0],
        [0, 2, 2, 2, 0, 2, 0, 2, 0, 2, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 0],
        [0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0],
        [0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
        [0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0],
        [2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 2, 2],
        [0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0],
        [0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
        [0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0],
        [0, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 2, 2, 0, 2, 0, 2, 0, 2, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 0],
        [0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0],
        [0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0],
        [0, 3, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    class Entity {
        constructor(positionX, positionY) {
            this.x = positionX;
            this.y = positionY;
            this.currentDirection = '';
            this.nextDirection = '';
        }

        checkMovement(direction) {
            if (direction === 'ArrowUp') {
                if (!MAP[this.y - 1][this.x] || MAP[this.y - 1][this.x] === 4) return;
            }
            else if (direction === 'ArrowDown') {
                if (!MAP[this.y + 1][this.x] || MAP[this.y + 1][this.x] === 4) return;
            }
            else if (direction === 'ArrowLeft') {
                if ((this.x !== 0 && !MAP[this.y][this.x - 1]) || MAP[this.y][this.x - 1] === 4) return;
            }
            else if (direction === 'ArrowRight') {
                if ((this.x !== MAP_SIZE - 1 && !MAP[this.y][this.x + 1]) || MAP[this.y][this.x + 1] === 4) return;
            }
            else return;
            return true;
        }

        move() {
            switch (this.currentDirection) {
                case 'ArrowUp':
                    this.y--;
                    break;
                case 'ArrowDown':
                    this.y++;
                    break;
                case 'ArrowLeft':
                    if (this.x === 0) {
                        // teleport to right side
                        this.x = MAP_SIZE - 1;
                        break;
                    }
                    this.x--;
                    break;
                case 'ArrowRight':
                    if (this.x === MAP_SIZE - 1) {
                        // teleport to left side
                        this.x = 0;
                        break;
                    }
                    this.x++;
                    break;
            }
        }
    }

    class Player extends Entity {
        constructor(positionX, positionY) {
            super(positionX, positionY);
            this.currentDirection = 'ArrowRight';
            this.steps = [];
        }

        move() {
            if (this.checkMovement(this.nextDirection)) this.currentDirection = this.nextDirection;
            if (!this.checkMovement(this.currentDirection)) return;
            super.move();
            return true;
        }

        changeDirection(direction) {
            this.nextDirection = direction;
        }
    }

    class Ghost extends Entity {
        constructor(positionX, positionY, color, num) {
            super(positionX, positionY);
            this.color = color;
            this.num = num;
            this.steps = [];
            this.chasingPlayer = false;
            this.phase = 'hunt';
        }

        getRandomSpace() {
            let x = 0, y = 0;
            do {
                x = Math.floor(Math.random() * MAP_SIZE);
                y = Math.floor(Math.random() * MAP_SIZE);
            } while ((x === this.x && y === this.y) || !MAP[y][x]);
            return { x, y };
        }

        pathFind(endX, endY) {
            const graph = new Graph(MAP);
            const start = graph.grid[this.y][this.x];
            const end = graph.grid[endY][endX];
            let steps = [...this.steps];
            if (this.phase === 'run') {
                if (this.chasingPlayer) {
                    this.chasingPlayer = false;
                    steps = [];
                }
                const playerSteps = astar.search(graph, end, start);
                let cords = this.getRandomSpace();
                steps = astar.search(graph, start, graph.grid[cords.y][cords.x]);
                if (playerSteps.length < PLAYER_SEARCH_DISTANCE) {
                    while (astar.search(graph, end, graph.grid[cords.y][cords.x]).length < PLAYER_SEARCH_DISTANCE || steps.length < SEARCH_DISTANCE_MIN) {
                        cords = this.getRandomSpace();
                        steps = astar.search(graph, start, graph.grid[cords.y][cords.x]);
                    }
                    steps = astar.search(graph, start, graph.grid[cords.y][cords.x]);
                }
                else if (!steps.length) {
                    steps = astar.search(graph, start, graph.grid[cords.y][cords.x]);
                    while (steps.length > SEARCH_DISTANCE_MAX || steps.length < SEARCH_DISTANCE_MIN) {
                        cords = this.getRandomSpace();
                        steps = astar.search(graph, start, graph.grid[cords.y][cords.x]);
                    }
                }
                return steps;
            }
            else {
                const nextSteps = astar.search(graph, start, end);
                if (nextSteps.length > PLAYER_SEARCH_DISTANCE) {
                    if (this.chasingPlayer) {
                        this.chasingPlayer = false;
                        steps = [];
                    }
                    // Keep following previous steps if not searching for the player
                    if (steps.length) return;
                    while (steps.length > SEARCH_DISTANCE_MAX || steps.length < SEARCH_DISTANCE_MIN) {
                        const cords = this.getRandomSpace();
                        steps = astar.search(graph, start, graph.grid[cords.y][cords.x]);
                    }
                    return steps;
                }
                else {
                    this.chasingPlayer = true;
                    return nextSteps;
                }
            }
        }

        move() {
            if (this.steps.length) {
                // MAP uses Y value before X value
                this.x = this.steps[0].y;
                this.y = this.steps[0].x;
                this.steps.shift();
            }
        }
    }

    let ghostSpeed = GHOST_HUNT_SPEED;
    let particles = 0;
    createMap();

    let started = false;
    document.getElementById('play').onclick = startGame;

    function createMap() {
        const mapElement = document.getElementById('map');
        for (let i = 0; i < MAP_SIZE; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < MAP_SIZE; j++) {
                const space = document.createElement('td');
                space.id = `${j} ${i}`;
                if (!MAP[i][j]) space.className = 'edge';
                else if (MAP[i][j] === 4) space.className = 'gate';
                else if (MAP[i][j] === 2 || MAP[i][j] === 3) {
                    const particle = document.createElement('div');
                    particle.className = MAP[i][j] === 2 ? 'particle' : 'bigParticle';
                    space.append(particle);
                }
                row.append(space);
            }
            mapElement.append(row);
        }
        const playerElement = document.createElement('div');
        playerElement.id = 'player';
        document.getElementById(`11 13`).append(playerElement);
        for (let i = 0; i < 4; i++) {
            const ghostElement = document.createElement('div');
            ghostElement.id = `ghost ${i}`;
            ghostElement.className = 'ghost';
            ghostElement.style.backgroundColor = GHOST_COLORS[i];
            const ghostX = i > 1 ? 10 + i : 9 + i;
            document.getElementById(`${ghostX} 11`).append(ghostElement);
        }
    }

    function createEntities() {
        if (window.player) delete window.player;
        window.player = new Player(11, 13);
        const playerElement = document.getElementById('player');
        document.getElementById(`${player.x} ${player.y}`).append(playerElement);

        if (window.ghosts?.length) delete window.ghosts;

        window.ghosts = [];

        for (let i = 0; i < 4; i++) {
            const ghost = new Ghost(i > 1 ? 10 + i : 9 + i, 11, GHOST_COLORS[i], i);
            ghosts.push(ghost);
            const ghostElement = document.getElementById(`ghost ${i}`);
            ghostElement.color = ghost.color;
            document.getElementById(`${ghost.x} ${ghost.y}`).append(ghostElement);
        }
    }

    function startGame() {
        if (started) return;
        started = true;
        particles = 254;
        window.gameMap = MAP;
        createEntities();
        // querySelectorAll over getElementsByClassName, HTMLCollection skips elements
        const hiddenParticles = document.querySelectorAll('.hiddenParticle');
        for (const hiddenParticle of hiddenParticles) {
            hiddenParticle.className = 'particle';
        }
        const hiddenBigParticles = document.querySelectorAll('.hiddenBigParticle');
        for (const hiddenBigParticle of hiddenBigParticles) {
            hiddenBigParticle.className = 'bigParticle';
        }
        document.getElementById('game_status').style.display = 'none';

        requestAnimationFrame(updateGame);
        updatePlayer();
        updateGhosts();

        window.onkeydown = event => {
            player.changeDirection(event.key);
        }
    }

    function updateGame() {
        for (const ghost of ghosts) {
            if (ghost.x === player.x && ghost.y === player.y) {
                if (ghost.phase === 'hunt') return endGame('lose');
                else {
                    ghost.x = ghost.num > 1 ? 10 + ghost.num : 9 + ghost.num;
                    ghost.y = 11;
                    ghost.steps = [];
                }
            }
            let steps = ghost.pathFind(player.x, player.y);
            if (steps) {
                // let stopMovement = false;
                // for (const nextGhost of ghosts) {
                //     if (ghost.num === nextGhost.num) continue;
                //     if (steps[0].x === nextGhost.x && steps[0].y === nextGhost.y) {
                //         stopMovement = true;
                //         break;
                //     }
                // }
                // if (stopMovement)steps = [];
                ghost.steps = steps;
            }
        }
        requestAnimationFrame(updateGame);
    }

    function updatePlayer() {
        if (!started) return;
        if (player.move()) {
            const playerElement = document.getElementById('player');
            const positionElement = document.getElementById(`${player.x} ${player.y}`);
            const particle = positionElement.getElementsByClassName('particle')[0] || positionElement.getElementsByClassName('bigParticle')[0];
            positionElement.append(playerElement);
            if (particle) {
                window.gameMap[player.y][player.x] = 1;
                particles--;
                if (!particles) return endGame('win');
                if (particle.className === 'bigParticle') {
                    clearTimeout(window.ghostRunTimer);
                    ghostSpeed = GHOST_RUN_SPEED;
                    for (const ghost of this.ghosts) {
                        ghost.phase = 'run';
                        const ghostElement = document.getElementById(`ghost ${ghost.num}`);
                        ghostElement.style.backgroundColor = 'grey';
                    }
                    window.ghostRunTimer = setTimeout(() => {
                        ghostSpeed = GHOST_HUNT_SPEED;
                        for (const ghost of this.ghosts) {
                            ghost.phase = 'hunt';
                            const ghostElement = document.getElementById(`ghost ${ghost.num}`);
                            ghostElement.style.backgroundColor = ghost.color;
                        }
                    }, RUN_TIMER);
                }
                particle.className === 'bigParticle' ? particle.className = 'hiddenBigParticle' : particle.className = 'hiddenParticle';
            }
        }
        window.playerInterval = setTimeout(() => {
            updatePlayer();
        }, PLAYER_SPEED);
    }

    function updateGhosts() {
        if (!started) return;
        for (const ghost of ghosts) {
            ghost.move();
            const ghostElement = document.getElementById(`ghost ${ghost.num}`);
            const positionElement = document.getElementById(`${ghost.x} ${ghost.y}`);
            positionElement.append(ghostElement);
        }
        window.ghostInterval = setTimeout(() => {
            updateGhosts();
        }, ghostSpeed);
    }

    function endGame(gameStatus) {
        clearTimeout(window.playerInterval);
        clearTimeout(window.ghostInterval);
        const gameStatusElement = document.getElementById('game_status');
        gameStatusElement.style.display = 'block';
        gameStatusElement.innerText = gameStatus === 'win' ? "YOU WIN!" : "GAME OVER";
        gameStatusElement.style.color = gameStatus === 'win' ? 'green' : 'red';
        document.getElementById('map').append(gameStatusElement);
        started = false;
    }
};