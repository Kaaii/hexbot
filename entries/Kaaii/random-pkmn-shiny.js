// drop down menu selects a pokemon
// generates a random shiny version of that pokemon based on hex codes returned by Hexbot

let canvas;
let ctx;
let appWidth;
let appHeight;
let img;
let imgData;

function start_app() {
  // size canvas to window
  sizeCanvas();

  //set up a ticker to refresh page automatically.
  // let speed = 350; // how often screen refreshes, in milliseconds.
  // let ticker = NOOPBOT_TICK_SETUP(draw, speed);

  //fire a draw event.
  draw();

  //redraw when canvas is clicked.
   canvas.addEventListener('click', draw);
}

function sizeCanvas() {
  appWidth = window.innerWidth;
  appHeight = window.innerHeight;
  canvas = document.getElementById('canvas');
  img = document.getElementById('pkmn');
  ctx = NOOPBOT_SETUP_CANVAS( { canvas: canvas, bgColor:'#ffffff' });
  ctx.drawImage(img, 0, 0);
  imgData = ctx.getImageData(0,0, canvas.width, canvas.height);
}

function draw() {
  //get the data!
  NOOPBOT_FETCH({
    API: 'hexbot'
  }, drawSet);
}

function drawSet(responseJson) {
  let { colors } = responseJson;
  colors.forEach(function(color) {
    drawShiny(ctx, color);
  });
}

function drawShiny(ctx, color) {
  var i;
  for(i = 0; i < imgData.data.length; i+=4) {
    imgData.data[i] = 255 - imgData.data[i];
    imgData.data[i+1] = 255 - imgData.data[i+1];
    imgData.data[i+2] = 255 - imgData.data[i+2];
    // keep alpha
  }

  ctx.putImageData(imgData, 0, 0);

}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


// listen if browser changes size.
window.onresize = function(event){
  sizeCanvas();
  draw();
};
