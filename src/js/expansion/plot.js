//the basic element of land
class plot {
  constructor ( index, center, grid, a ){
    this.const = {
      index: index,
      i: grid.y,
      j: grid.x,
      n: 6,
      a: a
    };
    this.array = {
      vertex: [],
      dot: []
    };
    this.var = {
      lightness: colorMax * 0.75,
      center: center.copy(),
      status: 'empty',
      saturation: 0,
      clockwise: null,
      enclave: null,
      incline: null,
      type: null,
      free: true,
      hue: 0
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

  setType( type, incline, clockwise ){
    this.array.dot = [];
    let add = [];
    let center = null;
    this.var.type = type;
    this.var.incline = incline;
    this.var.clockwise = clockwise;
    this.var.l = type / 2;;

    for( let i = 0; i < this.array.vertex.length; i++ ){
      let ii = ( i + 1 ) % this.array.vertex.length;
      let vec = this.array.vertex[ii].copy();
      vec.x -= this.array.vertex[i].x;
      vec.y -= this.array.vertex[i].y;
      vec.x /= this.var.l;
      vec.y /= this.var.l;
      add.push( vec.copy() );
    }

    for( let i = 0; i < this.array.vertex.length; i++ ){
      this.array.dot.push( [] );
      center = this.array.vertex[i].copy();
      this.array.dot[i].push( center.copy() );
      for( let j = 0; j < this.var.l; j++ ){
        /*switch ( i ) {
          case 0:
            x = 2 * a / type;
            y = a / type;
            break;
          case 1:
            y = 2 * a / type;
            break;
          case 2:
            x = -2 * a / type;
            y = a / type;
            break;
          case 3:
            x = -2 * a / type;
            y = -a / type;
            break;
          case 4:
            y = -2 * a / type;
            break;
          case 5:
            x = 2 * a / type;
            y = -a / type;
            break;
        }*/
        center.add( add[i] );
        this.array.dot[i].push( center.copy() );
      }
    }
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
      if( this.var.l != null ){
        let type = Math.ceil( this.var.l / 2 );
        let parity = ( this.var.type % 3 );
        if( parity == 0 )
          parity = this.var.type / 6;
        else
          parity = 0;
        console.log( parity, type )
        for( let i = 0; i < type; i++ ){
          switch ( this.var.incline ) {
            case 0:
              triangle( this.array.dot[5][i * 2].x, this.array.dot[5][i * 2].y,
                        this.array.dot[5][i * 2 + 1].x, this.array.dot[5][i * 2 + 1].y,
                        this.array.dot[3][type - i * 2].x, this.array.dot[3][type - i * 2].y );
              triangle( this.array.dot[5][i * 2].x, this.array.dot[5][i * 2].y,
                        this.array.dot[3][type - i * 2 + 1].x, this.array.dot[3][type - i * 2 + 1].y,
                        this.array.dot[3][type - i * 2].x, this.array.dot[3][type - i * 2].y );

              if( i + 1 <= type && parity == 0 ){
                triangle( this.array.dot[0][i * 2 + parity].x, this.array.dot[0][i * 2 + parity].y,
                          this.array.dot[0][i * 2 + 1 + parity].x, this.array.dot[0][i * 2 + 1 + parity].y,
                          this.array.dot[2][type - i * 2 - parity].x, this.array.dot[2][type - i * 2 - parity].y );
                triangle( this.array.dot[0][i * 2 + parity].x, this.array.dot[0][i * 2 + parity].y,
                          this.array.dot[2][type - i * 2 - parity + 1].x, this.array.dot[2][type - i * 2 - parity + 1].y,
                          this.array.dot[2][type - i * 2 - parity].x, this.array.dot[2][type - i * 2 - parity].y );
              }
              break;
          };
        }
      }

     stroke( 0 );
     fill( 0 );
     this.var.txt = this.const.index;
     //text( this.var.txt, this.var.center.x, this.var.center.y + fontSize / 3 );
  }
}
