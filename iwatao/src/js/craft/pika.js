//the basic element of which consists tptpt
class pika {
  constructor ( index, center, aNum ){
    this.index  = index;
    this.size = createVector( cellSize, cellSize );
    this.center = center;
    this.status = 'selected'; //forgotten proposed selected
    this.aspect = {
      num: aNum,
      name: null
    }

    this.setType( this.aspect.num );
  }

  //determine the display method
  setStatus( stat ){
    switch ( stat ) {
      //do not show
      case 0:
        this.status = 'forgotten';
        break;
      //show as an option
      case 1:
        this.status = 'proposed';
        break;
      //show as result
      case 2:
        this.status = 'selected';
        break;
    }
  }

  setType( num ){
    this.aspect.num = num;
    switch ( this.aspect.num ) {
      case 0:
        this.color = color( 0 );
        this.aspect.name = 'dark';
        break;
      case 1:
        this.color = color( 360 );
        this.aspect.name = 'light';
        break;
      case 2:
        this.color = color( 0, 360, 360 );
        this.aspect.name = 'fire';
        break;
      case 3:
        this.color = color( 90, 360, 360 );
        this.aspect.name = 'earth';
        break;
      case 4:
        this.color = color( 210, 360, 360 ); //origin hue = 180 DLFEABTWI
        this.aspect.name = 'aqua';
        break;
      case 5:
        this.color = color( 300, 360, 360 );
        this.aspect.name = 'breeze';
        break;
      case 6:
        this.color = color( 60, 360, 360 );
        this.aspect.name = 'thunder';
        break;
      case 7:
        this.color = color( 150, 360, 360 );
        this.aspect.name = 'wood';
        break;
      case 8:
        this.color = color( 270, 360, 360 );
        this.aspect.name = 'iron';
        break;
      case 9:
        this.color = color( 270 );
        this.aspect.name = null;
        this.status = 'forgotten';
        break;
      default:
        this.color = color( 270 );
    }
  }

  setVars( pika ){
    this.aspect.num = pika.aspect.num;
    this.setType( pika.aspect.num );
    this.status = pika.status;
  }

  //whether the center is on the visible part of the screen
  stayWithinCheck(){
    let flag = true;
    if ( this.center.x < cellSize / 2 ||
        this.center.y < cellSize / 2  ||
        this.center.x > canvasSize.x - cellSize / 2 ||
        this.center.y > canvasSize.x - cellSize / 2 )
      flag = false;
    return flag;
  }

  //drawing pika
  draw( offset ){
    //offset = createVector()
    if ( this.stayWithinCheck() )
      switch ( this.status ) {
        case 'proposed':
          noFill();
          if ( tptptStatus == 'edit' )
            rect(
              offset.x + this.center.x - this.size.x / 2,
              offset.y + this.center.y - this.size.y / 2,
              this.size.x, this.size.y );
          break;
        case 'selected':
          fill( this.color );
          stroke( 1 );
          rect(
            offset.x + this.center.x - this.size.x / 2,
            offset.y + this.center.y - this.size.y / 2,
            this.size.x, this.size.y );
          break;
      }
  }
}
