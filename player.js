(function(){
  if(typeof Pong === "undefined"){
    window.Pong = {}
  }

  var Player = Pong.Player = function(context, side) {
    if( side === "L" ){
      this.paddle = new Pong.Paddle(10, 250, 20, 100, context);
      this.assignKeyCommands("left")
    } else {
      this.paddle = new Pong.Paddle(870, 250, 20, 100, context);
      this.assignKeyCommands("right")
    }
  };


  Player.prototype.render = function() {
    this.paddle.render();
  };

  Player.prototype.assignKeyCommands = function(side){
    if ( side = "left" ) {
      this.upKey = 83;
      this.downKey = 87;
    } else if ( side == "right" ){
      this.upKey = 38;
      this.downKey = 40;
    }
  };

  Player.prototype.update = function(){
    for(var i = 0; i < key.getPressedKeyCodes(); i++){
      if(key.getPressedKeyCodes()[i] === this.upKey){
        this.paddle.move(-5);
      } else if (key.getPressedKeyCodes()[i] === this.downKey){
        this.paddle.move(5);
      }
    }
  };

  Player.prototype.reset = function(){
    this.paddle.reset(870, 250);
  };

})();
