window.onload = () => {
    const GAME_SPEED = 200;
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
        }

        getRandomSpace() {
            let x = 0, y = 0;
            do {
                x = Math.floor(Math.random() * 5) + this.x - 2;
                y = Math.floor(Math.random() * 5) + this.y - 2;
            } while ((x === this.x && y === this.y) || x >= MAP_SIZE || x <= 0 || y >= MAP_SIZE || y <= 0 || MAP[y][x] === 0);
            return { x, y };
        }

        pathFind(endX, endY) {
            // Search for the player in a 5x5 radius
            if (this.x - endX > 3 || this.x - endX < -3 || this.y - endY > 3 || this.y - endY < -3) {
                const cords = this.getRandomSpace();
                endX = cords.x;
                endY = cords.y;
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
            }
        }
    }

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
                if (i === 10 && j === 11) space.className = 'gate';
                else if (!MAP[i][j]) space.className = 'edge';
                else if (MAP[i][j] === 2) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    space.append(particle);
                }
                row.append(space);
            }
            mapElement.append(row);
        }
    }

    function startGame() {
        if (started) return;
        started = true;
        updateGame();
        window.gameInterval = setInterval(() => {
            updateGame();
        }, GAME_SPEED);

        window.onkeydown = event => {
            player.changeDirection(event.key);
        }
    }

    function updateGame() {
        if (player.move()) {
            const playerElement = document.getElementById('player');
            const positionElement = document.getElementById(`${player.x} ${player.y}`);
            const particle = positionElement.getElementsByClassName('particle')[0];
            if (particle) {
                particle.remove();
                MAP[player.y][player.x] = 1;
            }
            positionElement.append(playerElement);
        }
        for (let i = 0; i < 4; i++) {
            const ghost = ghosts[i];
            ghost.move(player.x, player.y);
            const ghostElement = document.getElementById(`ghost ${i}`);
            const positionElement = document.getElementById(`${ghost.x} ${ghost.y}`);
            positionElement.append(ghostElement);
            if (ghost.x === player.x && ghost.y === player.y) return clearInterval(window.gameInterval);
        }
    }
};