//setting
var player = {
  width: 60,
  height: 60,
  color: "#0000FF", // blue
  x: 0,
  y: 0,
}

var enemy = {
  width: player.width,
  height: player.height,
  color: "#FF0000", // red
  x: 0,
  y: 0,
}

var point = {
  width: player.width,
  height: player.height,
  color: "#FFFF00", // red
  x: 0,
  y: 0,
}

var tile = {
  width: player.width + 10,
  height: player.height + 10,
  x: 0,
  y: 0,
  tilesX: 5,
  tilesY: 5,
  color: "#414141",
}

var moveH = {
  x: 0,
  y: 0,
  keyup: true
}
