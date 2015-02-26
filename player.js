(function(){
  if(typeof Pong === "undefined"){
    window.Pong = {}
  }

  var Player = Pong.Player = function(context) {
     this.paddle = new Pong.Paddle(870, 250, 20, 100, context);
  };


  Player.prototype.render = function() {
    this.paddle.render();
  };

  Player.prototype.update = function(){
    for(var i = 0; i < key.getPressedKeyCodes(); i++){
      if(key.getPressedKeyCodes()[i] === 38){
        this.paddle.move(-5);
      } else if (key.getPressedKeyCodes()[i] === 40){
        this.paddle.move(5);
      }
    }
  };

})();
