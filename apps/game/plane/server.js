const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.static('.'));

// 添加一个简单的路由来处理CORS预检请求
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

const players = {};
let food = generateFood();

function generateFood() {
    return {
        x: Math.floor(Math.random() * 40),
        y: Math.floor(Math.random() * 30)
    };
}

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinGame', () => {
        players[socket.id] = {
            snake: [{x: Math.floor(Math.random() * 40), y: Math.floor(Math.random() * 30)}],
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            direction: 'right',
            score: 0,
            health: 100
        };
    });

    socket.on('changeDirection', (direction) => {
        if (players[socket.id]) {
            players[socket.id].direction = direction;
        }
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        console.log('A user disconnected');
    });
});

function gameLoop() {
    for (let id in players) {
        const player = players[id];
        const head = {...player.snake[0]};

        switch (player.direction) {
            case 'ArrowUp': head.y--; break;
            case 'ArrowDown': head.y++; break;
            case 'ArrowLeft': head.x--; break;
            case 'ArrowRight': head.x++; break;
        }

        if (head.x === food.x && head.y === food.y) {
            player.snake.unshift(head);
            player.score += 10;
            food = generateFood();
        } else {
            player.snake.unshift(head);
            player.snake.pop();
        }

        // 碰撞检测
        if (head.x < 0 || head.x >= 40 || head.y < 0 || head.y >= 30) {
            player.health -= 10;
        }

        // 检查是否游戏结束
        if (player.health <= 0) {
            io.to(id).emit('gameOver', player.score);
            delete players[id];
        }
    }

    io.emit('gameState', { players, food });
}

setInterval(gameLoop, 100);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';  // 添加这行

http.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});