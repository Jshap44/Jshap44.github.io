// Select the canvas element with ID 'canvas1' using querySelector
const canvas = document.querySelector('#canvas1');
// Get the 2D drawing context for the canvas
const ctx = canvas.getContext('2d');

// Set the dimensions of the canvas
canvas.width = 400;
canvas.height = 800;

// Array to track key states (e.g., which keys are currently pressed)
const keys = [];

// Global array to store collected digit values
window.digits = [];
// Max number of digits to collect
const length = 10;
// Whether the game is paused
let paused = false;

// Define the player object with position, size, speed, and movement status
const player = {
  x: 200,
  y: 600,
  width: 24,
  height: 22,
  speed: 5,
  moving: false
};

// Create 10 balls with random positions and unique number labels
const balls = [];
for (let i = 0; i < 10; i++) {
  balls.push({
    x: Math.random() * (canvas.width - 40) + 20, //gives value between 0 and canvas.width - 40 to account for ball diameter
    y: Math.random() * canvas.height,            // Random Y position
    radius: 20,
    label: i.toString()                          // Label as string (0–9)
  });
}

// Load player sprite image
const playerSprite = new Image();
playerSprite.src = "./guy.png";

// Load background image
const background = new Image();
background.src = "./background.jpg";

// Check collision between a ball and the player using Axis-Aligned Bounding Box (AABB)
function isCollidingAABB(ball, player) {
  return (
    ball.x + ball.radius > player.x &&
    ball.x - ball.radius < player.x + player.width &&
    ball.y + ball.radius > player.y &&
    ball.y - ball.radius < player.y + player.height
  );
}

// Main animation loop
function animate() {
  // Draw the background image over the entire canvas
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // Loop over all balls
  balls.forEach(ball => {
    // Move the ball downward if not paused
    if (!paused) {
      ball.y += 5;

      // Reset ball to top if it goes off the bottom of the screen
      if (ball.y - ball.radius > canvas.height) {
        ball.y = -ball.radius;
        ball.x = Math.random() * (canvas.width - 40) + 20;
      }
    }

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    // Draw the number label on the ball
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(ball.label, ball.x, ball.y);

    // Check for collision with player and collect number if conditions are met
    if (isCollidingAABB(ball, player) && window.digits.length < length && !paused) {
      window.digits.push(parseInt(ball.label)); // Add label to digits array
      console.log("Digits collected:", window.digits);

      // Reset ball to a new random position
      ball.y = -ball.radius;
      ball.x = Math.random() * (canvas.width - 40) + 20;

      // If enough digits are collected, pause the game
      if (window.digits.length === length) {
        paused = true;
        console.log("Paused! Press Enter to continue.");
      }
    }
  });

  // Draw the player sprite
  drawSprite(playerSprite, 0, 0, player.width, player.height, player.x, player.y, player.width, player.height);
  
  // Move player based on key input
  move();

  // Request the next animation frame
  requestAnimationFrame(animate);
}

// Draw a sprite from a source image
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

// Start the game loop once the background image is fully loaded
background.onload = () => {
  animate();
};

// Handle keydown events
window.addEventListener("keydown", function (event) {
  keys[event.keyCode] = true; // Track that this key is being held down

  // If paused and Enter is pressed, resume the game
  if (paused && event.key === "Enter") {
    console.log("Game resumed!");
    window.digits.splice(0, window.digits.length); // Clear collected digits
    paused = false;
  }
});

// Handle keyup events
window.addEventListener("keyup", function (event) {
  delete keys[event.keyCode]; // Remove key from active tracking
});

// Move the player according to arrow key inputs
function move() {
  if (keys[38] && player.y > 0) { // Up arrow
    player.y -= player.speed;
  }
  if (keys[37] && player.x > 0) { // Left arrow
    player.x -= player.speed;
  }
  if (keys[40] && player.y < canvas.height - player.height) { // Down arrow
    player.y += player.speed;
  }
  if (keys[39] && player.x < canvas.width - player.width) { // Right arrow
    player.x += player.speed;
  }
}
