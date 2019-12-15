//
class afflatus{
  constructor( index, base, ratio, turn, clockwise, n ){
    this.const = {
      index: index,
      n: n
    };
    this.var = {
      small: base,
      big: base * ratio,
      ratio: ratio,
      turn: turn,
      clockwise: clockwise,
      fulcrum: null
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
    this.array.vertex = [
      createVector( 0, 0 ),
      createVector( 0, -this.var.big ),
      createVector( this.var.small, 0 )
    ];
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

  convertIndex( index ){
    if( index == undefined )
      return null;
    let y = Math.floor( index / this.const.n );
    let x = index % this.constn;
    return createVector( x, y );
  }

  draw( offset, array ){
    if( this.var.fulcrum != null ){
      let grid = this.convertIndex( this.var.fulcrum );
      let fulcrum = array[grid.y][grid.x].var.center;
      triangle( offset.x + fulcrum.x + this.array.vertex[0].x, offset.y + fulcrum.y + this.array.vertex[0].y,
                offset.x + fulcrum.x + this.array.vertex[1].x, offset.y + fulcrum.y + this.array.vertex[1].y,
                offset.x + fulcrum.x + this.array.vertex[2].x, offset.y + fulcrum.y + this.array.vertex[2].y );
    }
  }
}
