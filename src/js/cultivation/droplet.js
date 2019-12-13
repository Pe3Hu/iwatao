//
class droplet{
  constructor( index, a, center ){
    this.const = {
      index: index,
      a: a,
      color: colorMax / 3
    };
    this.var = {
      center: center,
      status: 'empty',
      free: true
    };

    this.array = {
      fulcrum: []
    };

    this.init();
  }

  init(){
    this.initFulcrums();
  }

  initFulcrums(){
    this.array.fulcrum = [
      createVector( this.var.center.x - this.const.a / 2, this.var.center.y + this.const.a / 2 ),
      createVector( this.var.center.x + this.const.a / 2, this.var.center.y + this.const.a / 2 )
    ]
  }

  setStatus( status ){
    switch ( status ) {
      //show free
      case 0:
        this.var.status = 'empty';
        this.var.free = true;
        break;
      //show selected
      case 1:
        this.var.status = 'filled';
        this.var.free = false;
        break;
    }
  }

  //drawing droplet
  draw( offset ){
    stroke( 0 );
    switch ( this.var.status ) {
      case 'empty':
        noFill();
          rect(
            offset.x + this.var.center.x - this.const.a/ 2,
            offset.y + this.var.center.y - this.const.a / 2,
            this.const.a, this.const.a );
        break;
      case 'selected':
        fill( this.const.color );
        rect(
          offset.x + this.var.center.x - this.const.a / 2,
          offset.y + this.var.center.y - this.const.a / 2,
          this.const.a, this.const.a );
        break;
    }
  }
}
