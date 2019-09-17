//the basic element of which consists module
class hull {
  constructor ( index, core ){
    this.index  = index;
    this.array = {
      module: [],
      block: []
    }
    this.color = color( 300 );
  }


  //drawing block
  draw( offset ){
    fill( this.color );
    stroke( 1 );
    rect(
      offset.x + this.center.x - this.size.x / 2,
      offset.y + this.center.y - this.size.y / 2,
      this.size.x, this.size.y );

  }
}
