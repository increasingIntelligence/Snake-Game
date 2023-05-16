// Set up the canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set up the game variables
let snake = [{ x: 10, y: 10 }];
let direction = "right";
let food = generateFood();
let score = 0;
let speed = 200;

// Set up the game loop
let gameLoop = setInterval(() => {
  clearCanvas();
  moveSnake();
  drawSnake();
  drawFood();
  drawScore();
}, speed);

// Handle keypress events to change the direction of the snake
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
});

// Handle button clicks to change the direction of the snake
document.getElementById("left-btn").addEventListener("click", () => {
  if (direction !== "right") {
    direction = "left";
  }
});

document.getElementById("right-btn").addEventListener("click", () => {
  if (direction !== "left") {
    direction = "right";
  }
});

document.getElementById("up-btn").addEventListener("click", () => {
  if (direction !== "down") {
    direction = "up";
  }
});

document.getElementById("down-btn").addEventListener("click", () => {
  if (direction !== "up") {
    direction = "down";
  }
});

// Handle level selection
document.getElementById("level").addEventListener("change", (event) => {
  const selectedLevel = event.target.value;
  if (selectedLevel === "easy") {
    speed = 200;
  } else if (selectedLevel === "medium") {
    speed = 100;
  } else if (selectedLevel === "hard") {
    speed = 50;
  }
  clearInterval(gameLoop);
  gameLoop = setInterval(() => {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();
    drawScore();
  }, speed);
});

// Helper function to clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// Helper function to move the snake
function moveSnake() {
// Get the current head of the snake
const head = snake[0];

// Determine the new head position based on the current direction
let newHead;
if (direction === "up") {
newHead = { x: head.x, y: head.y - 1 };
} else if (direction === "down") {
newHead = { x: head.x, y: head.y + 1 };
} else if (direction === "left") {
newHead = { x: head.x - 1, y: head.y };
} else if (direction === "right") {
newHead = { x: head.x + 1, y: head.y };
}

// Add the new head to the beginning of the snake array
snake.unshift(newHead);

// If the new head position is the same as the food position, generate a new piece of food, increase the score, and do not remove the tail of the snake
if (newHead.x === food.x && newHead.y === food.y) {
food = generateFood();
score++;
} else {
// Remove the tail of the snake
snake.pop();
}
}

// Helper function to draw the snake
function drawSnake() {
ctx.fillStyle = "black";
snake.forEach((segment) => {
ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
});
}

// Helper function to generate a new piece of food
function generateFood() {
const x = Math.floor(Math.random() * canvas.width / 10);
const y = Math.floor(Math.random() * canvas.height / 10);
return { x, y };
}

// Helper function to draw the food
function drawFood() {
ctx.fillStyle = "red";
ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
}

// Helper function to draw the score
function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}