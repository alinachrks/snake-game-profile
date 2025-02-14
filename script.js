const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

// Устанавливаем размеры канваса
canvas.width = 600;
canvas.height = 300;

// Параметры змейки
let snake = [{ x: 50, y: 150 }];
let direction = { x: 10, y: 0 };
let food = { x: 300, y: 150 };
let growing = false;

// Генерация случайной позиции еды
function getRandomPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
        y: Math.floor(Math.random() * (canvas.height / 10)) * 10
    };
}

// Обновление змейки
function update() {
    let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Проверка на съедение еды
    if (head.x === food.x && head.y === food.y) {
        food = getRandomPosition();
        growing = true;
    }

    snake.unshift(head);
    
    if (!growing) snake.pop();
    else growing = false;

    // Проверка на выход за границы
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        resetGame();
    }
}

// Отрисовка змейки и еды
function draw() {
    ctx.fillStyle = "#1e1e1e"; // Тёмный фон
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);

    ctx.fillStyle = "lime";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 10, 10));
}

// Сброс игры при столкновении
function resetGame() {
    snake = [{ x: 50, y: 150 }];
    direction = { x: 10, y: 0 };
    food = getRandomPosition();
}

// Управление стрелками
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -10 };
    if (event.key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 10 };
    if (event.key === "ArrowLeft" && direction.x === 0) direction = { x: -10, y: 0 };
    if (event.key === "ArrowRight" && direction.x === 0) direction = { x: 10, y: 0 };
});

// Игровой цикл
function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

gameLoop();
