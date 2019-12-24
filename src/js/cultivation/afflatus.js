//piece
class afflatus{
  constructor( index, type, base, ratio, turn, clockwise, n, a ){
    this.const = {
      index: index,
      type: type,
      n: n,
      a: a
    };
    this.var = {
      big: base * ratio * a,
      clockwise: clockwise,
      small: base * a,
      fulcrum: null,
      height: null,
      ratio: ratio,
      width: null,
      color: null,
      base: base,
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
    switch ( this.const.type ) {
      case 3:
        this.initTriangle();
        break;
      case 4:
        this.initQuadrangle();
        break;
    }
  }

  initTriangle(){
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

    switch ( this.var.turn ) {
      case 0:
        if( this.var.clockwise )
          this.var.height = this.var.big / this.const.a;
        else
          this.var.height = this.var.small / this.const.a;
        break;
      case 1:
        if( this.var.clockwise )
          this.var.height = this.var.small / this.const.a;
        else
          this.var.height = this.var.big / this.const.a;
        break;
      case 2:
        if( this.var.clockwise )
          this.var.height = this.var.big / this.const.a;
        else
          this.var.height = this.var.small / this.const.a;
       break;
       case 3:
         if( this.var.clockwise )
           this.var.height = this.var.small / this.const.a;
         else
           this.var.height = this.var.big / this.const.a;
         break;
    };

    switch ( this.var.turn ) {
      case 0:
        if( this.var.clockwise )
          this.var.width = this.var.small / this.const.a;
        else
          this.var.width = this.var.big / this.const.a;
        break;
      case 1:
        if( this.var.clockwise )
          this.var.width = this.var.big / this.const.a;
        else
          this.var.width = this.var.small / this.const.a;
        break;
      case 2:
        if( this.var.clockwise )
          this.var.width = -this.var.small / this.const.a;
        else
          this.var.width = -this.var.big / this.const.a;
        break;
      case 3:
        if( this.var.clockwise )
          this.var.width = -this.var.big / this.const.a;
        else
          this.var.width = -this.var.small / this.const.a;
        break;
    };
  }

  initQuadrangle(){
    let vecA = createVector( 0, 0 );
    let vecB = createVector( 0, 0 );
    let vecC = createVector( 0, 0 );
    let vecD = createVector( 0, 0 );

    //equalization
    if( this.var.turn > 1 )
      this.var.turn = 3;
    else
      this.var.turn = 0;

    switch ( this.var.turn ) {
      case 0:
        if( this.var.clockwise ){
          vecB.y -= this.var.big;
          vecC.y -= this.var.big;
          vecC.x += this.var.small;
          vecD.x += this.var.small;
        }
        else{
          vecB.y -= this.var.small;
          vecC.y -= this.var.small;
          vecC.x += this.var.big;
          vecD.x += this.var.big;
        }
        break;
      case 3:
        if( this.var.clockwise ){
          vecB.x -= this.var.big;
          vecC.x -= this.var.big;
          vecC.y -= this.var.small;
          vecD.y -= this.var.small;
        }
        else{
          vecB.x -= this.var.small;
          vecC.x -= this.var.small;
          vecC.y -= this.var.big;
          vecD.y -= this.var.big;
        }
        break;
    };

    this.array.vertex = [ vecA, vecB, vecC, vecD ];

    switch ( this.var.turn ) {
      case 0:
        if( this.var.clockwise )
          this.var.height = this.var.big / this.const.a;
        else
          this.var.height = this.var.small / this.const.a;
        break;
       case 3:
         if( this.var.clockwise )
           this.var.height = this.var.small / this.const.a;
         else
           this.var.height = this.var.big / this.const.a;
         break;
    };

    switch ( this.var.turn ) {
      case 0:
        if( this.var.clockwise )
          this.var.width = this.var.small / this.const.a;
        else
          this.var.width = this.var.big / this.const.a;
        break;
      case 3:
        if( this.var.clockwise )
          this.var.width = -this.var.big / this.const.a;
        else
          this.var.width = -this.var.small / this.const.a;
        break;
    };
  }

  setStatus( status, fulcrum ){
    switch ( status ) {
      //dont show
      case 0:
        this.var.status = 'await';
        this.var.fulcrum = null;
        this.var.color = color( 'red' );
        break;
      //show as showcase
      case 1:
        this.var.status = 'showcase';
        this.var.fulcrum = fulcrum;
        this.var.color = color( 'green' );
        break;
      //show as part of the foundation
      case 2:
        this.var.status = 'selected';
        this.var.fulcrum = fulcrum;
        let h = Math.random() * colorMax;
        let s = Math.random() * colorMax;
        let l = ( 0.7 - Math.random() * 0.2 ) * colorMax;
        this.var.color = color( h, s, l );
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

  rotate( clockwise ){
    let turns = 4;
    switch ( clockwise ) {
      case true:
        this.var.turn = ( this.var.turn + 1 ) % turns;
        break;
      case false:
        this.var.turn = ( this.var.turn + turns - 1 ) % turns;
        break;
    };
    this.initVertexs();
  }

  balanceOffset(){
    let balance = createVector();
    switch ( this.const.type ) {
      case 3:
        switch ( this.var.turn ) {
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
        break;
      case 4:
        switch ( this.var.turn ) {
          case 3:
            balance.x -= this.array.vertex[2].x;
            balance.y -= this.array.vertex[2].y;
            break;
        };
        break;
    }


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
      stroke( this.var.color );
      fill( this.var.color );
      switch ( this.const.type ) {
        case 3:
          triangle( offset.x + fulcrum.x + this.array.vertex[0].x, offset.y + fulcrum.y + this.array.vertex[0].y,
                    offset.x + fulcrum.x + this.array.vertex[1].x, offset.y + fulcrum.y + this.array.vertex[1].y,
                    offset.x + fulcrum.x + this.array.vertex[2].x, offset.y + fulcrum.y + this.array.vertex[2].y );
          break;
        case 4:
          triangle( offset.x + fulcrum.x + this.array.vertex[0].x, offset.y + fulcrum.y + this.array.vertex[0].y,
                    offset.x + fulcrum.x + this.array.vertex[1].x, offset.y + fulcrum.y + this.array.vertex[1].y,
                    offset.x + fulcrum.x + this.array.vertex[2].x, offset.y + fulcrum.y + this.array.vertex[2].y );
          triangle( offset.x + fulcrum.x + this.array.vertex[0].x, offset.y + fulcrum.y + this.array.vertex[0].y,
                    offset.x + fulcrum.x + this.array.vertex[3].x, offset.y + fulcrum.y + this.array.vertex[3].y,
                    offset.x + fulcrum.x + this.array.vertex[2].x, offset.y + fulcrum.y + this.array.vertex[2].y );
          break;
      }
    }
  }
}
