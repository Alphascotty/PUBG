const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 30, 
    height: 30,
    color: 'green',
    speed: 5,
    direction: { x: 0, y: 0 },
    bullets: []
};

const enemies = [];
const bullets = [];

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function movePlayer() {
    player.x += player.direction.x * player.speed;
    player.y += player.direction.y * player.speed;

    // Prevent the player from moving out of the canvas
    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.fillStyle = 'red';
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function createEnemy() {
    const x = Math.random() * (canvas.width - 30);
    const y = Math.random() * (canvas.height - 30);
    enemies.push({ x, y, width: 30, height: 30 });
}

function drawBullets() {
    bullets.forEach((bullet, index) => {
        ctx.fillStyle = 'yellow';
        bullet.x += bullet.speed * bullet.direction.x;
        bullet.y += bullet.speed * bullet.direction.y;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        // Remove bullets that go off screen
        if (
            bullet.x < 0 || bullet.y < 0 ||
            bullet.x > canvas.width || bullet.y > canvas.height
        ) {
            bullets.splice(index, 1);
        }
    });
}

function shoot() {
    bullets.push({
        x: player.x + player.width / 2 - 5,
        y: player.y + player.height / 2 - 5,
        width: 10,
        height: 10,
        speed: 10,
        direction: { ...player.direction }
    });
}

const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.code] = true;

    if (e.code === 'ArrowUp') player.direction.y = -1;
    if (e.code === 'ArrowDown') player.direction.y = 1;
    if (e.code === 'ArrowLeft') player.direction.x = -1;
    if (e.code === 'ArrowRight') player.direction.x = 1;

    if (e.code === 'Space') shoot();
});

window.addEventListener('keyup', (e) => {
    keys[e.code] = false;

    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') player.direction.y = 0;
    if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') player.direction.x = 0;
});

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();
    drawPlayer();
    drawBullets();
    drawEnemies();

    requestAnimationFrame(update);
}

// Create enemies at intervals
setInterval(createEnemy, 2000);

update();
