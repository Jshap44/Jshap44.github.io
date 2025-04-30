const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 520;
canvas.height = 700;

const keys = [];

window.digits = [];
const length = 10;
let paused = false;

const player = {
  x: 200,
  y: 500,
  width: 24,
  height: 22,
  speed: 5,
  moving: false
};

const balls = [];
for (let i = 0; i < 10; i++) {
  balls.push({
    x: Math.random() * (canvas.width - 40) + 20,
    y: Math.random() * canvas.height,
    radius: 20,
    label: i.toString()
  });
}

const playerSprite = new Image();
playerSprite.src = "./guy.png";

const background = new Image();
background.src = "./background.jpg";

//CF2 project incorporation
function isCollidingAABB(ball, player) {
  return (
    ball.x + ball.radius > player.x &&
    ball.x - ball.radius < player.x + player.width &&
    ball.y + ball.radius > player.y &&
    ball.y - ball.radius < player.y + player.height
  );
}

function animate() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
  
    if (!paused) {
      ball.y += 5.5;
  
      if (ball.y - ball.radius > canvas.height) {
        ball.y = -ball.radius;
        ball.x = Math.random() * (canvas.width - 40) + 20;
      }
    }

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(ball.label, ball.x, ball.y);
    

    if (isCollidingAABB(ball, player) && window.digits.length < length && !paused) {
      window.digits.push(parseInt(ball.label));
      console.log("Digits collected:", window.digits);
      ball.y = -ball.radius;
      ball.x = Math.random() * (canvas.width - 40) + 20;

      if (window.digits.length === length) {
        paused = true;
      
        const confirmBox = document.querySelector("#confirmBox");
        const confirmText = document.querySelector("#confirmText");
        const yesBtn = document.querySelector("#yesBtn");
        const noBtn = document.querySelector("#noBtn");
      
        const number = window.digits.join("");
      
        confirmBox.style.display = "block";
      
        yesBtn.onclick = () => {
          const confirmationMessage = document.querySelector("#confirmationMessage");
          confirmationMessage.textContent = "Cool — press Enter to play again";
          confirmationMessage.style.display = "flex"; // ⬅️ Add this here
          confirmBox.style.display = "none";
        };
      
        noBtn.onclick = () => {
          confirmBox.style.display = "none";
          window.digits.splice(0, window.digits.length);
          paused = false;
        };
      }      
    }
  };

  //player movement video https://www.youtube.com/watch?v=EYf_JwzwTlQ
  drawSprite(playerSprite, 0, 0, player.width, player.height, player.x, player.y, player.width * 2, player.height * 2);


  move();
  requestAnimationFrame(animate);
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

background.onload = () => {
  animate();
};

window.addEventListener("keydown", function (event) {
  keys[event.keyCode] = true;

  if (paused && event.key === "Enter") {
    console.log("resumed");
    window.digits.splice(0, window.digits.length); 
    paused = false;

    const confirmationMessage = document.querySelector("#confirmationMessage");
    confirmationMessage.textContent = "";
    confirmationMessage.style.display = "none";
  }
});

window.addEventListener("keyup", function (event) {
  delete keys[event.keyCode];
});

function move() {
  if (keys[38] && player.y > 0) {
    player.y -= player.speed;
  }
  if (keys[37] && player.x > 0) {
    player.x -= player.speed;
  }
  if (keys[40] && player.y < canvas.height - player.height) {
    player.y += player.speed;
  }
  if (keys[39] && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }
}
