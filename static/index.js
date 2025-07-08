window.onload = () => {
    const PLAYER_SPEED = 266;
    const PLAYER_SPAWN_X = 11;
    const PLAYER_SPAWN_Y = 13;
    const PLAYER_SEARCH_DISTANCE = 9;
    const GHOST_HUNT_SPEED = 333;
    const GHOST_RUN_SPEED = 532;
    const GHOST_COUNT = 4;
    const SPAWN_TIMER = 5000;
    const RUN_TIMER = 6000;
    const SEARCH_DISTANCE_MAX = 10;
    const SEARCH_DISTANCE_MIN = 5;
    const MAP_SIZE = 23;
    const MAP_DIMENSION = 690;
    const SPACE_SIZE = MAP_DIMENSION / MAP_SIZE;
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
        [0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 1, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
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

    window.spawnTimer = [];

    class Entity {
        constructor(positionX, positionY) {
            this.x = positionX;
            this.y = positionY;
        }
    }

    class Player extends Entity {
        constructor(positionX, positionY) {
            super(positionX, positionY);
            this.newX = this.x;
            this.newY = this.y;
            this.currentDirection = 'ArrowRight';
            this.nextDirection = '';
            this.steps = [];
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

        changeDirection(direction) {
            this.nextDirection = direction;
        }

        canMove() {
            if (this.checkMovement(this.nextDirection)) this.currentDirection = this.nextDirection;
            if (!this.checkMovement(this.currentDirection)) return;
            this.findNextSpot();
            return true;
        }

        findNextSpot() {
            switch (this.currentDirection) {
                case 'ArrowUp':
                    this.newY--;
                    break;
                case 'ArrowDown':
                    this.newY++;
                    break;
                case 'ArrowLeft':
                    if (this.newX === 0) {
                        // teleport to right side
                        this.newX = MAP_SIZE - 1;
                        break;
                    }
                    this.newX--;
                    break;
                case 'ArrowRight':
                    if (this.newX === MAP_SIZE - 1) {
                        // teleport to left side
                        this.newX = 0;
                        break;
                    }
                    this.newX++;
                    break;
            }
        }

        move() {
            this.x = this.newX;
            this.y = this.newY;
        }
    }

    class Ghost extends Entity {
        constructor(positionX, positionY, num) {
            super(positionX, positionY);
            this.num = num;
            this.steps = [];
            this.chasingPlayer = false;
            this.dead = false;
            this.phase = 'hunt';
            this.spawned = false;
            this.runDirection = '';
            this.grid = [];
            for (let i = 0; i < MAP_SIZE; i++) {
                this.grid[i] = [...MAP[i]];
            }
        }

        spawn() {
            const graph = new Graph(this.grid);
            const start = graph.grid[this.y][this.x];
            // space above the gate
            const end = graph.grid[9][11];
            this.steps = astar.search(graph, start, end);
            this.dead = false;
        }

        getRandomSpace() {
            let x = 0, y = 0;
            do {
                x = Math.floor(Math.random() * MAP_SIZE);
                y = Math.floor(Math.random() * MAP_SIZE);
            } while ((x === this.x && y === this.y) || !MAP[y][x]);
            return { x, y };
        }

        getNextRunSpot(graph) {
            let steps = [];
            switch (this.runDirection) {
                case 'right':
                    const rightX = this.y === 11 && this.x === MAP_SIZE - 1 ? 0 : this.x + 1;
                    steps = [graph.grid[this.y][rightX]];
                    break;
                case 'left':
                    const leftX = this.y === 11 && this.x === 0 ? MAP_SIZE - 1 : this.x - 1;
                    steps = [graph.grid[this.y][leftX]];
                    break;
                case 'down':
                    steps = [graph.grid[this.y + 1][this.x]];
                    break;
                case 'up':
                    steps = [graph.grid[this.y - 1][this.x]];
                    break;
            }
            return steps;
        }
        pathFind(endX, endY) {
            if (!this.spawned) return this.steps;
            let steps = [...this.steps];
            const graph = new Graph(this.grid);
            const start = graph.grid[this.y][this.x];
            const end = graph.grid[endY][endX];
            if (this.phase === 'run') {
                const directions = ['right', 'left', 'down', 'up'];
                if (!this.runDirection) this.runDirection = directions[Math.floor(Math.random() * 4)];

                steps = this.getNextRunSpot(graph);
                while (!steps[0]?.weight) {
                    this.runDirection = directions[Math.floor(Math.random() * 4)];
                    steps = this.getNextRunSpot(graph);
                }
                this.chasingPlayer = false;
                return steps;
            }
            else {
                this.runDirection = '';
                const nextSteps = astar.search(graph, start, end);
                if (nextSteps.length > PLAYER_SEARCH_DISTANCE) {
                    let maxSearchDistance = PLAYER_SEARCH_DISTANCE;
                    const leftTP = graph.grid[11][0], rightTP = graph.grid[11][22];
                    const stepsToLeftTP = astar.search(graph, start, leftTP);
                    const stepsToRightTP = astar.search(graph, start, rightTP);
                    const closestTPSteps = stepsToLeftTP.length > stepsToRightTP.length ? stepsToRightTP : stepsToLeftTP;
                    const oppositeTP = stepsToLeftTP.length > stepsToRightTP.length ? leftTP : rightTP;
                    // if num = 0 AKA red ghost, it will always chase the player
                    if (!this.num || closestTPSteps.length <= PLAYER_SEARCH_DISTANCE) {
                        // +1 step to travel to other TP space
                        maxSearchDistance -= closestTPSteps.length + 1;
                        if (!this.num || maxSearchDistance) {
                            // same logic as closestTPSteps but we pick the other TP space
                            const stepsTPToPlayer = astar.search(graph, oppositeTP, end);
                            if (!this.num || stepsTPToPlayer.length <= maxSearchDistance) {
                                closestTPSteps.push(oppositeTP);
                                steps = closestTPSteps.concat(stepsTPToPlayer);
                                if (!this.num && steps.length >= nextSteps.length) return nextSteps;
                                return steps;
                            }
                        }
                    }
                    if (this.chasingPlayer) {
                        this.chasingPlayer = false;
                        steps = [];
                    }
                    // Keep following previous steps if not searching for the player
                    if (steps.length) return steps;

                    maxSearchDistance = SEARCH_DISTANCE_MAX;
                    if (closestTPSteps.length < maxSearchDistance) maxSearchDistance -= closestTPSteps.length + 1;

                    while (steps.length > SEARCH_DISTANCE_MAX || steps.length < SEARCH_DISTANCE_MIN) {
                        const cords = this.getRandomSpace();
                        const stepsTPToCords = astar.search(graph, oppositeTP, graph.grid[cords.y][cords.x]);
                        if (maxSearchDistance && stepsTPToCords.length <= maxSearchDistance) {
                            if (stepsTPToCords.length <= maxSearchDistance) {
                                closestTPSteps.push(oppositeTP);
                                steps = closestTPSteps.concat(stepsTPToCords);
                            }
                        }
                        else {
                            steps = astar.search(graph, start, graph.grid[cords.y][cords.x]);
                        }
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
            // MAP uses Y value before X value
            this.x = this.steps[0].y;
            this.y = this.steps[0].x;
            this.steps.shift();

            if (!this.steps.length && !this.spawned) {
                this.spawned = true;
                this.grid[10][11] = 0;
            }
        }

        die() {
            this.steps = [];
            this.dead = true;
            this.spawned = false;
            this.grid[10][11] = 4;
            this.x = this.num > 1 ? 10 + this.num : 9 + this.num;
            this.y = 11;
            window.spawnTimer[this.num] = setTimeout(() => {
                this.spawn();
            }, SPAWN_TIMER);
        }
    }

    let lastPlayerMove = 0;
    let lastGhostMove = 0;
    let ghostRun = 0;
    let ghostSpeed = GHOST_HUNT_SPEED;
    let particles = 253;
    let lives = 3;
    createMap();

    let started = false;
    let paused = false;
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
        mapElement.append(document.getElementById('game_status'));

        const playerElement = document.createElement('img');
        playerElement.id = 'player';
        playerElement.setAttribute('src', 'images/pacman/pacman.png');
        playerElement.style.left = (SPACE_SIZE * PLAYER_SPAWN_X) + 'px';
        playerElement.style.top = (SPACE_SIZE * PLAYER_SPAWN_Y) + 'px';
        document.getElementById('map').append(playerElement);

        for (let i = 0; i < GHOST_COUNT; i++) {
            const ghostElement = document.createElement('img');
            ghostElement.id = `ghost ${i}`;
            ghostElement.className = 'ghost';
            ghostElement.setAttribute('src', `images/ghosts/${i + 1}.png`);
            const ghostX = i > 1 ? 10 + i : 9 + i;
            ghostElement.style.left = (ghostX * SPACE_SIZE) + 'px';
            ghostElement.style.top = (11 * SPACE_SIZE) + 'px';
            document.getElementById('map').append(ghostElement);
        }
    }

    function createEntities() {
        delete window.player;
        window.player = new Player(PLAYER_SPAWN_X, PLAYER_SPAWN_Y);
        const playerElement = document.getElementById('player');
        playerElement.style.transitionProperty = 'none';
        playerElement.style.left = (PLAYER_SPAWN_X * SPACE_SIZE) + 'px';
        playerElement.style.top = (PLAYER_SPAWN_Y * SPACE_SIZE) + 'px';
        playerElement.style.rotate = 'none';

        window.ghosts = [];

        for (let i = 0; i < GHOST_COUNT; i++) {
            const ghost = new Ghost(i > 1 ? 10 + i : 9 + i, 11, i);
            ghosts.push(ghost);
            const ghostElement = document.getElementById(`ghost ${i}`);
            ghostElement.style.transitionProperty = 'none';
            ghostElement.style.left = (ghost.x * SPACE_SIZE) + 'px';
            ghostElement.style.top = (ghost.y * SPACE_SIZE) + 'px';
            ghostElement.style.transform = 'none';
        }
    }

    function startGame() {
        if (started || paused) return;
        const lifeElements = document.getElementsByClassName('life');
        for (const life of lifeElements) {
            life.style.visibility = 'visible';
        }
        lives = 3;
        particles = 253;
        ghostSpeed = GHOST_HUNT_SPEED;
        lastPlayerMove = 0;
        lastGhostMove = 0;
        ghostRun = 0;
        createEntities();
        for (const ghost of ghosts) {
            if (!ghost.num) ghost.spawn();
            else {
                window.spawnTimer[ghost.num] = setTimeout(() => {
                    ghost.spawn();
                }, SPAWN_TIMER);
            }
        }
        const playerElement = document.getElementById('player');
        playerElement.setAttribute('src', 'images/pacman/pacman-eating.gif');
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

        window.onkeydown = event => {
            player.changeDirection(event.key);
        }
        started = true;
    }

    function nextLife() {
        lives--;
        ghostSpeed = GHOST_HUNT_SPEED;
        lastPlayerMove = 0;
        lastGhostMove = 0;
        ghostRun = 0;

        const gameStatusElement = document.getElementById('game_status');
        gameStatusElement.style.color = 'yellow';
        let countTime = 3;
        gameStatusElement.innerText = countTime;
        window.countTimer = setInterval(() => {
            countTime--;
            gameStatusElement.innerText = countTime;
            if (!countTime) {
                clearInterval(window.countTimer);
                gameStatusElement.style.display = 'none';
                createEntities();
                paused = false;
                const playerElement = document.getElementById('player');
                playerElement.setAttribute('src', 'images/pacman/pacman-eating.gif');
                for (const ghost of ghosts) {
                    if (!ghost.num) ghost.spawn();
                    else {
                        window.spawnTimer[ghost.num] = setTimeout(() => {
                            ghost.spawn();
                        }, SPAWN_TIMER);
                    }
                }
                requestAnimationFrame(updateGame);
            }
        }, 1000);
    }

    function updateGame(timestamp) {
        if (!started || paused) return;
        if (timestamp - lastPlayerMove >= PLAYER_SPEED) {
            if (player.canMove()) {
                const offsetX = Math.abs(player.newX - player.x), offsetY = Math.abs(player.newY - player.y);
                const playerElement = document.getElementById('player');
                if (offsetX === 1 || offsetY === 1) {
                    offsetX ? playerElement.style.transitionProperty = 'left' : playerElement.style.transitionProperty = 'top';
                }
                else {
                    playerElement.style.transitionProperty = 'none';
                }
                player.move();
                playerElement.style.left = (player.x * SPACE_SIZE) + 'px';
                playerElement.style.top = (player.y * SPACE_SIZE) + 'px';
                switch (player.currentDirection) {
                    case 'ArrowRight':
                        playerElement.style.rotate = 'none';
                        break;
                    case 'ArrowDown':
                        playerElement.style.rotate = '90deg';
                        break;
                    case 'ArrowLeft':
                        playerElement.style.rotate = '180deg';
                        break;
                    case 'ArrowUp':
                        playerElement.style.rotate = '270deg';
                        break;
                }
                const positionElement = document.getElementById(`${player.x} ${player.y}`);

                const particle = positionElement.getElementsByClassName('particle')[0] || positionElement.getElementsByClassName('bigParticle')[0];
                if (particle) {
                    // Player eats and removes the particle stepped on
                    particles--;
                    if (particle.className === 'bigParticle') {
                        ghostSpeed = GHOST_RUN_SPEED;
                        ghostRun = 0;
                        for (const ghost of ghosts) {
                            ghost.phase = 'run';
                            const ghostElement = document.getElementById(`ghost ${ghost.num}`);
                            ghostElement.setAttribute('src', 'images/ghosts/run.png');
                        }
                    }
                    particle.className === 'bigParticle' ? particle.className = 'hiddenBigParticle' : particle.className = 'hiddenParticle';
                    if (!particles) return endGame('win');
                }
            }
            lastPlayerMove = timestamp;
        }

        if (timestamp - lastGhostMove >= ghostSpeed) {
            const ghostDiff = timestamp - lastGhostMove;

            for (const ghost of ghosts) {
                ghost.steps = ghost.pathFind(player.x, player.y);
                if (ghost.steps.length) {
                    const ghostElement = document.getElementById(`ghost ${ghost.num}`);

                    // offsetX can be 22/-22 while going through TP
                    const offsetX = Math.abs(ghost.steps[0].y - ghost.x), offsetY = ghost.steps[0].x - ghost.y;
                    if (!ghost.dead && (offsetX === 1 || offsetY)) {
                        if (offsetX) {
                            ghostElement.style.transitionProperty = 'left';
                            ghostElement.style.transform = `scaleX(${-offsetX})`;
                        }
                        else {
                            ghostElement.style.transitionProperty = 'top';
                        }
                        ghostElement.style.transitionDuration = (ghostSpeed / 1000) + 's';
                    }
                    else {
                        ghostElement.style.transitionProperty = 'none';
                    }
                    ghost.move();
                    ghostElement.style.left = (ghost.x * SPACE_SIZE) + 'px';
                    ghostElement.style.top = (ghost.y * SPACE_SIZE) + 'px';
                }
            }
            lastGhostMove = timestamp;

            if (ghostSpeed === GHOST_RUN_SPEED) {
                ghostRun += ghostDiff;
                if (ghostRun >= RUN_TIMER) {
                    ghostSpeed = GHOST_HUNT_SPEED;
                    for (const ghost of ghosts) {
                        ghost.phase = 'hunt';
                        const ghostElement = document.getElementById(`ghost ${ghost.num}`);
                        ghostElement.setAttribute('src', `images/ghosts/${ghost.num + 1}.png`);
                    }
                }
            }
        }

        // ghost and player collision
        for (const ghost of ghosts) {
            if (ghost.x === player.x && ghost.y === player.y) {
                if (ghost.phase === 'hunt') return endGame('lose');

                ghost.die();
                const ghostElement = document.getElementById(`ghost ${ghost.num}`);
                ghostElement.style.transitionProperty = 'none';
                ghostElement.style.left = (ghost.x * SPACE_SIZE) + 'px';
                ghostElement.style.top = (ghost.y * SPACE_SIZE) + 'px';

            }
        }
        requestAnimationFrame(updateGame);
    }

    function endGame(gameStatus) {
        for (const timer of spawnTimer) clearTimeout(timer);

        const playerElement = document.getElementById('player');
        playerElement.setAttribute('src', 'images/pacman/pacman.png');

        
        const gameStatusElement = document.getElementById('game_status');
        gameStatusElement.style.display = 'block';
        
        if (lives && gameStatus === 'lose') {
            const lifeElement = document.getElementById(`life ${lives}`);
            lifeElement.style.visibility = 'hidden';
            paused = true;
            nextLife();
            return;
        }
        gameStatusElement.innerText = gameStatus === 'win' ? "YOU WIN!" : "GAME OVER";
        gameStatusElement.style.color = gameStatus === 'win' ? 'green' : 'red';

        started = false;
    }
};