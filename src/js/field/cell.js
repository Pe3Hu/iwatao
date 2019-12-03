//the basic element of field
class cell {
  constructor ( index, center, grid ){
    this.const = {
      index: index,
      n: 6,
      a: cellSize,
      i: grid.y,
      j: grid.x
    };
    this.const.r =  this.const.a / ( Math.tan( Math.PI / 6 ) * 2 );
    this.array = {
      vertex: []
    };
    this.var = {
      center: center.copy(),
      status: 'empty',
      target: null,
      meeple: null,
      free: true,
      wave: null,
      txt: null
    }

    this.init();
  }

  initVertexs(){
    for( let i = 0; i < this.const.n; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / this.const.n * ( - i + this.const.n / 2 ) ) * this.const.a,
        Math.cos( Math.PI * 2 / this.const.n * ( - i + this.const.n / 2 ) ) * this.const.a );
      vec.add( this.var.center );
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
        this.var.status = 'empty';
        this.var.free = true;
        this.var.wave = null;
        this.var.meeple = null;
        break;
      //show occupied cell
      case 1:
        this.var.status = 'taken';
        this.var.free = false;
        break;
      //show temporarily cell
      case 2:
        this.var.status = 'move';
        this.var.free = false;
        break;
      //show rotation cell
      case 3:
        this.var.status = 'rotate';
        this.var.free = false;
        break;
      //show attacking cell
      case 4:
        this.var.status = 'attack';
        this.var.free = false;
        break;
    }
  }

  setMeeple( meeple ){
    this.var.meeple = meeple;
    this.var.free = false;
    if( meeple = null )
      this.setStatus( 0 );
  }

  draw(){
    noStroke();
    switch ( this.var.status ) {
      case 'empty':
        fill( 120, colorMax * 0.8, colorMax * 0.5 );
        break;
      case 'taken':
        fill( colorMax * 0.8 );
        break;
      case 'move':
        fill( 60, colorMax * 0.8, colorMax * 0.5 );
        break;
      case 'rotate':
        fill( 200, colorMax * 0.8, colorMax * 0.5 );
        break;
      case 'attack':
        fill( 0, colorMax * 0.8, colorMax * 0.5 );
        break;
    }

    for( let i = 0; i < this.array.vertex.length; i++ ){
      let ii = ( i + 1 ) % this.array.vertex.length;
      triangle( this.var.center.x, this.var.center.y,
                this.array.vertex[i].x, this.array.vertex[i].y,
                this.array.vertex[ii].x, this.array.vertex[ii].y );
     }

     stroke( 0 );
     fill( 0 );
     this.var.txt = this.const.index;
     if( this.var.wave != null )
      this.var.txt += '_' + this.var.wave;
     text( this.var.txt, this.var.center.x, this.var.center.y + fontSize / 3 );

     /*fill( colorMax );
     stroke( colorMax );
     if( this.var.free )
       ellipse( this.var.center.x + 3, this.var.center.y, 5, 5 );*/

  }
}
