window.onload = () => {
    const GAME_SPEED = 200;
    const GHOST_COLORS = ['red', 'green', 'orange', 'pink'];
    const MAP_SIZE = 23;
    const MAP = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, -1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, -1, -1, -1, -1, -1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, -1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
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
                if (!MAP[this.y - 1][this.x]) return;
            }
            else if (direction === 'ArrowDown') {
                if (!MAP[this.y + 1][this.x]) return;
            }
            else if (direction === 'ArrowLeft') {
                if (this.x !== 0 && !MAP[this.y][this.x - 1]) return;
            }
            else if (direction === 'ArrowRight') {
                if (this.x !== MAP_SIZE - 1 && !MAP[this.y][this.x + 1]) return;
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
    }

    createMap();

    const player = new Player(11, 13);
    const playerElement = document.createElement('div');
    playerElement.id = 'player';
    document.getElementById(`${player.x} ${player.y}`).append(playerElement);

    const ghosts = [];
    for (let i = 0; i < 4; i++) {
        const ghost = new Ghost(i > 1 ? 10 + i: 9 + i, 11, GHOST_COLORS[i], i);
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
                else if (MAP[i][j] === 1) {
                    const coin = document.createElement('div');
                    coin.className = 'coin';
                    space.append(coin);
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
        setInterval(() => {
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
            const coin = positionElement.getElementsByClassName('coin')[0];
            if (coin) {
                coin.remove();
                MAP[player.y][player.x] = -1;
            }
            positionElement.append(playerElement);
        }
    }
};