class FruitGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score-value');
        this.score = 0;
        this.fruits = [];
        this.slices = [];
        this.lastTime = 0;
        this.fruitInterval = 1000;
        this.lastFruitTime = 0;
        this.gameState = 'playing'; // 'playing', 'gameover'
        this.lives = 3;

        this.fruitTypes = ['apple', 'orange', 'watermelon', 'pineapple', 'bomb'];
        this.fruitImages = {};
        this.loadImages();

        this.sliceSound = new Audio(this.sliceSoundData);
        this.bombSound = new Audio(this.bombSoundData);
        this.backgroundMusic = new Audio(this.backgroundMusicData);
        this.backgroundMusic.loop = true;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.canvas.addEventListener('touchstart', (e) => this.handleTouch(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouch(e));

        this.backgroundMusic.play();
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    loadImages() {
        const imageData = {
            apple: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAADu0lEQVR4nO2WW0hjVxjH/+fk5EQTTdTEqGhEU7XeaFAzKipYaWGwdR68oOhM6cVbd2DKdMTLPrQg+lB8qC/zoA/7sA/bUoaWgRkc2u3SbWGLbXG3u2p3x2Rdt2o0Md6SY07P2Qc1JuZoopMMzL7kDwfO+c7v+53/+c4hcI1rXOGIVKXJVqe/Cue5QiEpGo0+EgwGPxVFsYNzHmSMPUcI+XFubs6/J4GsrKy7GGM/AXieEFLDOW8RQnxhGJ8QQl7nnH8D4GYikfhqfn7+z7QFdDrdI5TSXwkhd3DOIYoiKKUghIAQAkIICCEwDON9QRBe45y/xDkPAXhxYWHheFcBnU73EqX0R0JI9eTkJCwWC8xmM4xGIwwGA/R6PXQ6HbRaLTQaDdRqNVQqFZRKJRQKBWQyGaRSKSQSCcRiMYhEIhAEAYIggDEGxhg451hZWUEkEnnbNM0XOOePLi4uTu9KQK1WP0kp/Z4QUjc1NQWr1Qqz2QyTyQSj0Qi9Xg+dTgedTgetVguNRgO1Wg2VSgWlUgmFQgG5XA6ZTAapVAqJRAKxWAyCIEAQBDDGkEwmkUgkEI/HEYvFEI1GEYlEEA6HEQqFEAwGEQgE4Pf7MT8/f4tz/tTy8vLCjgJqtfpZSukPhJCHZ2ZmYLPZYLFYYDabYTKZYDAYoNfrodVqodFooFarodFooFKpoFQqoVAoIJfLIZPJIJVKIZFIIBaLIQgCGGNgjCGZTCKRSCAejyMWiyEajSISiSAcDiMUCiEYDCIQCMDv98Pn82FxcRFra2uIx+PPra6u/rKtwH8m/54QUj8/Pw+73Q6r1QqLxQKz2QyTyQSDwQC9Xg+dTgetVguNRgO1Wg2VSgWlUgmFQgG5XA6ZTAapVAqJRAKxWAzGGBhjSCaTSCQSiMfjiMViiEajiEQiCIfDCIVCCAaDCAQC8Pv98Pl8WFpawvr6OhKJxAurq6vv/k9Ao9G8Qin9jhDS4HQ6YbfbYbPZYLVaYbFYYDabYTQaodfrv6OUNlJKMRgMolarP1AoFM8olcqbCoXiQblc/pBcLq+Uy+UVMpmsXCaTlUmlUolEIhEEQRhjjDHGWDKZTMbj8XgsFovGYrFINBqNhMPhcCgUCgWDwaDf7/f7fD6fz+fzLi8ve1dWVjzr6+sbGxsb0WQy+erq6uqbVwTUavXLlNJvCSGPuFwuOBwO2O122Gw2WK1WWCwWmM1mmEwmGI1GGAwG6PV66HQ6aLVaaLVaqNVqqFQqqFQqKJVKKJVKKBQKyOVyyOVyyGQySKVSSKVSiMViiEQiiEQiCIIAwf8nYIyBMYZkMgnGGBhjYIwhkUggHo8jFoshGo0iEokgHA4jFAohGAwiEAjA7/fD5/NhaWkJa2trSCQSr6+srLxxhf/ENf5l/AUj7hNSCQ3OEQAAAABJRU5ErkJggg==',
            orange: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEkUlEQVR4nO2WXUxbZRjH/+e0PT1tOaWlLR2lHSsshY6xdR+6ZRhkWbyYuAtduMULb9zcjZm6xGS7WLLEZPFqF8bdmGxkZjFZdDExumiMMZlGnU7BAcvaaQcUKC3Q0tNzjhdgpz0t/TrZxW7yJG9Ozvs+z+//vM/7nPcAHuEhh2jdqbVqLRRFOXpFRUUZNpvtpFar/YRl2RjP8zc4jvuB47hxjuOWAKyVlJTIABYBJLa1QK1Wv0hRlEoURYiiCFEUIYoiBEGAIAjgeR48z4PjOMzNzQ3EYrFTAKKCINxfXFz8NaMFarX6OEVRnyqVypN+vx8ejwdOpxMOhwN2ux1WqxUWiwVmsxkmkwlGoxEGgwF6vR46nQ5arRYajQZqtRoqlQpKpRIKhQJyuRxyuRwymQxSqRQSiQRisRgikQgikQiCIEAQBPA8D57nwXEcOI7DysoKlpeXMTc3h+np6R9jsdgbAD5fWlqKZrSAYZjXKYr6RKlUNgYCAXg8HrhcLjidTjgcDtjtdlitVlgsFphMJhiNRhgMBuj1euh0Omi1Wmg0GqjVaqhUKiiVSigUCsjlcshkMkzPRHFvOoJweBGRyBLC4UUsLCwiFFpAMBjC/HwQ9+8HMDs7i5mZGUxNTWFychITExMYHx/H2NgYRkdHMTIygqGhIQwODmJgYAD9/f3o6+tDb28vent7cenSJZw/fx5nz57FmTNncPr0aZw6dQonT57EiRMncPz4cRw7dgxHjx7FkSNH0NHRgfb2drS1taG1tRUtLS1obm5GU1MTGhsb0dDQgPr6etTV1aG2thY1NTWorq5GVVUVKisrUVFRgfLycpSVlaG0tBQlJSUoLi5GUVERCgsLUVBQgPz8fOTl5SE3Nxc5OTnIzs5GVlYWMjMzkZGRgfT0dKSlpSE1NRUpKSlITk5GUlISkpKSYDAYkJeXh9LSUlRXV6O+vh6NjY1oampCS0sLWltb0dbWhra2NrS3t6OjowPt7e1oa2tDa2srWlpa0NzcjKamJjQ2NqKhoQH19fWoq6tDbW0tampqUF1djaqqKlRWVqKiogLl5eUoKytDaWkpiouLUVRUhMLCQuTn5yMvLw+5ubnIyclBdnY2srKykJmZifT0dKSlpSE1NRUpKSlITk5GUlISjEYj8vPzUVZWhpqaGtTX16OxsRHNzc1oaWlBa2sr2tra0N7ejo6ODrS3t6OtrQ2tra1oaWlBc3MzmpqaYLFYkJqaiqSkJBiNRuTn56O0tBTV1dWor69HY2MjmpubH1jQ0dGB9vZ2tLW1obW1FS0tLWhubkZTUxMaGhpQX1+Puro61NbWoqamBtXV1aiqqkJlZSUqKipQXl6OsrIylJaWori4GEVFRSgsLERBQQHy8/ORl5eH3NxcZGdnIysrC5mZmUhPT0daWhpSU1ORkpKC5ORkJCUlwWg0Ii8vD6WlpaiqqkJtbS3q6+vR0NCApqYmNDc3o6WlBa2trQ8s6OjoQHt7O9ra2tDa2oqWlha0tLSgubkZTU1NaGxsRENDA+rr61FXV4fa2lrU1NSguroaVVVVqKysREVFBcrLy1FWVobS0lIUFxejqKgIhYWFKCgoQH5+PvLy8pCbm4vc3Fzk5OQgOzsb2dnZyMrKQmZmJjIyMpCeno60tDSkpaUhNTUVKSkpSE5ORlJSEoxGI/Ly8lBaWorq6mrU19ejsbERTU1NaG5ufmDBQxn/AKZwVa4J1XROAAAAAElFTkSuQmCC',
            watermelon: 'data:image/png;base64,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',
            pineapple: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEZElEQVR4nO2WXUybZRTH/+3b0tKWtrSllFIohVIo31TGnAwc4sMSp5kvFzOXLHHJluxqV7vRaLzZzXazxGW72cVMnU4Nl2jijGgUg5sKjsFGGR+lUkAKlEIppS0tpW/7vB5aaPsW6Myu9iRPTp73nPP/n+c5z3kO8D/+5RDdcafWoINCodh3R1VVVVlFRcUpg8HwBcuyMZ7nb3Ic9xPHcWMcxy0BWCsrK5MBLAJIbGuBwWBoUSgUKlEUsbq6ClEUsba2BkEQwPM8eJ4Hx3HgOA5zc3MDKysrpwFERUG4v7i4+HtGCwwGwwmFQvGlUqk8FQgE4PF44HQ64XA4YLfbYbPZYLVaYbFYYDabYTKZYDQaYTAYoNfrodPpoNVqodFooFarodFooFKpoFQqoVAoIJfLIZPJIJVKIZFIIBaLIRKJIAgCBEEAz/PgeR4cx4HjOKysrCAajSIajWJ5eRnLy8uIRqNYWlrC4uIiFhYWMD8/j1AohFAohGAwiLm5OczOzmJmZgbT09OYmprC5OQkJiYmMD4+jrGxMYyOjmJkZATDw8MYGhrC4OAgBgYG0N/fj76+PvT29qKnpwfd3d3o6upCZ2cnOjo6cOHCBZw/fx7nzp3D2bNncebMGZw+fRqnTp3CyZMnceLECRw/fhzHjh3D0aNHceTIERw+fBiHDh3CwYMHceDAAezfvx/79u3D3r17sWfPHjQ3N6OpqQmNjY1oaGhAfX096urqUFtbi5qaGlRXV6OqqgqVlZWoqKhAeXk5ysrKUFpaipKSEhQXF6OoqAiFhYUoKChAfn4+8vLykJubi5ycHGRnZyMrKwuZmZnIyMhAeno60tLSkJqaipSUFCQnJyMpKQlGoxF5eXkoLS1FdXU16uvrH1vQ1NSE5uZm7N69G7t370ZLSwtaWlrQ3NyMpqYmNDY2oqGhAfX19airq0Ntbe1jC6qqqh5bUFFRgfLycpSVlaG0tBQlJSUoLi5GUVERCgsLUVBQgPz8fOTl5SE3Nxc5OTnIzs5GVlYWMjMzkZGRgfT0dKSlpSE1NRUpKSlITk6G0WhEfn4+ysvLUVlZiYqKCpSXl6OsrAylpaUoKSlBcXExioqKUFhYiIKCAuTn5yMvLw+5ubnIyclBdnY2srKykJmZiYyMDKSnpyMtLQ2pqalISUlBcnIyjEYj8vLyUFpaiqqqKlRXV6OmpgbV1dWoqqpCZWUlKioqUF5ejrKyMpSWlqKkpATFxcUoKipCYWEhCgoKkJ+fj7y8POTm5iInJwfZ2dnIyspCZmYmMjIykJ6ejrS0NKSmpj62IC8vD6WlpaiqqqJzUFNTg+rqalRVVaGyshIVFRUoLy9HWVkZSktLUVJSguLiYhQVFaGwsBAFBQXIz89HXl4ecnNzkZOTg+zsbGRlZSEzMxMZGRlIT09HWloaUlNTkZKSguTkZBiNRuTl5aG0tBRVVVWoqalBdXU1qqqqUFlZiYqKCpSXl6OsrAylpaUoKSlBcXExioqKUFhYiIKCAuTn5yMvLw+5ubnIyclBdnY2srKykJmZiYyMDKSnpyMtLQ2pqalISUlBcnIyjEYj8vLyUFpaiqqqKlRXV6OmpgZVVVWorKxERUUFysvLUVZWhtLSUpSUlKC4uBhFRUUoLCxEQUEB8vPzkZeXh9zcXOTk5CA7OxtZWVnIzMxERkYG0tPTkZaWhtTUVKSkpCA5ORlGoxF5eXkoLS1FVVUVqqurUVNTg6qqKlRWVqKiouIfW/A3VKmCVEZZmVsAAAAASUVORK5CYII=',
            bomb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHElEQVR4nO2WW0yb5xXHf7bBYGPAGBuMbQw2mEuAcA2BEAiQNE1aSJq0SdM0bdKLNlGrdlNXqas2VdvUbdLUdZq6Tl2lSpO2qlKvrVRt0qZNXRtCQri5gG2wuRiMsQ02xmDj2++zD4Cv/QJp0qp92JP8pKPvfZ/z/5/znPOcI/A/vsUQPO9JtVoFkUi074qKigpTWVnZKY1G8ynDMFGWZW8wDPMjwzBjDMMsAFgtLS0VASwAiG9rgUaj+Z5IJJKIoojV1VWIooi1tTXwPA+WZcGyLBiGAcMwmJub61tZWTkNICLw/P2FhYVfM1qg0WhOiESiz8Ri8alAIACXywWbzQar1Qqz2QyTyQSj0QiDwQC9Xg+dTgetVguNRgO1Wg2VSgWlUgmFQgG5XA6ZTAapVAqJRAKxWAyRSARBECAIAliWBcuyYBgGDMOA4zhwHIdIJIJwOIxwOIylpSUsLS0hHA5jcXERCwsLmJ+fRygUQigUQjAYxNzcHGZnZzEzM4Pp6WlMTU1hcnISExMTGB8fx9jYGEZHRzEyMoLh4WEMDg5iYGAA/f396Ovrw7Vr19Db24vu7m50dXWhs7MTHR0daG9vx4ULF3D+/HmcO3cOZ8+exZkzZ3D69GmcOnUKJ0+exIkTJ3D8+HEcO3YMR48exZEjR3D48GEcOnQIBw8exIEDB7B//37s27cPe/fuxZ49e9Dc3IympibU1dWhtrYWNTU1qK6uRlVVFSorK1FRUYHy8nKUlZWhtLQUJSUlKC4uRlFREQoLC1FQUIC8vDzk5uYiJycH2dnZyMrKQmZmJjIyMpCeno60tDSkpqYiJSUFycnJSEpKglarhU6nQ2lpKaqrq1FbW4u6ujrU19ejtrYWNTU1qK6uRlVVFSorK1FRUYHy8nKUlZWhtLQUJSUlKC4uRlFREQoLC1FQUIC8vDzk5uYiJycH2dnZyMrKQmZmJjIyMpCeno60tDSkpqYiJSUFycnJ0Gq10Ol0KC0tRXV1NWpra1FXV4f6+no0NDSgoaEBdXV1qK2tRU1NDaqrq1FVVYXKykpUVFSgvLwcZWVlKC0tRUlJCYqLi1FUVISCggLk5eUhNzcXOTk5yM7ORlZWFjIzM5GRkYH09HSkpaUhNTUVKSkpSE5OhlarRW5uLkpKSlBZWYmKigqUl5ejrKwMpaWlKCkpQXFxMYqKilBYWIiCggLk5eUhNzcXOTk5yM7ORlZWFjIzM5GRkYH09HSkpaUhNTUVKSkpSE5OhlarRW5uLkpKSlBVVYXq6mpUV1ejqqoKlZWVqKioQHl5OcrKylBaWoqSkhIUFxejqKgIhYWFKCgoQF5eHnJzc5GTk4Ps7GxkZWUhMzMTGRkZSE9PR1paGlJTU5GSkgKtVovc3FyUlJSgqqoK1dXVqK6uRlVVFSorK1FRUY'
        };
        this.fruitImages = imageData;
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        this.checkFruitCut(x, y);
        this.slices.push({x, y, time: Date.now()});
    }

    checkFruitCut(x, y) {
        this.fruits.forEach((fruit, index) => {
            if (this.isPointInFruit(x, y, fruit)) {
                if (fruit.type === 'bomb') {
                    this.bombSound.play();
                    this.lives--;
                    if (this.lives <= 0) {
                        this.gameState = 'gameover';
                    }
                } else {
                    this.sliceSound.play();
                    this.fruits.splice(index, 1);
                    this.score += fruit.points;
                    this.scoreElement.textContent = this.score;
                    this.createFruitSlices(fruit);
                }
            }
        });
    }

    isPointInFruit(x, y, fruit) {
        const dx = x - fruit.x;
        const dy = y - fruit.y;
        return dx * dx + dy * dy <= fruit.radius * fruit.radius;
    }

    createFruitSlices(fruit) {
        // Create two halves of the fruit
        for (let i = 0; i < 2; i++) {
            this.fruits.push({
                ...fruit,
                isSlice: true,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                speedX: (Math.random() - 0.5) * 5
            });
        }
    }

    spawnFruit() {
        const type = this.fruitTypes[Math.floor(Math.random() * this.fruitTypes.length)];
        const fruit = {
            x: Math.random() * this.canvas.width,
            y: this.canvas.height,
            radius: 30,
            speedY: -10 - Math.random() * 5,
            rotation: 0,
            rotationSpeed: (Math.random() - 0.5) * 0.2,
            type: type,
            points: type === 'bomb' ? 0 : 10
        };
        this.fruits.push(fruit);
    }

    updateFruits(deltaTime) {
        this.fruits.forEach((fruit, index) => {
            fruit.y += fruit.speedY * deltaTime / 16;
            fruit.x += (fruit.speedX || 0) * deltaTime / 16;
            fruit.rotation += fruit.rotationSpeed * deltaTime / 16;
            fruit.speedY += 0.2; // gravity
            if (fruit.y - fruit.radius > this.canvas.height) {
                if (!fruit.isSlice && fruit.type !== 'bomb') {
                    this.lives--;
                    if (this.lives <= 0) {
                        this.gameState = 'gameover';
                    }
                }
                this.fruits.splice(index, 1);
            }
        });
    }

    drawFruits() {
        this.fruits.forEach(fruit => {
            this.ctx.save();
            this.ctx.translate(fruit.x, fruit.y);
            this.ctx.rotate(fruit.rotation);
            this.ctx.drawImage(this.fruitImages[fruit.type], -fruit.radius, -fruit.radius, fruit.radius * 2, fruit.radius * 2);
            this.ctx.restore();
        });
    }

    drawSlices() {
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.slices.forEach((slice, index) => {
            if (index === 0) {
                this.ctx.moveTo(slice.x, slice.y);
            } else {
                this.ctx.lineTo(slice.x, slice.y);
            }
            if (Date.now() - slice.time > 100) {
                this.slices.splice(index, 1);
            }
        });
        this.ctx.stroke();
    }

    drawLives() {
        this.ctx.fillStyle = 'red';
        for (let i = 0; i < this.lives; i++) {
            this.ctx.fillRect(10 + i * 30, 40, 20, 20);
        }
    }

    gameLoop(currentTime) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameState === 'playing') {
            if (currentTime - this.lastFruitTime > this.fruitInterval) {
                this.spawnFruit();
                this.lastFruitTime = currentTime;
            }

            this.updateFruits(deltaTime);
            this.drawFruits();
            this.drawSlices();
            this.drawLives();
        } else if (this.gameState === 'gameover') {
            this.ctx.fillStyle = 'black';
            this.ctx.font = '48px Arial';
            this.ctx.fillText('Game Over', this.canvas.width / 2 - 100, this.canvas.height / 2);
            this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2 - 70, this.canvas.height / 2 + 60);
        }

        requestAnimationFrame((time) => this.gameLoop(time));
    }
}

window.onload = () => {
    new FruitGame();
};