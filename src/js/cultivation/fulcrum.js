//
class fulcrum{
  constructor( index, center ){
    this.const = {
      index: index
    };
    this.var = {
      available: false,
      woSupport: null,
      woCouple: null,
      center: center,
      color: 'red'
    };

    this.init();
  }

  init(){
  }

  setStatus( status ){
    switch ( status ) {
      //show unavailable
      case 0:
        this.var.available = false;
        this.var.woCouple = false;
        this.var.woSupport = false;
        this.var.color = color( 'red' );
        break;
      //show basic
      case 1:
        this.var.available = null;
        this.var.woCouple = null;
        this.var.woSupport = null;
        this.var.color = color( 'yellow' );
        break;
      //show all access
      case 2:
        this.var.available = true;
        this.var.woCouple = false;
        this.var.woSupport = true;
        this.var.color = color( 'green' );
        break;
      //show pair search
      case 3:
        this.var.available = true;
        this.var.woCouple = true;
        this.var.woSupport = false;
        this.var.color = color( 'pink' );
        break;
      //show lack of support
      case 4:
        this.var.available = true;
        this.var.woCouple = true;
        this.var.woSupport = true;
        this.var.color = color( 'purple' );
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
