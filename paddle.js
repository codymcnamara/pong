// do different things if player is human or computer

(function(){
  if(typeof Pong === "undefined"){
    window.Pong = {}
  }

  var Paddle = Pong.Paddle = function(x, y, width, height, context){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
    this.context = context;
  };

  Paddle.prototype.render = function() {
    this.context.fillStyle = "#FFF";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  };

  Paddle.prototype.move = function(y) {
    this.y += y;
    if(this.y < 0) { //all the way to top
      this.y = 0;
    } else if (this.y + this.height > 600) { // all the way to the bottom
      this.y = 600 - this.height;
    }
  };

})();
