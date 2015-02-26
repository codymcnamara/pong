// create board, iterate through game functions
(function(){
  if(typeof Pong === "undefined"){
    window.Pong = {}
  }

  var Game = Pong.Game = function(context, width, height){
    this.width = width;
    this.height = height;
    this.context = context;
    this.player = new Pong.Player(context);
    this.computer = new Pong.Computer(context);
    this.ball = new Pong.Ball(450, 300, context);
  };

  var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };


  Game.prototype.start = function(){
    animate(this.step.bind(this));
  };

  Game.prototype.step = function() {
    this.update();
    this.render();
    animate(this.step.bind(this));
  };

  Game.prototype.update = function() {
    this.ball.update(this.player.paddle, this.computer.paddle);
    this.computer.update(this.ball);
    this.player.update();
  };

  Game.prototype.render = function() {
    this.context.fillStyle = "#000000";
    this.context.fillRect(0, 0, this.width, this.height);
    this.player.render();
    this.computer.render();
    this.ball.render();
  };

})();
