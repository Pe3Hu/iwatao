//
class fulcrum{
  constructor( index, center ){
    this.const = {
      index: index
    };
    this.var = {
      coupleTurn: null,
      available: false,
      woSupport: null,
      woCouple: null,
      center: center,
      color: 'red',
      kind: 0
    };
    this.array = {
      eighthPart: [ 0, 1, 6, 7 ]
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
        this.array.eighthPart = [];
        /*this.var.woCouple = false;
        this.var.woSupport = false;
        this.var.color = color( 'red' );*/
        break;
      //show basic
      case 1:
        this.var.available = null;
        this.array.eighthPart = [];
        /*this.var.woCouple = null;
        this.var.woSupport = null;
        this.var.color = color( 'yellow' );*/
        break;
      //show all access
      case 2:
        this.var.available = true;
        this.array.eighthPart = [ 0, 1, 6, 7 ];
        /*this.var.woCouple = false;
        this.var.woSupport = true;
        this.var.color = color( 'green' );*/
        break;
      //show pair search
      case 3:
        this.var.available = true;
        /*this.var.woCouple = true;
        this.var.woSupport = false;
        this.var.color = color( 'pink' );*/
        break;
      //show lack of support
      case 4:
        this.var.available = true;
        /*this.var.woCouple = true;
        this.var.woSupport = true;
        this.var.color = color( 'purple' );*/
        break;
    }
  }

  updateParts( type ){
    let kick = [];
    switch ( type ) {
      case 0:
        kick = [ 0, 1 ];
        break;
      case 1:
        kick = [ 6, 7 ];
        break;
      case 2:
        kick = [ 1 ];
        break;
      case 3:
        kick = [ 6 ];
        break;
      case 4:
        kick = [ 0 ];
      case 5:
        kick = [ 7 ];
        break;
      case 6:
        kick = [ 0, 1, 6, 7 ];
        break;
    }

    for( let i = 0; i < kick.length; i++ )
      for( let j = this.array.eighthPart.length - 1; j >= 0; j-- )
        if( kick[i] == this.array.eighthPart[j] )
          this.array.eighthPart.splice( j, 1 );

    if( this.array.eighthPart.length == 0 )
      this.var.available = false;

    this.updateKind();
  }

  updateKind(){
    let type = 0;
    for( let i = 0; i < this.array.eighthPart.length; i++ )
      switch ( this.array.eighthPart[i] ) {
        case 0:
          type += 1000;
          break;
        case 1:
          type += 100;
          break;
        case 6:
          type += 10;
          break;
        case 7:
          type += 1;
          break;
      }

    switch ( type ) {
      case 1111:
        this.var.kind = 0;
        this.var.color = color( 240, colorMax, colorMax * 0.5 );
        break;
      case 1011:
        this.var.kind = 3;
        this.var.color = color( 270, colorMax, colorMax * 0.5 );
        break;
      case 1101:
        this.var.kind = 1;
        this.var.color = color( 210, colorMax, colorMax * 0.5 );
        break;
      case 11:
        this.var.kind = 4;
        this.var.color = color( 300, colorMax, colorMax * 0.5 );
        break;
      case 1100:
        this.var.kind = 2;
        this.var.color = color( 180, colorMax, colorMax * 0.5 );
        break;
      case 1:
        this.var.kind = 6;
        this.var.color = color( 330, colorMax, colorMax * 0.5 );
        break;
      case 1000:
        this.var.kind = 5;
        this.var.color = color( 120, colorMax, colorMax * 0.5 );
        break;
      case 0:
        this.var.kind = 7;
        this.var.color = color( 0, colorMax, colorMax * 0.5 );
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
