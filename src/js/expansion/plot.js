//the basic element of land
class plot {
  constructor ( index, center, grid, a ){
    this.const = {
      index: index,
      n: 6,
      a: a,
      i: grid.y,
      j: grid.x
    };
    this.array = {
      vertex: []
    };
    this.var = {
      center: center.copy(),
      status: 'empty',
      free: true
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
    this.const.r =  this.const.a / ( Math.tan( Math.PI / 6 ) * 2 );
    this.initVertexs();
  }

  setStatus( status ){
    switch ( status ) {
      //show free
      case 0:
        this.var.status = 'empty';
        this.var.free = true;
        break;
      //show capital
      case 1:
        this.var.status = 'capital';
        this.var.free = false;
        break;
      //show domain
      case 2:
        this.var.status = 'domain';
        this.var.free = false;
        break;

    }
  }

  draw(){
    noStroke();
    switch ( this.var.status ) {
      case 'empty':
        fill( 120, colorMax * 0.8, colorMax * 0.5 );
        break;
      case 'capital':
        fill( 45, colorMax, colorMax * 0.5 );
        break;
      case 'domain':
        fill( 30, colorMax, colorMax * 0.5 );
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
     text( this.var.txt, this.var.center.x, this.var.center.y + fontSize / 3 );
  }
}
