let cellSize = 24;
let daoNum = 9;
let colorMax = 360;
let infinity = 999999999;
let font;
let fontSize = 18;
let canvasSize;
let interfaceBoundaries;
let gameBoard;
let offset;

function preload() {
  font = loadFont('src/fonts/Chunkfive.otf');
}

function setup() {
  canvasSize = createVector( 800, 600 );
  createCanvas( canvasSize.x, canvasSize.y );

  textFont( font );
  textSize( fontSize );
  textAlign( CENTER );

  colorMode( HSL, colorMax );

  offset = createVector( cellSize * 3, cellSize * 3 );

  gameBoard = new board( offset );
}

function draw() {
  background( 240 );
  gameBoard.draw();
}

function mouseClicked() {
  gameBoard.click();
}
