
var CandleBlower, imgDir;

var myElement = document.getElementById('thisisit');
var mc = new Hammer(myElement);


imgDir = "./img";

CandleBlower = function() {
  var blow, blowOutCandle, canDrawText, candle, candleX, candles, curPos, drawText, drawWind, litCandles, player, pressed, stop, timeout, updatePos, wind;
  player = null;
  candle = null;
  wind = null;
  candles = [];
  candleX = [];
  litCandles = [];
  curPos = 1;
  pressed = false;
  drawWind = false;
  timeout = false;
  stop = false;
  canDrawText = false;
  var n = location.search.split('&n=')[1];
  var decision;
  if(n==1)
  {
    decision = "/boy.png";
  }
  else if(n==2)
  {
    decision = "/girl.png";
  }
 
  this.setup = function() {
    var i, screenThirds, _i, _j;
    screenThirds = (jaws.width - 100) / 3;
    for (i = _i = 0; _i <= 2; i = ++_i) {
      candleX[i] = screenThirds * (i + 1);
    }
    for (i = _j = 0; _j <= 2; i = ++_j) {
      candles[i] = new jaws.Sprite({
        image: imgDir + "/candle-lit.png",
        x: 0,
        y: 300
      });
      candles[i].x = candleX[i] - candles[i].image.width / 2;
      litCandles[i] = true;
    }
    player = new jaws.Sprite({
      image: imgDir + decision,
      x: candleX[curPos],
      y: 5
    });
    player.x = player.x - (player.image.width / 2);
    wind = new jaws.Sprite({
      image: imgDir + "/breath.png",
      x: candleX[curPos],
      y: 10 + (player.image.height / 1.3)
    });
    setTimeout(function() {
      timeout = true;
    }, 5000);
    canDrawText = true;
  };
  this.draw = function() {
    var _i, _len;
    jaws.clear();
    player.draw();
    for (_i = 0, _len = candles.length; _i < _len; _i++) {
      candle = candles[_i];
      candle.draw();
    }
    if (drawWind) {
      // console.log("Blowing");
      wind.x = candleX[curPos] - wind.image.width / 2;
      wind.draw();
    }
    if (canDrawText) {
      drawText("BLOW!");
    }
  };
  this.update = function() {
    var lit, oneLeft, _i, _len;
    if (timeout && !stop) {
      for (_i = 0, _len = litCandles.length; _i < _len; _i++) {
        lit = litCandles[_i];
        if (lit) {
          oneLeft = lit;
        }
      }
      if (!oneLeft) {
        parent.winstate = true;
      } else {
        parent.winstate = false;
      }
    }

    mc.on("tap press swipeleft swiperight", function(ev){
      if(ev.type == "swipeleft")
      {
          player.x = candleX[updatePos(1)] - (player.image.width / 2);
          pressed = true;
      }
      else if(ev.type == "swiperight")
      {
          player.x = candleX[updatePos(-1)] - (player.image.width / 2);
          pressed = true;
      }
      else if(ev.type == "tap")
      {
          blow();
          blowOutCandle(curPos);
          pressed = true;
      }

      if (pressed) {
          return setTimeout(function() {
            pressed = false;
          }, 200);
        }
    });



    if (!stop) {
      if (!pressed) {
        if ((jaws.pressed("left"))) {
          player.x = candleX[updatePos(-1)] - (player.image.width / 2);
          pressed = true;
        }
        if ((jaws.pressed("right"))) {
          player.x = candleX[updatePos(1)] - (player.image.width / 2);
          pressed = true;
        }
        if ((jaws.pressed("space"))) {
          // console.log("Blow");
          blow();
          blowOutCandle(curPos);
          pressed = true;
        }
        if (pressed) {
          return setTimeout(function() {
            pressed = false;
          }, 200);
        }
      }
    }
  };
  updatePos = function(x) {
    if (curPos + x < candleX.length && curPos + x >= 0) {
      curPos += x;
    }
    return curPos;
  };
  blow = function() {
    drawWind = true;
    return setTimeout(function() {
      drawWind = false;
    }, 200);
  };
  blowOutCandle = function(pos) {
    if (litCandles[pos]) {
      candles[pos].setImage(imgDir + "/candle-unlit.png");
      litCandles[pos] = false;
      return setTimeout(function() {
        litCandles[pos] = true;
        return candles[pos].setImage(imgDir + "/candle-lit.png");
      }, 3500);
    }
  };
  drawText = function(text) {
    var colour;
    jaws.context.font = "3em sans-serif";
    jaws.context.lineWidth = 1;
    jaws.context.textAlign = "center";
    colour = "Black";
    jaws.context.fillStyle = colour;
    jaws.context.fillText(text, jaws.width / 2, 200 + 100);
    canDrawText = true;
    setTimeout(function() {
      canDrawText = false;
    }, 500);
  };
  return this;
};

jaws.onload = function() {
  parent.letsgo = true;
   var n = location.search.split('&n=')[1];
   var decision;
  if(n==1)
  {
    decision = "/boy.png";
  }
  else if(n==2)
  {
    decision = "/girl.png";
  }
   // var decision = (n==1?"/boy.png":"girl.png");
  jaws.assets.add(imgDir + decision);
  jaws.assets.add(imgDir + "/candle-lit.png");
  jaws.assets.add(imgDir + "/candle-unlit.png");
  jaws.assets.add(imgDir + "/breath.png");
  jaws.preventDefaultKeys(["space", "left", "right", "up", "down"]);
  jaws.start(CandleBlower);
};

