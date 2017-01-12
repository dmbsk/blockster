
function update(){

}

var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;
var speed = 5
var MainDifficulty = 5
var difficultyFilter = Math.floor( 180 / tile.tilesX)
var respawnEnemy = -1
var enemyNumber = 0
var firstEnemy = true
var deleter = 0
var difficulty = []
var timeStart = 0
var timeEnd = 0
var spawnDelay = player.width*speed
function draw(){
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  var thisFrameTime = (thisLoop=new Date) - lastLoop;
  frameTime+= (thisFrameTime - frameTime) / filterStrength;
  lastLoop = thisLoop;

  //Debug info

  ctx.fillStyle = "white"
  ctx.fillText((1000/frameTime).toFixed(1) + " fps", 12, 20)
  for(var j = 0; j < tile.tilesY; j++){
    var start = difficultyFilter * j
    var end = difficultyFilter * (j + 1)
    var avg = calculateAvg( start, end, true)
    if(avg > difficulty[j] && timeEnd - timeStart >= spawnDelay){
      enemyBlock[enemyNumber] = createEnemy(j, enemyNumber)
      j++
      enemyNumber++
      firstEnemy = false
      timeStart = Date.now()
    }
    if( j > tile.tilesY - 1){
      j = 0
    }
  }
  timeEnd = Date.now()
  for(var i = deleter; i < enemyBlock.length; i++){
    //posCreator++
    //draw enemy
    ctx.fillStyle = enemyST.color
    ctx.fillRect(enemyBlock[i].x, enemyBlock[i].y, enemyST.width, enemyST.height)
    enemyBlock[i].x += speed
    if( enemyBlock[i].x >= player.x &&
        enemyBlock[i].x + enemyST.width <= player.x + player.width &&
        enemyBlock[i].y >= player.y &&
        enemyBlock[i].y + enemyST.height <= player.y + player.height
      ){
      location.reload()
      //points = 0
      //player.x
      //triggerDraw()
    }
    if(enemyBlock[i].x > canvasWidth + enemyST.width * 1.1) {
      deleter = enemyBlock[i].id + 1
    }
  }
}
function createEnemy(i, id){
  var e
  e = new enemy()
  e.name += i
  e.id = id
  e.y = centerY - (tile.height * tile.tilesY) * 0.5 + i * tile.height + (tile.height - enemyST.height) * 0.5
  return e
}
function collision(a, b){

}