

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

const keys = [];

const player = {
    x: 0,
    y: 550,
    width: 24,
    height: 22,
    speed: 5
};

const playerSprite = new Image();
playerSprite.src = "./guy.png";
const background = new Image();
background.src = "./background.jpg";

