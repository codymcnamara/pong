(function(){
  if(typeof Pong === "undefined"){
    window.Pong = {}
  }

  var Ball = Pong.Ball = function(x, y, context, game) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.x_speed = 10;
    this.y_speed = 0;
    this.radius = 15;
    this.game = game;
  };

  Ball.prototype.render = function() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    this.context.fillStyle = "#FFF";
    this.context.fill();
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
      this.x < 0 ? this.game.rightScore += 1 : this.game.leftScore += 1;
      this.y_speed = -this.y_speed;
      this.x_speed = -this.x_speed;
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
})();
