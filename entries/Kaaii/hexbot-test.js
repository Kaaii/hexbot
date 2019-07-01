let canvas;
let ctx;
let appWidth;
let appHeight;

let columns;
let rows;

let offsetX;
let offsetY;

// called by NOOPBOT on window.onload

function start_app() {

  // size canvas to window
  sizeCanvas();

  //set up a ticker to refresh page automatically.
  let speed = 350; // how often screen refreshes, in milliseconds.
  let ticker = NOOPBOT_TICK_SETUP(draw, speed);

  //fire a draw event.
  draw();

  //redraw when canvas is clicked.
  canvas.addEventListener('click', draw);
}

function sizeCanvas() {
  appWidth = window.innerWidth;
  appHeight = window.innerHeight;
  canvas = document.getElementById('canvas');
  ctx = NOOPBOT_SETUP_CANVAS( { canvas: canvas, bgColor:'#ffffff' });

  columns = Math.floor(appWidth*0.8)/20;
  rows = Math.floor(1000/columns*0.8);

  offsetX = (appWidth - (columns*20))/2;
  offsetY = (appHeight - (rows*20))/2;
}

function draw() {
  //get the data!
  NOOPBOT_FETCH({
    API: 'hexbot',
    count: 1000
  }, drawSet);
}

function drawSet(responseJson) {
  let { colors } = responseJson;
  colors.forEach(function(color, count) {
    drawPoint(ctx, color, count);
  });
}

function drawPoint(ctx, color, count) {

  let row = Math.ceil(count/columns);
  let column = count%columns;

  let lineSize = NOOPBOT_RANDOM(1,5);
  ctx.beginPath();
  ctx.lineWidth = lineSize;
  ctx.strokeStyle = color.value;
  ctx.rect((column*20) + offsetX, (row*20) + offsetY, 10,10);
  ctx.stroke();

}
// listen if browser changes size.
window.onresize = function(event){
  sizeCanvas();
  draw();
};
