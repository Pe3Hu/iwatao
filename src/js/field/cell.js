//the basic element of field
class cell {
  constructor ( index, center ){
    this.index =  index;
    this.center = center;
    this.status = 'empty';
    this.const = {
      n: 6,
      a: cellSize
    };
    this.const.r =  this.const.a / ( Math.tan( Math.PI / 6 ) * 2 );
    this.array = {
      vertex: []
    };
    this.var = {
      txt: null
    }

    this.init();
  }

  initVertexs(){
    for( let i = 0; i < this.const.n; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / this.const.n * ( - i + this.const.n / 2 ) ) * this.const.a,
        Math.cos( Math.PI * 2 / this.const.n * ( - i + this.const.n / 2 ) ) * this.const.a );
      vec.add( this.center );
      this.array.vertex.push( vec );
    }
  }

  init(){
    this.initVertexs();
  }

  setStatus( status ){
    switch ( status ) {
      //show free cell
      case 0:
        this.status = 'empty';
        break;
      //show occupied cell
      case 1:
        this.status = 'taken';
        break;
      //show temporarily cell
      case 2:
        this.status = 'moving';
        break;
    }
  }

  draw(){
    noStroke();
    switch ( this.status ) {
      case 'empty':
        fill( 120, colorMax, colorMax * 0.5 );
        break;
      case 'taken':
        fill( 0, colorMax, colorMax * 0.5 );
        break;
      case 'moving':
        fill( 60, colorMax, colorMax * 0.5 );
        break;
    }
    for( let i = 0; i < this.array.vertex.length; i++ ){
      let ii = ( i + 1 ) % this.array.vertex.length;
      triangle( this.center.x, this.center.y,
                this.array.vertex[i].x, this.array.vertex[i].y,
                this.array.vertex[ii].x, this.array.vertex[ii].y );
     }
     text( this.index, this.center.x, this.center.y );
  }
}
