var animate = window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.createElement('canvas');
var width = 900;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};


var step = function() {
  update();
  render();
  animate(step);
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(450, 300);

var update = function() {
  ball.update(player.paddle, computer.paddle);
  computer.update(ball);
  player.update();
};

var render = function() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, width, height);
  player.render();
  computer.render();
  ball.render();
};


function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

Paddle.prototype.render = function() {
  context.fillStyle = "#0000FF";
  context.fillRect(this.x, this.y, this.width, this.height);
};


function Player() {
   this.paddle = new Paddle(870, 250, 20, 100);
}

function Computer() {
  this.paddle = new Paddle(10, 250, 20, 100);
}

Player.prototype.render = function() {
  this.paddle.render();
};

Computer.prototype.render = function() {
  this.paddle.render();
};

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 10;
  this.y_speed = 0;
  this.radius = 15;
}

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#FFF";
  context.fill();
};

Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;

  var left_x = this.x - this.radius;
  var top_y = this.y - this.radius;
  var right_x = this.x + this.radius;
  var bottom_y = this.y + this.radius;

  if(this.y - this.radius < 0) { // hitting the top wall
    this.y = this.radius;
    this.y_speed = -this.y_speed;
  } else if(this.y + this.radius > 600) { // hitting the bottom wall
    this.y = 585;
    this.y_speed = -this.y_speed;
  }

  if(this.x < 0 || this.x > 900) { // a point was scored
    this.y_speed = 0;
    this.x_speed = 10;
    this.x = 450;
    this.y = 300;
  }

  if(left_x < (paddle1.x + paddle1.width) && right_x > paddle1.x && bottom_y > paddle1.y && top_y < (paddle1.y + paddle1.height)){
    // hit player1's paddle
    var relativeIntersectY = (paddle1.y + (paddle1.height/2)) - this.y;
    var normalizedRelativeIntersectionY = (relativeIntersectY/(paddle1.height/2));
    var bounceAngle = normalizedRelativeIntersectionY * 3*Math.PI/12;
    this.x_speed = -10*Math.cos(bounceAngle);
    this.y_speed = 10*-Math.sin(bounceAngle);

  } else if (left_x < (paddle2.x + paddle2.width) && right_x > paddle2.x && bottom_y > paddle2.y && top_y < (paddle2.y + paddle2.height)){
    // hit player2's paddle
    var relativeIntersectY = (paddle2.y + (paddle2.height/2)) - this.y;
    var normalizedRelativeIntersectionY = (relativeIntersectY/(paddle2.height/2));
    var bounceAngle = normalizedRelativeIntersectionY * 3*Math.PI/12;
    this.x_speed = 10*Math.cos(bounceAngle);
    this.y_speed = 10*-Math.sin(bounceAngle);
  }
};

Paddle.prototype.move = function(y) {
  this.y += y;
  if(this.y < 0) { //all the way to top
    this.y = 0;
    // this.x_speed = 0;
  } else if (this.y + this.height > 600) { // all the way to the bottom
    this.y = 600 - this.height;
    // this.x_speed = 0;
  }
}

Player.prototype.update = function(){
  for(var i = 0; i < key.getPressedKeyCodes(); i++){
    if(key.getPressedKeyCodes()[i] === 38){
      this.paddle.move(-5);
    } else if (key.getPressedKeyCodes()[i] === 40){
      this.paddle.move(5);
    }
  }
}

Computer.prototype.update = function(ball) {
  var y_pos = ball.y;

  var diff = -((this.paddle.y + (this.paddle.height / 2)) - y_pos);

  if(diff < -4) { // max speed up
    diff = -5;
  } else if(diff > 4) { // max speed down
    diff = 5;
  }
  this.paddle.move(diff);
  if(this.paddle.y < 0) {
    this.paddle.y = 0;
  } else if (this.paddle.y + this.paddle.height > 600) {
    this.paddle.y = 600 - this.paddle.height;
  }
};
