//
class afflatus{
  constructor( index, base, ratio, turn, clockwise, n, a ){
    this.const = {
      index: index,
      n: n,
      a: a
    };
    this.var = {
      clockwise: clockwise,
      big: base * ratio * a,
      fulcrum: null,
      ratio: ratio,
      small: base * a,
      turn: turn
    };
    this.array = {
      vertex: []
    };

    this.init();
  }

  init(){
    this.initVertexs();
  }

  initVertexs(){
    let vecA = createVector( 0, 0 );
    let vecB = createVector( 0, 0 );
    let vecC = createVector( 0, 0 );

    switch ( this.var.turn ) {
      case 0:
        if( this.var.clockwise ){
          vecB.y -= this.var.big;
          vecC.x += this.var.small;
        }
        else{
          vecB.y -= this.var.small;
          vecC.x += this.var.big;
        }
        break;
      case 1:
        if( this.var.clockwise ){
          vecB.x += this.var.big;
          vecC.y += this.var.small;
        }
        else{
          vecB.x += this.var.small;
          vecC.y += this.var.big;
        }
        break;
      case 2:
        if( this.var.clockwise ){
          vecB.y += this.var.big;
          vecC.x -= this.var.small;
        }
        else{
          vecB.y += this.var.small;
          vecC.x -= this.var.big;
        }
        break;
      case 3:
        if( this.var.clockwise ){
          vecB.x -= this.var.big;
          vecC.y -= this.var.small;
        }
        else{
          vecB.x -= this.var.small;
          vecC.y -= this.var.big;
        }
        break;
    };

    this.array.vertex = [ vecA, vecB, vecC ];
  }

  setStatus( status, fulcrum ){
    switch ( status ) {
      //dont show
      case 0:
        this.var.status = 'await';
        this.var.fulcrum = null;
        break;
      //show as showcase
      case 1:
        this.var.status = 'showcase';
        this.var.fulcrum = fulcrum;
        break;
      //show as part of the foundation
      case 2:
        this.var.status = 'selected';
        this.var.fulcrum = fulcrum;
        break;
    }
  }

  alignСenterOfGravity(){
    if( this.var.turn == 1 || this.var.turn == 2 ){
      if( this.var.turn == 1 )
         this.var.turn = 0;
      if( this.var.turn == 2 )
          this.var.turn = 3;
      this.initVertexs();
    }
  }

  convertIndex( index ){
    if( index == undefined )
      return null;

    let y = Math.floor( index / this.const.n );
    let x = index % this.const.n;
    return createVector( x, y );
  }

  balanceOffset(){
    let balance = createVector();
    switch ( this.var.turn ) {
      case 0:
        break;
      case 1:
        balance.y -= this.array.vertex[2].y;
        break;
      case 2:
        balance.x -= this.array.vertex[2].x;
        balance.y -= this.array.vertex[1].y;
        break;
      case 3:
        balance.x -= this.array.vertex[1].x;
        break;
    };

    return balance;
  }

  draw( offset, array ){
    if( this.var.fulcrum != null ){
      let grid = this.convertIndex( this.var.fulcrum );
      let fulcrum = array[grid.y][grid.x].var.center.copy();
      if( this.var.status == 'showcase' ){
        let balance = this.balanceOffset();
        fulcrum.add( balance );
      }

      triangle( offset.x + fulcrum.x + this.array.vertex[0].x, offset.y + fulcrum.y + this.array.vertex[0].y,
                offset.x + fulcrum.x + this.array.vertex[1].x, offset.y + fulcrum.y + this.array.vertex[1].y,
                offset.x + fulcrum.x + this.array.vertex[2].x, offset.y + fulcrum.y + this.array.vertex[2].y );
    }
  }
}
