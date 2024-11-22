console.log("-- start --");
console.log("游戏脚本加载");

// 声明全局变量
let canvas;
let ctx;
let scoreElement;
let healthElement;
let startScreen;
let gameOverScreen;
let startButton;
let restartButton;
let finalScoreElement;
let autoPlayToggle;
let gameButton;

let score = 0;
let gameOver = false;
let gameStarted = false;
let enemies = [];
let bullets = [];
let powerUps = [];
let particles = [];
let shockwave = null;
let isAutoPlay = false;
let isPaused = false;
let lastTimestamp = 0;
let chargeSoundGain;
let chargeSoundEffect;
let player;
let enemyBullets = [];
let keys = {};

// 常量
const GAME_STATE_KEY = 'starfighterGameState';
const ENEMY_TYPES = ['basic', 'fast', 'tanky', 'shooter'];
const SAVE_INTERVAL = 5000; // 每5秒保存一次游戏状态

// 音频上下文
let audioContext;

// 初始化函数
function init() {
    console.log("初始化游戏");
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    
    // 设置画布大小
    canvas.width = 400;
    canvas.height = 600;

    scoreElement = document.getElementById('score-value');
    healthElement = document.getElementById('health-value');
    finalScoreElement = document.getElementById('final-score');
    startScreen = document.getElementById('start-screen');
    gameOverScreen = document.getElementById('game-over-screen');

    gameButton = document.getElementById('gameButton');
    if (gameButton) {
        console.log("找到游戏按钮");
        gameButton.addEventListener('click', handleGameButtonClick);
    } else {
        console.error("未找到游戏按钮");
    }

    autoPlayToggle = document.getElementById('autoPlayToggle');
    if (autoPlayToggle) {
        autoPlayToggle.addEventListener('click', toggleAutoPlay);
    }

    player = new Player();

    // 检查是否有保存���游戏状态
    if (localStorage.getItem(GAME_STATE_KEY)) {
        const resumeButton = document.createElement('button');
        resumeButton.textContent = '恢复游戏';
        resumeButton.classList.add('control-button');
        resumeButton.addEventListener('click', () => {
            startGame(true);
        });
        document.getElementById('control-panel').appendChild(resumeButton);
    }

    // 添加键盘事件监听器
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // 添加鼠标事件监听器
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
}

// 其他函数和类的定义...

// 确保在页面加载完成后调用 init 函数
window.addEventListener('load', () => {
    console.log("页面加载完成，调用 init 函数");
    init();
});

// 在这里继续添加其他的游戏逻辑...

// 在 init 函数之后添加以下函数定义

function handleGameButtonClick() {
    console.log("游戏按钮被点击");
    initAudio(); // 初始化音频上下文
    if (!gameStarted) {
        console.log("开始新游戏");
        startGame(false);
    } else {
        console.log("切换暂停状态");
        togglePause();
    }
}

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function startGame(loadSavedState = false) {
    console.log('开始游戏，loadSavedState:', loadSavedState);
    gameStarted = true;
    gameOver = false;
    isPaused = false;

    // 更新UI显示
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('control-panel').style.display = 'flex';
    if (gameButton) {
        gameButton.textContent = '暂停';
    }
    if (autoPlayToggle) {
        autoPlayToggle.style.display = 'inline-block';
    }

    if (!loadSavedState) {
        // 重置游戏状态
        console.log('重置游戏状态');
        score = 0;
        player.reset();
        enemies = [];
        bullets = [];
        powerUps = [];
        particles = [];
        enemyBullets = [];
        shockwave = null;
        isAutoPlay = false;
        if (autoPlayToggle) {
            autoPlayToggle.textContent = '自动模式: 关闭';
        }
    } else {
        // 加载保存的游戏状态
        console.log('尝试加载保存的游戏状态');
        if (!loadGameState()) {
            console.log('没有保存的状态或加载失���，开始新游戏');
            return startGame(false);
        }
    }

    updateScore(score);
    updateHealth(player.health);
    updateCharge(0);

    // 重新开始背景音乐
    console.log('重新开始背景音乐');
    stopBackgroundMusic();
    playBackgroundMusic();
    
    console.log('开始游戏循环');
    lastTimestamp = performance.now();
    requestAnimationFrame(gameLoop);

    // 初始化星星背景
    initStars();
}

function initStars() {
    // 初始化星星背景
}

function togglePause() {
    if (!gameStarted) return;

    isPaused = !isPaused;
    gameButton.textContent = isPaused ? '继续' : '暂停';
    
    if (isPaused) {
        stopBackgroundMusic();
        if (player.charging) {
            chargeSoundGain.gain.setValueAtTime(0, audioContext.currentTime);
        }
    } else {
        playBackgroundMusic();
        lastTimestamp = performance.now();
        requestAnimationFrame(gameLoop);
        if (player.charging) {
            const chargeProgress = (Date.now() - player.chargeStartTime) / 3000;
            chargeSoundGain.gain.setValueAtTime(chargeProgress * 0.5, audioContext.currentTime);
        }
    }
}

function toggleAutoPlay() {
    isAutoPlay = !isAutoPlay;
    autoPlayToggle.textContent = `自动模式: ${isAutoPlay ? '开启' : '关闭'}`;
    console.log('自动模式:', isAutoPlay ? '开启' : '关闭');
}

// 添加这些函数的存根，稍后我们会实现它们
function handleKeyDown(e) {
    keys[e.key] = true;
}

function handleKeyUp(e) {
    keys[e.key] = false;
}

function handleMouseDown(e) {
    // 鼠标按下事件处理
}

function handleMouseUp(e) {
    // 鼠标释放事件处理
}

function updateScore(newScore) {
    score = newScore;
    scoreElement.textContent = score;
    scoreElement.classList.add('score-updated');
    setTimeout(() => scoreElement.classList.remove('score-updated'), 300);
}

function updateHealth(newHealth) {
    player.health = Math.max(0, Math.min(100, newHealth));
    const healthElement = document.getElementById('health-value');
    const healthFill = document.querySelector('#health-bar .progress-fill');
    healthElement.textContent = Math.round(player.health);
    healthFill.style.width = `${player.health}%`;
}

function updateCharge(value) {
    const chargeElement = document.getElementById('charge-value');
    const chargeFill = document.querySelector('#charge-bar .progress-fill');
    chargeElement.textContent = Math.round(value);
    chargeFill.style.width = `${value}%`;
}

// 这些函数的存根，稍后我们会实现它们
function loadGameState() {
    // 加载游戏状态
}

function stopBackgroundMusic() {
    // 停止背景音乐
}

function playBackgroundMusic() {
    // 播放背景音乐
}

function gameLoop(timestamp) {
    if (!gameStarted || gameOver) return;

    if (!isPaused) {
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 更新和绘制玩家
        player.update(deltaTime);
        player.draw(ctx);

        // 更新和绘制敌人
        updateEnemies(deltaTime);
        enemies.forEach(enemy => enemy.draw(ctx));

        // 更新和绘制子弹
        updateBullets(deltaTime);
        bullets.forEach(bullet => bullet.draw(ctx));

        // 生成新的敌人
        spawnEnemy();

        // 检查碰撞
        checkCollisions();

        // 更新HUD
        updateHUD();

        // 如果是自动模式，更新自动操作
        if (isAutoPlay) {
            autoPlayUpdate();
        }
    }

    // 继续下一帧
    requestAnimationFrame(gameLoop);
}

// 添加这些辅助函数
function updateAndDrawStars() {
    // 实现星星背景的更新和绘制
}

function updateEnemies(deltaTime) {
    enemies.forEach((enemy, index) => {
        enemy.update();
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
        }
    });
}

function updateBullets(deltaTime) {
    bullets.forEach((bullet, index) => {
        bullet.update();
        if (bullet.y + bullet.height < 0) {
            bullets.splice(index, 1);
        }
    });
}

function updatePowerUps(deltaTime) {
    // 实现道具的更新和绘制
}

function updateParticles(deltaTime) {
    // 实现粒子效果的更新和绘制
}

function spawnEnemy() {
    if (Math.random() < 0.02) {
        enemies.push(new Enemy());
    }
}

function spawnPowerUp() {
    // 实现生成新道具的逻辑
}

function updateHUD() {
    updateScore(score);
    updateHealth(player.health);
}

function autoPlayUpdate() {
    // 实现自动模式的逻辑
}

function checkCollisions() {
    enemies.forEach((enemy, enemyIndex) => {
        bullets.forEach((bullet, bulletIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                enemies.splice(enemyIndex, 1);
                bullets.splice(bulletIndex, 1);
                updateScore(score + 10);
            }
        });

        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            enemies.splice(enemyIndex, 1);
            updateHealth(player.health - 20);
            if (player.health <= 0) {
                gameOver = true;
            }
        }
    });
}

// Player 类的定义
class Player {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 10;
        this.speed = 5;
        this.health = 100;
        this.charging = false;
        this.chargeValue = 0;
    }

    update(deltaTime) {
        if (keys['ArrowLeft'] && this.x > 0) this.x -= this.speed;
        if (keys['ArrowRight'] && this.x < canvas.width - this.width) this.x += this.speed;
        if (keys['ArrowUp'] && this.y > 0) this.y -= this.speed;
        if (keys['ArrowDown'] && this.y < canvas.height - this.height) this.y += this.speed;

        if (keys[' '] && bullets.length < 5) {
            this.shoot();
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    shoot() {
        bullets.push(new Bullet(this.x + this.width / 2, this.y));
    }

    reset() {
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 10;
        this.health = 100;
        this.charging = false;
        this.chargeValue = 0;
    }
}

// 添加 Bullet 类
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 15;
        this.speed = 7;
    }

    update() {
        this.y -= this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// 添加 Enemy 类
class Enemy {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = -this.height;
        this.speed = 2;
    }

    update() {
        this.y += this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}