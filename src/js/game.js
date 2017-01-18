
function update(){

}

var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;
var speed = 0
var MainDifficulty = 10
var maxFrequency = 150
var difficultyFilter = Math.floor( maxFrequency / tile.tilesX)
var enemyNumber = 0
var deleter = 0
var difficulty = []
var spawnDelay = 500
var spawnDelayMain
function draw(){
  speed = calculateAvg(0, 255, true) * difficultyMedium.speed
  spawnDelayMain = difficultyMedium.spawn - calculateAvg(0, 255, true) * 0.5

  spawnDelay = (500 * tile.tilesY) - (calculateAvg(0, 255, true) * (tile.tilesY * MainDifficulty))
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  var thisFrameTime = (thisLoop=new Date) - lastLoop;
  frameTime+= (thisFrameTime - frameTime) / filterStrength;
  lastLoop = thisLoop;

  //Debug info
  ctx.font = "12px Lato"
  ctx.fillStyle = "white"
  ctx.fillText((1000/frameTime).toFixed(1) + " fps", 12, 20)

  for(var i = 0; i < tile.tilesY; i++) {
    var start = 24 + (difficultyFilter * i)
    var end = 24 + (difficultyFilter * (i + 1))
    var avg = calculateAvg(start, end, true) / i
    if (avg > difficulty[i] && timeEnd[i] - timeStart[i] >= spawnDelayMain) {
      if (audio.currentTime > 10) {
        enemyBlock[enemyNumber] = createEnemy(i, enemyNumber)
        enemyNumber++
      }
      timeStart[i] = Date.now()
    }
    if (i <= tile.tilesY - 1) { //wall destroyer
      if (timeStart[i - 1] + timeStart[i + 1] > timeStart[i] * 1.99 && timeStart[i - 1] + timeStart[i + 1] < timeStart[i] * 2) {
        timeStart[i] += 5
      }
    }

    ctx.fillStyle = "green"
    ctx.font = "12px Lato"
    ctx.fillText(Math.floor(avg) + "        from " + start + "  to  " + end, 12, centerY - (tile.height * tile.tilesY) * 0.5 + i * tile.height + (tile.height - enemyST.height) * 0.5)
    timeEnd[i] = Date.now()
  }
  ctx.font = "40px Lato"
  ctx.fillText(Math.floor(spawnDelayMain), 12, 700)

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
      //location.reload()
      points = 0
      //player.x
      triggerDraw()
    }
    if(enemyBlock[i].x > canvasWidth + enemyST.width * 1.1) {
      deleter = enemyBlock[i].id + 1
    }
  }
}
function createEnemy(i, id){
  var e
  e = new enemy()
  e.id = id
  e.y = centerY - (tile.height * tile.tilesY) * 0.5 + i * tile.height + (tile.height - enemyST.height) * 0.5
  return e
}
function collision(a, b){

}