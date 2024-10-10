const socket = io(window.location.origin, {
    withCredentials: false,
    transports: ['websocket', 'polling']
});

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const scoreValue = document.getElementById('scoreValue');
const healthValue = document.getElementById('healthValue');
const finalScore = document.getElementById('finalScore');

canvas.width = 800;
canvas.height = 600;

let players = {};
let food = {};
let myId = null;

// 在文件顶部添加新的常量
const ENEMY_TYPES = ['basic', 'fast', 'tanky', 'shooter'];

// 在文件顶部添加新的变量
let enemyBullets = [];
let lastTimestamp = 0;
let chargeSoundGain;

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

function startGame() {
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    socket.emit('joinGame');
    enemyBullets = [];
    lastTimestamp = performance.now();
    requestAnimationFrame(gameLoop);
}

socket.on('connect', () => {
    myId = socket.id;
});

socket.on('gameState', (gameState) => {
    players = gameState.players;
    food = gameState.food;
    updateHUD();
});

socket.on('gameOver', (score) => {
    finalScore.textContent = score;
    gameOverScreen.style.display = 'flex';
});

document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        socket.emit('changeDirection', e.key);
    }
});

function updateHUD() {
    if (players[myId]) {
        scoreValue.textContent = players[myId].score || 0;
        healthValue.textContent = players[myId].health || 100;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let id in players) {
        const player = players[id];
        ctx.fillStyle = player.color;
        for (let segment of player.snake) {
            ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
        }
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

    requestAnimationFrame(draw);
}

draw();

// 修改 Enemy 类
class Enemy {
    constructor(type = 'basic') {
        this.type = type;
        this.width = 40;
        this.height = 40;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = -this.height;
        
        switch (this.type) {
            case 'fast':
                this.speed = 3;
                this.health = 1;
                break;
            case 'tanky':
                this.speed = 1;
                this.health = 3;
                break;
            case 'shooter':
                this.speed = 1.5;
                this.health = 2;
                this.shootInterval = 2000; // 每2秒发射一次
                this.lastShot = Date.now();
                break;
            default: // basic
                this.speed = 2;
                this.health = 2;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(Math.PI); // 旋转180度，使敌机朝下

        // 根据敌机类型绘制不同的外观
        switch (this.type) {
            case 'fast':
                ctx.fillStyle = '#00FF00'; // 绿色
                break;
            case 'tanky':
                ctx.fillStyle = '#8B4513'; // 棕色
                break;
            case 'shooter':
                ctx.fillStyle = '#FF00FF'; // 紫色
                break;
            default: // basic
                ctx.fillStyle = '#FF4136'; // 红色
        }

        // 机身
        ctx.beginPath();
        ctx.moveTo(0, -this.height / 2);
        ctx.lineTo(-this.width / 2, this.height / 2);
        ctx.lineTo(this.width / 2, this.height / 2);
        ctx.closePath();
        ctx.fill();

        // 机翼
        ctx.fillStyle = '#FF851B';
        ctx.beginPath();
        ctx.moveTo(-this.width / 2, 0);
        ctx.lineTo(-this.width * 0.7, this.height / 2);
        ctx.lineTo(-this.width / 4, this.height / 2);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(this.width / 2, 0);
        ctx.lineTo(this.width * 0.7, this.height / 2);
        ctx.lineTo(this.width / 4, this.height / 2);
        ctx.closePath();
        ctx.fill();

        // 驾驶舱
        ctx.fillStyle = '#39CCCC';
        ctx.beginPath();
        ctx.arc(0, 0, this.width / 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    update() {
        this.y += this.speed;
        
        // 如果是射手类型，检查是否应该发射子弹
        if (this.type === 'shooter' && Date.now() - this.lastShot > this.shootInterval) {
            this.shoot();
            this.lastShot = Date.now();
        }
    }

    shoot() {
        enemyBullets.push(new EnemyBullet(this.x + this.width / 2, this.y + this.height));
    }
}

// 添加新的 EnemyBullet 类
class EnemyBullet {
    constructor(x, y) {
        this.width = 5;
        this.height = 10;
        this.x = x - this.width / 2;
        this.y = y;
        this.speed = 5;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
    }
}

// 修改 spawnEnemy 函数
function spawnEnemy() {
    if (Math.random() < 0.02) {
        const randomType = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)];
        enemies.push(new Enemy(randomType));
    }
}

// 在 gameLoop 函数中添加敌人子弹的处理
function gameLoop(timestamp) {
    // ... 现有代码 ...

    enemyBullets.forEach((bullet, index) => {
        bullet.draw();
        bullet.update();
        if (bullet.y > canvas.height) {
            enemyBullets.splice(index, 1);
        }
    });

    // ... 现有代码 ...
}

// 修改 checkCollisions 函数
function checkCollisions() {
    // ... 现有的碰撞检测代码 ...

    // 检测敌人子弹与玩家的碰撞
    enemyBullets.forEach((bullet, bulletIndex) => {
        if (
            player.x < bullet.x + bullet.width &&
            player.x + player.width > bullet.x &&
            player.y < bullet.y + bullet.height &&
            player.y + player.height > bullet.y
        ) {
            if (!player.shieldActive) {
                player.health -= 10;
                healthElement.textContent = player.health;
                createParticles(bullet.x + bullet.width / 2, bullet.y + bullet.height / 2, 'red', 10);
                enemyBullets.splice(bulletIndex, 1);
                if (player.health <= 0) {
                    gameOver = true;
                }
            }
        }
    });

    // 修改玩家子弹与敌人的碰撞检测
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                enemy.health--;
                createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 'orange', 10);
                bullets.splice(bulletIndex, 1);
                
                if (enemy.health <= 0) {
                    createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 'red', 20);
                    enemies.splice(enemyIndex, 1);
                    score += 10;
                    scoreElement.textContent = score;
                    playExplosionSound();
                }
            }
        });
    });

    // ... 其他碰撞检测代码 ...
}

// 修改 init 函数
function init() {
    // ... 现有的初始化代码 ...

    // 创建蓄力音效
    chargeSoundEffect = audioContext.createOscillator();
    chargeSoundEffect.type = 'sawtooth';
    chargeSoundEffect.frequency.setValueAtTime(50, audioContext.currentTime);
    chargeSoundEffect.start();
    chargeSoundEffect.disconnect();

    chargeSoundGain = audioContext.createGain();
    chargeSoundGain.gain.setValueAtTime(0, audioContext.currentTime);
    chargeSoundEffect.connect(chargeSoundGain);
    chargeSoundGain.connect(audioContext.destination);

    // ... 其他初始化代码 ...
}

// 修改 togglePause 函数
function togglePause() {
    isPaused = !isPaused;
    const pauseButton = document.getElementById('pauseButton');
    pauseButton.textContent = isPaused ? '继续' : '暂停';
    if (isPaused) {
        stopBackgroundMusic();
    } else {
        playBackgroundMusic();
        lastTimestamp = performance.now();
        requestAnimationFrame(gameLoop);
    }
}

// 修改 gameLoop 函数
function gameLoop(timestamp) {
    if (!gameStarted) return;
    if (gameOver) {
        // ... 现有的游戏结束代码 ...
        return;
    }

    if (!isPaused) {
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        // ... 现有的游戏更新代码 ...

        // 更新蓄力音效
        if (player.charging) {
            const chargeProgress = (Date.now() - player.chargeStartTime) / 3000;
            chargeSoundEffect.frequency.setValueAtTime(50 + chargeProgress * 400, audioContext.currentTime);
            chargeSoundGain.gain.setValueAtTime(chargeProgress * 0.5, audioContext.currentTime);
        }

        requestAnimationFrame(gameLoop);
    }
}

// 修改 Player 类的 startCharging 方法
class Player {
    // ... 其他方法 ...

    startCharging() {
        if (!this.charging) {
            this.charging = true;
            this.chargeStartTime = Date.now();
            chargeSoundGain.gain.setValueAtTime(0, audioContext.currentTime);
            chargeSoundEffect.frequency.setValueAtTime(50, audioContext.currentTime);
        }
    }

    releaseShockwave() {
        if (this.charging && Date.now() - this.chargeStartTime >= 3000) {
            this.charging = false;
            chargeSoundGain.gain.setValueAtTime(0, audioContext.currentTime);
            return true;
        }
        this.charging = false;
        chargeSoundGain.gain.setValueAtTime(0, audioContext.currentTime);
        return false;
    }
}