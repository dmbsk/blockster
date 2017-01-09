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