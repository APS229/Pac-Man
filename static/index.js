window.onload = () => {
    const PLAYER_SPEED = 200;
    const GHOST_SPEED = 250;
    const SEARCH_RADIUS = 7;
    const GHOST_COLORS = ['red', 'green', 'orange', 'pink'];
    const MAP_SIZE = 23;
    const MAP = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0],
        [0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0],
        [0, 2, 2, 2, 0, 2, 0, 2, 0, 2, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 0],
        [0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0],
        [0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
        [0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0],
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
        [0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0],
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
                if (!MAP[this.y - 1][this.x] || MAP[this.y - 1][this.x] === 3) return;
            }
            else if (direction === 'ArrowDown') {
                if (!MAP[this.y + 1][this.x] || MAP[this.y + 1][this.x] === 3) return;
            }
            else if (direction === 'ArrowLeft') {
                if ((this.x !== 0 && !MAP[this.y][this.x - 1]) || MAP[this.y][this.x - 1] === 3) return;
            }
            else if (direction === 'ArrowRight') {
                if ((this.x !== MAP_SIZE - 1 && !MAP[this.y][this.x + 1]) || MAP[this.y][this.x + 1] === 3) return;
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
                        this.x = MAP_SIZE - 1; // teleport to right side
                        break;
                    }
                    this.x--;
                    break;
                case 'ArrowRight':
                    if (this.x === MAP_SIZE - 1) {
                        this.x = 0; // teleport to left side
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
        }

        getRandomSpace() {
            let x = 0, y = 0;
            do {
                x = [-(SEARCH_RADIUS - 1), -(SEARCH_RADIUS - 2), SEARCH_RADIUS - 2, SEARCH_RADIUS - 1][Math.floor(Math.random() * 4)] + this.x;
                y = [-(SEARCH_RADIUS - 1), -(SEARCH_RADIUS - 2), SEARCH_RADIUS - 2, SEARCH_RADIUS - 1][Math.floor(Math.random() * 4)] + this.y;
            } while ((x === this.x && y === this.y) || x >= MAP_SIZE || x <= 0 || y >= MAP_SIZE || y <= 0 || !MAP[y][x]);
            return { x, y };
        }

        pathFind(endX, endY) {
            // Search for the player in a 7x7 radius
            if (this.x - endX > SEARCH_RADIUS || this.x - endX < -SEARCH_RADIUS || this.y - endY > SEARCH_RADIUS || this.y - endY < -SEARCH_RADIUS) {
                if (this.chasingPlayer) {
                    this.chasingPlayer = false;
                    this.steps = [];
                }
                if (this.steps.length) return;
                const cords = this.getRandomSpace();
                endX = cords.x;
                endY = cords.y;
            }
            else {
                this.chasingPlayer = true;
            }
            const graph = new Graph(MAP);
            const start = graph.grid[this.y][this.x];
            const end = graph.grid[endY][endX];
            this.steps = astar.search(graph, start, end);
        }

        move(playerX, playerY) {
            this.pathFind(playerX, playerY);
            if (this.steps.length) {
                // MAP uses Y value before X value
                this.x = this.steps[0].y;
                this.y = this.steps[0].x;
                this.steps.shift();
            }
        }
    }

    let particles = 0;
    createMap();

    const player = new Player(11, 13);
    const playerElement = document.createElement('div');
    playerElement.id = 'player';
    document.getElementById(`${player.x} ${player.y}`).append(playerElement);

    const ghosts = [];
    for (let i = 0; i < 4; i++) {
        const ghost = new Ghost(i > 1 ? 10 + i : 9 + i, 11, GHOST_COLORS[i], i);
        ghosts.push(ghost);
        const ghostElement = document.createElement('div');
        ghostElement.id = `ghost ${i}`;
        ghostElement.className = 'ghost';
        ghostElement.style.backgroundColor = ghost.color;
        document.getElementById(`${ghost.x} ${ghost.y}`).append(ghostElement);
    }

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
                else if (MAP[i][j] === 3) space.className = 'gate';
                else if (MAP[i][j] === 2) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    space.append(particle);
                    particles++;
                }
                row.append(space);
            }
            mapElement.append(row);
        }
    }

    function startGame() {
        if (started) return;
        started = true;
        window.playerInterval = setInterval(() => {
            updatePlayer();
        }, PLAYER_SPEED);

        window.ghostInterval = setInterval(() => {
            updateGhosts();
        }, GHOST_SPEED);

        window.onkeydown = event => {
            player.changeDirection(event.key);
        }
    }

    function updatePlayer() {
        if (player.move()) {
            const playerElement = document.getElementById('player');
            const positionElement = document.getElementById(`${player.x} ${player.y}`);
            const particle = positionElement.getElementsByClassName('particle')[0];
            if (particle) {
                particle.remove();
                MAP[player.y][player.x] = 1;
                particles--;
                if (!particles) endGame('win');
            }
            positionElement.append(playerElement);
        }
    }

    function updateGhosts() {
        for (let i = 0; i < 4; i++) {
            const ghost = ghosts[i];
            ghost.move(player.x, player.y);
            const ghostElement = document.getElementById(`ghost ${ghost.num}`);
            const positionElement = document.getElementById(`${ghost.x} ${ghost.y}`);
            positionElement.append(ghostElement);
            if (ghost.x === player.x && ghost.y === player.y) {
                endGame('lose');
                break;
            }
        }
    }

    function endGame(gameStatus) {
        clearInterval(window.playerInterval);
        clearInterval(window.ghostInterval);
        const gameStatusElement = document.getElementById('game_status');
        gameStatusElement.style.display = 'block';
        gameStatusElement.innerText = gameStatus === 'win' ? "YOU WIN!" : "GAME OVER";
        gameStatusElement.style.color = gameStatus === 'win' ? 'green' : 'red';
        document.getElementById('map').append(gameStatusElement);
    }
};