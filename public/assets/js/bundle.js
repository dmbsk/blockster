//setting
var player = {
  width: 20,
  height: 20,
  color: "#0000FF", // blue
  x: 0,
  y: 0,
}

var points = 0
var point = {
  width: player.width ,
  height: player.height ,
  color: "#FFFF00", // red
  x: 0,
  y: 0,
}

var tile = {
  width: player.width + 10,
  height: player.height + 10,
  x: 0,
  y: 0,
  tilesX: 11,
  tilesY: 11,
  color: "#414141",
}

var enemyST = {
  width: player.width - (tile.width - player.width) * 0.5,
  height: player.height - (tile.height - player.height) * 0.5,
  color: "#FF0000", // red
  x: 0,
  y: 0,
}
//enemyST.x = (enemyST.width * -2)

function enemy(){
  this.name = "enemy-"
  this.width = enemyST.width
  this.height = enemyST.height
  this.x = enemyST.x
  this.y = enemyST.y
}

var moveH = {
  x: 0,
  y: 0,
  keyup: true
}


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
/**
 * Created by towek on 1/6/2017.
 */
function triggerDraw(){
  trigger.clearRect(0, 0, canvasWidth, canvasHeight);

  //player
  trigger.fillStyle= player.color
  trigger.fillRect(player.x, player.y, player.width, player.height)

  //point
  trigger.fillStyle= point.color
  trigger.fillRect(point.x, point.y, point.width, point.height)
  trigger.fillStyle = point.color
  var pointsTxt = points + " points"
  trigger.font = "50px Arial"
  trigger.fillText(pointsTxt, centerX - trigger.measureText(pointsTxt).width * 0.5, 60)

  //debug
  trigger.font = "15px Arial"
  trigger.fillStyle = player.color
  trigger.fillText("Player pos: " + player.x + " x " + player.y, 12, 40)
  trigger.fillStyle = point.color
  trigger.fillText("Point pos: " + point.x + " x " + point.y, 12, 60)
}

function pointPicker(a, b){
  if(a.x == b.x && a.y == b.y){
    var randomPos = RandomPos()
    point.x = randomPos.x
    point.y = randomPos.y
    console.log("Coin picked")
    if(points == 0){
      speed = 5
      spawnDelay = player.width*speed
    }else{
      speed += 0.5
      spawnDelay -= 5
    }
    points++


    return true
  }
  return false
}
/**
 * Created by towek on 1/6/2017.
 */
var enemyBlock = []
function drawOnce(){
  //Map
  prerender.fillStyle = tile.color
  prerender.fillRect(tile.x, tile.y, tile.width * tile.tilesX, tile.height * tile.tilesY)
  //Map grid
  generateMap()
  for(var i = 0; i < tile.tilesY; i++){
    difficulty[i] = 255 -  (i + 1) * 23
    console.log(difficulty[i])
  }
}


function generateMap(){
  for(var y = 0; y < tile.tilesX; y++){
    for(var x = 0; x < tile.tilesY; x++){
      prerender.rect(centerX - x * tile.width + centerMap, centerY - y * tile.height + centerMap, tile.width, tile.height)
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

/**
 * Created by towek on 1/8/2017.
 */
var frequencyData
var audio
var track_id = ""
var client_id = '3094f9bd10f26938c4aff27c56fe7b97'
var input
var track_url
var radiusGlobal
var currentTime = 0
var canvas
var volumeFix = 1

function soundcloud() {
  track_url = "https://soundcloud.com/iglooghost/ell-ft-rocks-foe"
  input = document.getElementById("input")
  input.value = track_url

  //var divsAmount = 200
  audio = document.getElementById("audio")
  audio.crossOrigin = "anonymous"

  //generateDivs(divsAmount)
  SCmain()

  //audio.src = "https://soundcloud.com/alltrapnation/jinco-clocktower-feat-mia-vaile/stream/?client_id=3094f9bd10f26938c4aff27c56fe7b97"
  audio.play()
  var context = new window.AudioContext()
  var analyser = context.createAnalyser()
  var source = context.createMediaElementSource(audio)

  source.connect(analyser)
  analyser.connect(context.destination)


  //console.log(analyser.getByteFrequencyData(frequencyData))
  //console.log(analyser.frequencyBinCount)

  function renderFrame () {
    requestAnimationFrame(renderFrame)
    frequencyData = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(frequencyData)
    radiusGlobal = calculateAvg(0, 200)
    //volumeFix = audio.volume != 0.001 ? 1/audio.volume : audio.pause()
  }
  audio.play()
  renderFrame()
}


function calculateAvg (start, end, filter){
  var sum = 0
  var amount = 0;
  for (var i = start; i < end; i++) {
    if(frequencyData[i] != 0 || filter){
      sum += frequencyData[i]
      amount++
    }else{
      sum += frequencyData[i]
      amount++
    }
  }
  var avg = sum / amount
  if(isNaN(avg)) avg = 0
  return avg
}

function generateDivs(amount){
  var divs = ""
  var size = 100/amount;
  for(var i = 0; i < amount; i++){
    divs += "<div class='ch' style='left:"+size*i+"%; width:"+size+"%'></div>"
  }
  //document.getElementById("vi").innerHTML = divs;
}

function getTrack(){
  SC.get(track_id).then(function (track){
    audio.src = track.stream_url + "/?client_id=" + client_id;
  });
}

function changeLink(){
  audio.pause()
  track_url = input.value
  SCmain()
}

function SCmain(){
  SC.initialize({
    client_id: client_id
  });
  SC.resolve(track_url).then(function (res){
    track_id = "tracks/"+res.id
  }).then(function (){
    getTrack()
  });
  audio.play()
}

var canvasWidth = window.innerWidth
var canvasHeight = window.innerHeight
var centerX = canvasWidth / 2
var centerY = canvasHeight / 2
var FPS = 60
var ctx = ""
var canvas = ""
var once
var prerender
var pointPos = new Object()
var ontrigger
var trigger
var canvasDiv

player.x = centerX - player.height / 2
player.y = centerY - player.width / 2
window.onload = function () {
  canvasDiv = document.getElementById("canvas")
  canvas = document.getElementsByClassName("ctx")[0]
  once = document.getElementsByClassName("ctx")[1]
  ontrigger = document.getElementsByClassName("ctx")[2]
  ctx = canvas.getContext("2d")
  prerender = once.getContext("2d")
  trigger = ontrigger.getContext("2d")
  canvas.width = once.width = ontrigger.width = canvasWidth
  canvas.height = once.height = ontrigger.height = canvasHeight
  canvasDiv.style.width = canvasWidth + "px"
  canvasDiv.style.height = canvasHeight + "px"

  //setting vars
  pointPos = RandomPos()
  point.x = pointPos.x
  point.y = pointPos.y

  tile.x = centerX - (tile.width * tile.tilesX) * 0.5
  tile.y = centerY - (tile.height * tile.tilesY) * 0.5

  enemy.y = centerY - enemy.height/2

  //init main functions
  move()
  soundcloud()
  // Game loop
  setInterval(function(){
    update()
    draw()
    if(!moveH.keyup || pointPicker(player, point)){
      triggerDraw()
    }
  }, 1000/FPS)
  if(!moveH.keyup || pointPicker(player, point)){
    triggerDraw()
  }
  drawOnce()
  triggerDraw()
}

/// Other functions
//move
//var posFixer = tile.width * 1.5 - (tile.width - player.width) * 0.125
var moveBlocker = {
  up: centerY - tile.height * Math.floor(tile.tilesY * 0.5) - player.height * 0.5,
  right: centerX + tile.width * Math.floor(tile.tilesX * 0.5) - player.width * 0.5,
  down: centerY + tile.height * Math.floor(tile.tilesY * 0.5) - player.height * 0.5,
  left: centerX - tile.width * Math.floor(tile.tilesX * 0.5) - player.width * 0.5
}

function move(){
  window.addEventListener("keydown", function (e) {
    if(moveH.keyup){
      var code = e.keyCode

      if (code == 38 && player.y > moveBlocker.up) { // up
        moveH.y--
      }

      if (code == 40 && player.y < moveBlocker.down) { // down
        moveH.y++
      }

      if (code == 37 && player.x > moveBlocker.left) { // left
        moveH.x--
      }

      if (code == 39 && player.x < moveBlocker.right) { // right
        moveH.x++
      }
      player.x += moveH.x * tile.width
      player.y += moveH.y * tile.height
      moveH.keyup = false
    }
  })

  window.addEventListener("keyup", function (e){
    moveH.x = 0
    moveH.y = 0
    moveH.keyup = true
  })
}
centerMap = (tile.tilesX * tile.width) * 0.5 - tile.width
function RandomPos(){
  var randomX = Math.floor((Math.random() * tile.tilesX))
  var randomY = Math.floor((Math.random() * tile.tilesY))
  var x = centerX - centerMap + ( tile.width - point.width ) * 0.5 + randomX * tile.width - tile.width
  var y = centerY - centerMap + ( tile.height - point.height ) * 0.5 + randomY * tile.height - tile.height
  return {
    x: x,
    y: y
  }
}