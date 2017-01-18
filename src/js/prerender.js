/**
 * Created by towek on 1/6/2017.
 */
var enemyBlock = []
function drawOnce(){
  //Map
  prerender.fillStyle = tile.color
  prerender.fillRect(tile.x, tile.y, tile.width * tile.tilesX, tile.height * tile.tilesY)
  //Map grid
  prerender.scale(0.5, 0.5)
  generateMap()

  for(var i = 0; i < tile.tilesY; i++){
    difficulty[i] = maxFrequency / (i + 1)
    console.log(difficulty[i])
  }
}


function generateMap(){
  for(var x = 0; x < tile.tilesX; x++){
    for(var y = 0; y < tile.tilesY; y++){
      prerender.rect((centerX - x * tile.width + centerMap) * 2, (centerY - y * tile.height + centerMap) * 2, tile.width * 2, tile.height * 2)
      prerender.strokeStyle = 'green'
      prerender.lineWidth = 1
      prerender.stroke()
    }
  }
}

function createEnemys(amount){
  var e = []
  for(var i = 0; i < amount; i++){
    e[i] = new enemy()
    e[i].name += i
    e[i].y = centerY - (tile.height * tile.tilesY) * 0.5 + i * tile.height + (player.height - enemyST.height) * 0.5
  }
  return e
}
