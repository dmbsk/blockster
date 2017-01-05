var canvasWidth = 720
var canvasHeight = 480
var centerX = canvasWidth / 2
var centerY = canvasHeight / 2
var FPS = 60
var canvas

window.load = function(){
  var canvasElement = $("<canvas width='" + canvasWidth + "' height='" + canvasWidth + "'></canvas>")
  canvas = canvasElement.get(0).getContext("2d")
  canvasElement.appendTo('body')
}

setInterval(function(){
  update()
  draw()
}, 1000/FPS)


/// Other functions
