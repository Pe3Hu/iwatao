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
      enclave: null,
      free: true,
      hue: 0,
      saturation: 0,
      lightness: colorMax * 0.75
    };

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

  setStatus( status, enclave, hue ){
    switch ( status ) {
      //show free
      case 0:
        this.var.status = 'empty';
        this.var.enclave = null;
        this.var.free = true;
        this.var.hue = 0;
        this.var.saturation = 0;
        this.var.lightness = colorMax * 0.75;
        break;
      //show capital
      case 1:
        this.var.status = 'capital';
        this.var.enclave = enclave;
        this.var.free = false;
        this.var.hue = hue;
        this.var.saturation = colorMax;
        this.var.lightness = colorMax * 0.45;
        break;
      //show domain
      case 2:
        this.var.status = 'domain';
        this.var.enclave = enclave;
        this.var.free = false;
        this.var.hue = ( hue + 18 + colorMax ) % colorMax;
        this.var.saturation = colorMax;
        this.var.lightness = colorMax * 0.55;
        break;

    }
  }

  setColor( h, s, l ){
    this.var.hue = h;
    this.var.saturation = s;
    this.var.lightness = l;
  }

  draw( gap ){
    noStroke();
    fill( this.var.hue, this.var.saturation, this.var.lightness );

    /*
    let flag = false;
    for( let i = 0; i < gap.length; i++ )
      if( gap[i] == this.const.index )
        flag = true;

    if( flag )
      fill( 350 );
    */

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
