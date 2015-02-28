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
    this.ball = new Pong.Ball(450, 300, context, this);
    this.rightScore = 0;
    this.leftScore = 0;
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
    if (this.leftScore === 10 || this.rightScore === 10){
      this.renderGameOver()
    } else {
      animate(this.step.bind(this));
    }
  };

  Game.prototype.renderGameOver = function () {
    if (this.leftScore === 10) {
      var message = "Sorry, you lose"
      var color = "red"
    } else if (this.rightScore === 10){
      var message = "You Win!"
      var color = "green"
    }

    $('.game-over').html(message).css("color", color)
    $('.retry').html("New Game?")

    $('retry').on('click', this.reset.bind(this))
  };

  Game.prototype.reset = function () {
    this.context.clearRect (0, 0, this.width, this.height);
    this.rightScore = 0;
    this.leftScore = 0;
    this.player.reset();
    this.computer.reset();

    $('end-info').html('')
  }

  Game.prototype.update = function() {
    this.ball.update(this.player.paddle, this.computer.paddle);
    this.computer.update(this.ball);
    this.player.update();
  };

  Game.prototype.dottedLine = function(){
    this.context.beginPath();
      this.context.setLineDash([5, 15]);
      this.context.lineWidth = 8;
      this.context.moveTo(450, 0);
      this.context.lineTo(450, 600);
    this.context.closePath();
    this.context.strokeStyle = '#d3d3d3';
    this.context.stroke();
  };

  Game.prototype.score = function(){
    this.context.font = '90px Audiowide';
    this.context.fillStyle = "#000"
    this.context.fillText(this.leftScore, 320, 90);
    this.context.fillText(this.rightScore, 490, 90);
  }

  Game.prototype.render = function() {
    this.context.fillStyle = "#ffffff";
    this.context.fillRect(0, 0, this.width, this.height);
    this.dottedLine();
    this.score();
    this.player.render();
    this.computer.render();
    this.ball.render();
  };

})();
