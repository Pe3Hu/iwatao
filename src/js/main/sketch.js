let cellSize = 24;
let daoNum = 9;
let colorMax = 360;
let colorBG = colorMax * 2 / 3;
let colorButton = colorMax / 2;
let infinity = 999999999;
let fr = 60;
let font;
let fontSize = 12;//18
let canvasSize;
let canvasGrid;
let interfaceBoundaries;
let gameBoard;
let offset;

function preload() {
  font = loadFont('src/fonts/Chunkfive.otf');
}

function setup() {
  canvasSize = createVector( 800, 700 );//800 600
  canvasGrid = createVector( Math.floor( canvasSize.x / cellSize ), Math.floor( canvasSize.y / cellSize ) );
  createCanvas( canvasSize.x, canvasSize.y );

  textFont( font );
  textSize( fontSize );
  textAlign( CENTER );

  colorMode( HSL, colorMax );
  frameRate( fr );

  offset = createVector( cellSize * 3, cellSize * 3 );

  gameBoard = new board( offset );
}

function draw() {
  background( colorBG );
  gameBoard.draw();
}

function mouseClicked() {
  gameBoard.click();
}
