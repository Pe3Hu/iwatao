//the basic element of field
class cell {
  constructor ( index, center ){
    this.index =  index;
    this.center = center;
    this.const = {
      n: 6,
      a: cellSize
    };
    this.const.r = cellSize / ( Math.sin( Math.PI / 6 ) * 2 );
    this.const.R = cellSize / ( Math.tan( Math.PI / 6 ) * 2 );
    this.color = null;
    this.status = 'forgotten'; //forgotten proposed selected
    this.array = {
      vertex: []
    };
    this.orientation = 0;

    this.init();
  }

  initVertexs(){
    for( let i = 0; i < this.const.n; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / this.const.n * ( - i + this.const.n / 2 ) ) * this.const.r,
        Math.cos( Math.PI * 2 / this.const.n * ( - i + this.const.n / 2 ) ) * this.const.r );
      vec.add( this.center );
      this.array.vertex.push( vec );
    }
  }

  init(){
    this.initVertexs();
  }

  //determine the display method
  setStatus( stat ){
    switch ( stat ) {
      //do not show
      case 0:
        this.status = 'forgotten';
        break;
      //show as an option
      case 1:
        this.status = 'proposed';
        break;
      //show as result
      case 2:
        this.status = 'selected';
        break;
    }
  }

  draw(){
    noStroke();
    fill( 'yellow' );
    ellipse( this.center.x, this.center.y, this.const.a, this.const.a );

    stroke( 0 );
    for( let i = 0; i < this.array.vertex.length; i++ ){
      let nextI = ( i + 1 ) % this.array.vertex.length;
      line( this.array.vertex[i].x, this.array.vertex[i].y,
        this.array.vertex[nextI].x, this.array.vertex[nextI].y
      );
     }
  }
}
