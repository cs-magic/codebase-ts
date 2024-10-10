const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score-value');
const healthElement = document.getElementById('health-value');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const finalScoreElement = document.getElementById('final-score');

canvas.width = 400;
canvas.height = 600;

let score = 0;
let gameOver = false;
let gameStarted = false;
let enemies = [];
let bullets = [];
let powerUps = [];
let particles = [];
let shockwave = null;

// 添加音频上下文和音效生成函数
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function createOscillator(frequency, duration) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
}

function playShootSound() {
    createOscillator(880, 0.1);
}

function playExplosionSound() {
    const explosionLength = 0.5;
    const baseFrequency = 100;
    
    // 创建主爆炸音
    const mainOscillator = audioContext.createOscillator();
    const mainGain = audioContext.createGain();
    mainOscillator.type = 'sawtooth';
    mainOscillator.frequency.setValueAtTime(baseFrequency, audioContext.currentTime);
    mainOscillator.frequency.exponentialRampToValueAtTime(baseFrequency * 0.5, audioContext.currentTime + explosionLength);
    
    mainGain.gain.setValueAtTime(0.5, audioContext.currentTime);
    mainGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + explosionLength);
    
    mainOscillator.connect(mainGain);
    mainGain.connect(audioContext.destination);
    
    mainOscillator.start();
    mainOscillator.stop(audioContext.currentTime + explosionLength);
    
    // 添加高频音效
    const highOscillator = audioContext.createOscillator();
    const highGain = audioContext.createGain();
    highOscillator.type = 'square';
    highOscillator.frequency.setValueAtTime(baseFrequency * 3, audioContext.currentTime);
    highOscillator.frequency.exponentialRampToValueAtTime(baseFrequency * 2, audioContext.currentTime + explosionLength * 0.75);
    
    highGain.gain.setValueAtTime(0.3, audioContext.currentTime);
    highGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + explosionLength * 0.75);
    
    highOscillator.connect(highGain);
    highGain.connect(audioContext.destination);
    
    highOscillator.start();
    highOscillator.stop(audioContext.currentTime + explosionLength * 0.75);
    
    // 添加噪音效果
    const bufferSize = audioContext.sampleRate * explosionLength;
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    
    const noise = audioContext.createBufferSource();
    noise.buffer = noiseBuffer;
    
    const noiseGain = audioContext.createGain();
    noiseGain.gain.setValueAtTime(0.1, audioContext.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + explosionLength);
    
    noise.connect(noiseGain);
    noiseGain.connect(audioContext.destination);
    
    noise.start();
}

function playPowerupSound() {
    createOscillator(440, 0.2);
}

// 背景音乐生成函数
let backgroundMusicInterval;
function playBackgroundMusic() {
    const notes = [262, 294, 330, 349, 392, 440, 494, 523];
    let index = 0;
    
    backgroundMusicInterval = setInterval(() => {
        createOscillator(notes[index], 0.2);
        index = (index + 1) % notes.length;
    }, 300);
}

function stopBackgroundMusic() {
    clearInterval(backgroundMusicInterval);
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = color;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Player {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 10;
        this.speed = 5;
        this.health = 100;
        this.shieldActive = false;
        this.speedBoostActive = false;
        this.doubleShotActive = false;
        this.movingUp = false;
        this.movingDown = false;
        this.movingLeft = false;
        this.movingRight = false;
        this.charging = false;
        this.chargeStartTime = 0;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

        // 机身
        ctx.fillStyle = '#4CAF50';
        ctx.beginPath();
        ctx.moveTo(0, -this.height / 2);
        ctx.lineTo(-this.width / 2, this.height / 2);
        ctx.lineTo(this.width / 2, this.height / 2);
        ctx.closePath();
        ctx.fill();

        // 机翼
        ctx.fillStyle = '#2196F3';
        ctx.beginPath();
        ctx.moveTo(-this.width / 2, this.height / 4);
        ctx.lineTo(-this.width * 0.8, this.height / 2);
        ctx.lineTo(-this.width / 3, this.height / 2);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(this.width / 2, this.height / 4);
        ctx.lineTo(this.width * 0.8, this.height / 2);
        ctx.lineTo(this.width / 3, this.height / 2);
        ctx.closePath();
        ctx.fill();

        // 驾驶舱
        ctx.fillStyle = '#FFC107';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.width / 6, this.height / 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // 引擎喷射
        ctx.fillStyle = '#FF5722';
        ctx.beginPath();
        ctx.moveTo(-this.width / 4, this.height / 2);
        ctx.lineTo(-this.width / 8, this.height / 2 + 10);
        ctx.lineTo(this.width / 8, this.height / 2 + 10);
        ctx.lineTo(this.width / 4, this.height / 2);
        ctx.closePath();
        ctx.fill();

        // 如果正在移动，添加引擎动画效果
        if (this.movingLeft || this.movingRight || this.movingUp || this.movingDown) {
            ctx.fillStyle = 'rgba(255, 87, 34, ' + (0.5 + Math.random() * 0.5) + ')';
            ctx.beginPath();
            ctx.moveTo(-this.width / 6, this.height / 2 + 10);
            ctx.lineTo(0, this.height / 2 + 20 + Math.random() * 10);
            ctx.lineTo(this.width / 6, this.height / 2 + 10);
            ctx.closePath();
            ctx.fill();
        }

        // 绘制护盾（如果激活）
        if (this.shieldActive) {
            ctx.strokeStyle = 'rgba(0, 255, 255, ' + (0.5 + Math.sin(Date.now() / 100) * 0.5) + ')';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, this.width / 2 + 10, 0, Math.PI * 2);
            ctx.stroke();
        }

        // 绘制蓄力效果（果正蓄力）
        if (this.charging) {
            const chargeProgress = (Date.now() - this.chargeStartTime) / 3000;
            ctx.strokeStyle = `rgba(255, 255, 0, ${chargeProgress})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, 0, this.width / 2 + 20, 0, Math.PI * 2 * chargeProgress);
            ctx.stroke();
        }

        ctx.restore();
    }

    move() {
        if (this.movingLeft && this.x > 0) {
            this.x -= this.speed;
        }
        if (this.movingRight && this.x < canvas.width - this.width) {
            this.x += this.speed;
        }
        if (this.movingUp && this.y > 0) {
            this.y -= this.speed;
        }
        if (this.movingDown && this.y < canvas.height - this.height) {
            this.y += this.speed;
        }
    }

    shoot() {
        if (this.doubleShotActive) {
            bullets.push(new Bullet(this.x + this.width / 2 - 10, this.y));
            bullets.push(new Bullet(this.x + this.width / 2 + 10, this.y));
        } else {
            bullets.push(new Bullet(this.x + this.width / 2, this.y));
        }
        playShootSound();
    }

    activateShield() {
        this.shieldActive = true;
        setTimeout(() => this.shieldActive = false, 5000);
    }

    activateSpeedBoost() {
        this.speedBoostActive = true;
        this.speed = 8;
        setTimeout(() => {
            this.speedBoostActive = false;
            this.speed = 5;
        }, 5000);
    }

    activateDoubleShot() {
        this.doubleShotActive = true;
        setTimeout(() => this.doubleShotActive = false, 5000);
    }

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

    toJSON() {
        return {
            x: this.x,
            y: this.y,
            health: this.health,
            shieldActive: this.shieldActive,
            speedBoostActive: this.speedBoostActive,
            doubleShotActive: this.doubleShotActive
        };
    }
}

// 在文件顶部添加新的常量
const ENEMY_TYPES = ['basic', 'fast', 'tanky', 'shooter'];

// 修改 Enemy 类
class Enemy {
    constructor(type = 'basic', x = null, y = null, health = null) {
        this.type = type;
        this.width = 40;
        this.height = 40;
        this.x = x !== null ? x : Math.random() * (canvas.width - this.width);
        this.y = y !== null ? y : -this.height;
        
        switch (this.type) {
            case 'fast':
                this.speed = 3;
                this.health = health !== null ? health : 1;
                break;
            case 'tanky':
                this.speed = 1;
                this.health = health !== null ? health : 3;
                break;
            case 'shooter':
                this.speed = 1.5;
                this.health = health !== null ? health : 2;
                this.shootInterval = 2000; // 每2秒发射一次
                this.lastShot = Date.now();
                break;
            default: // basic
                this.speed = 2;
                this.health = health !== null ? health : 2;
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

class Bullet {
    constructor(x, y) {
        this.width = 5;
        this.height = 15;
        this.x = x - this.width / 2;
        this.y = y;
        this.speed = 7;
    }

    draw() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y -= this.speed;
    }
}

class PowerUp {
    constructor(x = null, y = null, type = null) {
        this.width = 30;
        this.height = 30;
        this.x = x !== null ? x : Math.random() * (canvas.width - this.width);
        this.y = y !== null ? y : -this.height;
        this.speed = 2;
        this.type = type || ['shield', 'speedBoost', 'doubleShot'][Math.floor(Math.random() * 3)];
    }

    draw() {
        ctx.fillStyle = this.type === 'shield' ? 'cyan' : this.type === 'speedBoost' ? 'green' : 'purple';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
    }
}

class Shockwave {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = Math.max(canvas.width, canvas.height);
        this.speed = 10;
    }

    draw() {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    update() {
        this.radius += this.speed;
    }

    isFinished() {
        return this.radius >= this.maxRadius;
    }
}

const player = new Player();

// 在文件顶部添加新的变量
let enemyBullets = [];

// 修改 spawnEnemy 函数
function spawnEnemy() {
    if (Math.random() < 0.02) {
        const randomType = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)];
        enemies.push(new Enemy(randomType));
    }
}

function spawnPowerUp() {
    if (Math.random() < 0.005) {
        powerUps.push(new PowerUp());
    }
}

function createParticles(x, y, color, amount) {
    for (let i = 0; i < amount; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function checkCollisions() {
    enemies.forEach((enemy, enemyIndex) => {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            if (!player.shieldActive) {
                player.health -= 20;
                healthElement.textContent = player.health;
                createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 'red', 20);
                enemies.splice(enemyIndex, 1);
                playExplosionSound();
                if (player.health <= 0) {
                    gameOver = true;
                }
            }
        }

        bullets.forEach((bullet, bulletIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                // 增加粒子数量和颜色变化
                createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 'orange', 20);
                createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 'red', 15);
                createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 'yellow', 10);
                
                enemies.splice(enemyIndex, 1);
                bullets.splice(bulletIndex, 1);
                score += 10;
                scoreElement.textContent = score;
                playExplosionSound();
            }
        });
    });

    powerUps.forEach((powerUp, powerUpIndex) => {
        if (
            player.x < powerUp.x + powerUp.width &&
            player.x + player.width > powerUp.x &&
            player.y < powerUp.y + powerUp.height &&
            player.y + player.height > powerUp.y
        ) {
            switch (powerUp.type) {
                case 'shield':
                    player.activateShield();
                    break;
                case 'speedBoost':
                    player.activateSpeedBoost();
                    break;
                case 'doubleShot':
                    player.activateDoubleShot();
                    break;
            }
            powerUps.splice(powerUpIndex, 1);
            playPowerupSound();
        }
    });

    // 检查冲击波碰撞
    if (shockwave) {
        enemies.forEach((enemy, index) => {
            const dx = enemy.x + enemy.width / 2 - shockwave.x;
            const dy = enemy.y + enemy.height / 2 - shockwave.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= shockwave.radius) {
                createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 'white', 30);
                enemies.splice(index, 1);
                score += 20;
                scoreElement.textContent = score;
                playExplosionSound();
            }
        });
    }

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
}

// 在文件顶部添加新的变量
let isAutoPlay = false;
const autoPlayToggle = document.getElementById('autoPlayToggle');

// 在文件顶部添加新的音频上下文变量
let chargeSoundEffect;

// 在文件顶部添加新的变量
let isPaused = false;

// 在文件顶部添加新的变量
let lastTimestamp = 0;
let chargeSoundGain;

// 在文件顶部添加以下常量
const GAME_STATE_KEY = 'starfighterGameState';

// 添加保存游戏状态的函数
function saveGameState() {
    const gameState = {
        score: score,
        player: player.toJSON(),
        enemies: enemies.map(enemy => ({
            x: enemy.x,
            y: enemy.y,
            type: enemy.type,
            health: enemy.health
        })),
        bullets: bullets.map(bullet => ({
            x: bullet.x,
            y: bullet.y
        })),
        powerUps: powerUps.map(powerUp => ({
            x: powerUp.x,
            y: powerUp.y,
            type: powerUp.type
        }))
    };
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
}

// 添加加载游戏状态的函数
function loadGameState() {
    const savedState = localStorage.getItem(GAME_STATE_KEY);
    if (savedState) {
        const gameState = JSON.parse(savedState);
        score = gameState.score;
        player.x = gameState.player.x;
        player.y = gameState.player.y;
        player.health = gameState.player.health;
        player.shieldActive = gameState.player.shieldActive;
        player.speedBoostActive = gameState.player.speedBoostActive;
        player.doubleShotActive = gameState.player.doubleShotActive;
        enemies = gameState.enemies.map(enemyData => new Enemy(enemyData.type, enemyData.x, enemyData.y, enemyData.health));
        bullets = gameState.bullets.map(bulletData => new Bullet(bulletData.x, bulletData.y));
        powerUps = gameState.powerUps.map(powerUpData => new PowerUp(powerUpData.x, powerUpData.y, powerUpData.type));
        
        scoreElement.textContent = score;
        healthElement.textContent = player.health;
        return true;
    }
    return false;
}

// 修改 startGame 函数
function startGame() {
    gameStarted = true;
    gameOver = false;
    if (!loadGameState()) {
        // 如果没有保存的状态，初始化新游戏
        score = 0;
        player.health = 100;
        enemies = [];
        bullets = [];
        powerUps = [];
        particles = [];
        enemyBullets = [];
    }
    scoreElement.textContent = score;
    healthElement.textContent = player.health;
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    autoPlayToggle.style.display = 'block';
    isPaused = false;
    const pauseButton = document.getElementById('pauseButton');
    pauseButton.textContent = '暂停';
    lastTimestamp = performance.now();
    requestAnimationFrame(gameLoop);
}

// 在 gameLoop 函数中添加保存游戏状态的调用
function gameLoop(timestamp) {
    if (!gameStarted) return;
    if (gameOver) {
        stopBackgroundMusic();
        gameOverScreen.style.display = 'flex';
        finalScoreElement.textContent = score;
        // 隐藏自动模式按钮
        autoPlayToggle.style.display = 'none';
        return;
    }

    if (!backgroundMusicInterval) {
        playBackgroundMusic();
    }

    if (!isPaused) {
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 绘制星空背景
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        for (let i = 0; i < 50; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
        }

        player.move();
        player.draw();

        spawnEnemy();
        spawnPowerUp();

        enemies.forEach((enemy, index) => {
            enemy.draw();
            enemy.update();
            if (enemy.y > canvas.height) {
                enemies.splice(index, 1);
            }
        });

        bullets.forEach((bullet, index) => {
            bullet.draw();
            bullet.update();
            if (bullet.y < 0) {
                bullets.splice(index, 1);
            }
        });

        powerUps.forEach((powerUp, index) => {
            powerUp.draw();
            powerUp.update();
            if (powerUp.y > canvas.height) {
                powerUps.splice(index, 1);
            }
        });

        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            if (particle.size <= 0.1) {
                particles.splice(index, 1);
            }
        });

        if (shockwave) {
            shockwave.draw();
            shockwave.update();
            if (shockwave.isFinished()) {
                shockwave = null;
            }
        }

        checkCollisions();

        if (isAutoPlay) {
            autoPlayUpdate();
        }

        // 更新蓄力音效
        if (player.charging) {
            const chargeProgress = (Date.now() - player.chargeStartTime) / 3000;
            chargeSoundEffect.frequency.setValueAtTime(50 + chargeProgress * 400, audioContext.currentTime);
            chargeSoundGain.gain.setValueAtTime(chargeProgress * 0.5, audioContext.currentTime);
        }

        enemyBullets.forEach((bullet, index) => {
            bullet.draw();
            bullet.update();
            if (bullet.y > canvas.height) {
                enemyBullets.splice(index, 1);
            }
        });

        // 每隔一段时间保存游戏状态，比如每秒保存一次
        if (timestamp - lastSaveTime > 1000) {
            saveGameState();
            lastSaveTime = timestamp;
        }

        requestAnimationFrame(gameLoop);
    }
}

// 添加自动模式的更新逻辑
function autoPlayUpdate() {
    const nearestEnemy = findNearestEnemy();
    if (nearestEnemy) {
        // 移动飞机以避开敌人
        if (player.x < nearestEnemy.x) {
            player.x += player.speed;
        } else {
            player.x -= player.speed;
        }
        
        // 总是射击
        player.shoot();
    }
}

// 添加寻找最近敌人的辅助函数
function findNearestEnemy() {
    let nearest = null;
    let nearestDistance = Infinity;
    
    for (const enemy of enemies) {
        const distance = Math.hypot(enemy.x - player.x, enemy.y - player.y);
        if (distance < nearestDistance) {
            nearest = enemy;
            nearestDistance = distance;
        }
    }
    
    return nearest;
}

// 修改 handleInput 函数以支持自动模式
function handleInput() {
    if (!isAutoPlay) {
        // 现有的手动控制逻辑...
    }
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

// 添加暂停/继续功能
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

// 添加切换自动模式的函数
function toggleAutoPlay() {
    isAutoPlay = !isAutoPlay;
    autoPlayToggle.textContent = `自动模式: ${isAutoPlay ? '开启' : '关闭'}`;
}

// 在 init 函数中添加以下代码
function init() {
    // 现有的初始化代码...

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

    // 添加暂停按钮事件监听器
    const pauseButton = document.getElementById('pauseButton');
    pauseButton.addEventListener('click', togglePause);

    // 添加自动模式切换按钮的事件监听器
    autoPlayToggle.addEventListener('click', toggleAutoPlay);

    // 检查是否有保存的游戏状态
    if (localStorage.getItem(GAME_STATE_KEY)) {
        const resumeButton = document.createElement('button');
        resumeButton.textContent = '恢复游戏';
        resumeButton.addEventListener('click', () => {
            startGame();
        });
        startScreen.appendChild(resumeButton);
    }
}

// 确保在页面加载完成后调用 init 函数
window.addEventListener('load', init);

// 更新事件监听器以支持 WASD 和箭头键
document.addEventListener('keydown', (e) => {
    if (isPaused) return;
    switch(e.key.toLowerCase()) {
        case 'a':
        case 'arrowleft':
            player.movingLeft = true;
            break;
        case 'd':
        case 'arrowright':
            player.movingRight = true;
            break;
        case 'w':
        case 'arrowup':
            player.movingUp = true;
            break;
        case 's':
        case 'arrowdown':
            player.movingDown = true;
            break;
        case ' ':
            player.shoot();
            break;
    }
});

document.addEventListener('keyup', (e) => {
    if (isPaused) return;
    switch(e.key.toLowerCase()) {
        case 'a':
        case 'arrowleft':
            player.movingLeft = false;
            break;
        case 'd':
        case 'arrowright':
            player.movingRight = false;
            break;
        case 'w':
        case 'arrowup':
            player.movingUp = false;
            break;
        case 's':
        case 'arrowdown':
            player.movingDown = false;
            break;
    }
});

// 添加鼠标事件监听器
canvas.addEventListener('mousedown', (e) => {
    if (isPaused) return;
    e.preventDefault(); // 防止默认的右键菜单出现
    if (e.button === 0) { // 左键
        player.shoot();
    } else if (e.button === 2) { // 右键
        player.startCharging();
    }
});

canvas.addEventListener('mouseup', (e) => {
    if (e.button === 2) { // 右键
        if (player.releaseShockwave()) {
            shockwave = new Shockwave(player.x + player.width / 2, player.y + player.height / 2);
            playShockwaveSound();
        }
    }
});

// 防止右键菜单出现
canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// 添加冲击波音效
function playShockwaveSound() {
    const duration = 1;
    const frequency = 100;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 10, audioContext.currentTime + duration);
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
}

// 初始显示开始屏幕
startScreen.style.display = 'flex';
gameOverScreen.style.display = 'none';

// 在文件末尾添加
let lastSaveTime = 0;