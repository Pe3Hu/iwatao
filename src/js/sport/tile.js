//the basic element of court and net
class tile{
  constructor ( index, center ){
    this.index  = index;
    this.size = createVector( cellSize, cellSize );
    this.center = center;
    this.status = 'selected'; //forgotten proposed selected
    this.type = {
      num: null,
      name: null
    };

    this.setType( 11 );
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

  //determine the tile type
  setType( num ){
    this.type.num = num;
    switch ( this.type.num ) {
      case 0:
        this.color = color( 0, 0, 0 );
        this.type.name = 'center';
        break;
      case 1:
        this.color = color( 0, 0, colorMax );
        this.type.name = 'border';
        break;
      case 2:
        this.color = color( 0, colorMax, colorMax * 0.5 );
        this.type.name = 'upRight';
        break;
      case 3:
        this.color = color( 90, colorMax, colorMax * 0.5 );
        this.type.name = 'rightDown';
        break;
      case 4:
        this.color = color( 180, colorMax, colorMax * 0.5 );
        this.type.name = 'DownLeft';
        break;
      case 5:
        this.color = color( 270, colorMax, colorMax * 0.5 );
        this.type.name = 'leftUp';
        break;
      case 6:
        this.color =  color( 0, 0, colorMax * 0.25 );
        this.type.name = 'height 0';
        break;
      case 7:
        this.color =  color( 0, 0, colorMax * 0.4 );
        this.type.name = 'height 1';
        break;
      case 8:
        this.color =  color( 0, 0, colorMax * 0.55 );
        this.type.name = 'height 2';
        break;
      case 9:
        this.color =  color( 0, 0, colorMax * 0.6 );
        this.type.name = 'height 3';
        break;
      case 10:
        this.color =  color( 0, 0, colorMax * 0.75 );
        this.type.name = 'height 4';
        break;
      case 11:
        this.color =  color( 0, 0, colorMax * 0.5 );
        this.type.name = 'null';
        break;
    }
  }

  //drawing tile
  draw( offset ){
    fill( this.color );
    stroke( color( 0, 0, colorMax * 0.5 ) );
    rect(
      offset.x + this.center.x - this.size.x / 2,
      offset.y + this.center.y - this.size.y / 2,
      this.size.x, this.size.y );
  }
}
