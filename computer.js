(function(){
  if(typeof Pong === "undefined"){
    window.Pong = {}
  }

  var Computer = Pong.Computer = function(context) {
    this.paddle = new Pong.Paddle(10, 250, 20, 100, context);
  };


  Computer.prototype.render = function() {
    this.paddle.render();
  };

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

})();
