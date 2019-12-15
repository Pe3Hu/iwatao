//
class fulcrum{
  constructor( index, center ){
    this.const = {
      index: index
    };
    this.var = {
      center: center,
      available: false,
      color: 'red'
    };

    this.init();
  }

  init(){
  }

  setStatus( status ){
    switch ( status ) {
      //show free
      case 0:
        this.var.available = false;
        this.var.color = color( 'red' );
        break;
      //show selected
      case 1:
        this.var.available = true;
        this.var.color = color( 'yellow' );
        break;
      //show basic
      case 2:
        this.var.available = null;
        this.var.color = color( 'green' );
        break;
    }
  }

  //drawing fulcrum
  draw( offset ){
     stroke( this.var.color );

     if( this.var.available != false )
     ellipse( offset.x + this.var.center.x,
              offset.y + this.var.center.y, 10, 10 );
     /*point( offset.x + this.var.center.x,
            offset.y + this.var.center.y );*/
    }
}
