//
class battleGround{
  constructor(){
    this.const = {
      a: cellSize
    };
    this.const.r = cellSize / ( Math.tan( Math.PI / 6 ) * 2 );
    this.vec = createVector( cellSize * 8, cellSize * 8 );

    this.cell = new cell( 0, this.vec );
    this.vec.x += this.const.r * 2;
    this.cell2 = new cell( 0, this.vec );
    this.vec.y += this.const.a * 1.5;
    this.vec.x += this.const.r;
    this.cell3 = new cell( 0, this.vec );
    console.log( this.const)
  }
  draw(){
    this.cell.draw();
    this.cell2.draw();
    this.cell3.draw();
  }
}
