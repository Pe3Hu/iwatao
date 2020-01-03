//
class occurrence{
  constructor( index, type, kind, center, a ){
    this.const = {
      index: index,
      a: a
    };
    this.var = {
      center: center.copy(),
      quality:null,
      wealth: null,
      status: null,
      color: null,
      type: type,
      kind: kind
    };
    this.array = {
    };

    this.init();
  }

  init(){
    this.updateType( this.var.type );
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


  //
  setStatus( status ){
    switch ( status ) {
      case 0:
        this.status = '';
        break;
      case 1:
        this.status = '';
        break;
      case 2:
        this.status = '';
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
