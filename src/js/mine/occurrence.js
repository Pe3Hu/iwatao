//
class occurrence{
  constructor( index, type, center, a ){
    this.const = {
      index: index,
      type: type,
      a: a
    };
    this.var = {
      center: center.copy(),
      color: null
    };
    this.array = {
    };

    this.init();
  }

  init(){
    this.updateType( this.const.type );
  }

  updateType( type ){
    switch ( type ) {
      case 0:
        this.var.color = color( 0, colorMax, colorMax * 0.5 );
        break;
      case 1:
        this.var.color = color( 120, colorMax, colorMax * 0.5 );
        break;
      case 2:
        this.var.color = color( 240, colorMax, colorMax * 0.5 );
        break;
    }
  }

  draw(){
    fill( this.var.color )
    ellipse( this.var.center.x, this.var.center.y, this.const.a, this.const.a );

    fill( 0 );
    let txt = this.const.index;
    text( txt, this.var.center.x,
               this.var.center.y + fontSize / 3 );
    noFill();
  }
}
