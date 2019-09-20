//the basic element of which consists module
class block {
  constructor( index, center, scale, visible ){
    this.index  = index;
    this.center = center;
    this.scale = scale;
    this.visible = visible ? visible : false;
    this.gateKind = null;
    this.partition = null;
    this.interior = 'floor';
    this.content = 'empty';
    this.status = 'forgotten';
    this.size = createVector( cellSize * scale, cellSize * scale );
    this.colorBackground = color( 0, 0, colorMax * 4 / 5 );
    this.colorPartition =  color( colorMax * 0.5, colorMax * 0.25, colorMax * 0.25 );
    this.colorGateway = color( colorMax * 5 / 6, colorMax, colorMax * 0.5 );
    this.colorFocus = color( colorMax / 7, colorMax, colorMax * 0.6 );
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
      //show as place to insert
      case 3:
        this.status = 'expectant';
        break;

    }
  }

  setKind( kind ){
    this.gateKind = kind;
    this.interior = 'door';
    if( kind == null )
      this.interior = 'floor';
  }

  setPartition( partition ){
    this.partition = partition;
    this.interior = 'wall';
    if( this.partition == null )
      this.interior = 'floor';
    this.setStatus( 2 );
  }

  setContent( content ){
    this.content = content;
  }

  setVisible( visible ){
    this.visible = visible;
  }

  copy( block, type ){
    this.visible = block.visible;
    this.content = block.content;
    this.interior = block.interior;
    this.gateKind = block.gateKind;
    this.setStatus( 1 );

    if( type == 0 )
      this.partition = block.partition;
  }

  free(){
    return ( this.status == 'selected' || this.status == 'forgotten' )
  }

  //drawing block
  draw( offset ){
    //if( this.status == 'forgotten' )
    //  return;

    fill( this.colorBackground );
    if( this.interior == 'door' )
      fill( this.colorGateway );
    if( this.content == 1 )
      fill( this.colorFocus );
    rect(
      offset.x + this.center.x - this.size.x / 2,
      offset.y + this.center.y - this.size.y / 2,
      this.size.x, this.size.y );

    fill( this.colorPartition );
    switch ( this.partition ) {
      case 2:
        rect(
          offset.x + this.center.x - this.size.x / 2,
          offset.y + this.center.y - this.size.y / 2,
          this.size.x, this.size.y / 4);
        break;
      case 3:
        rect(
          offset.x + this.center.x + this.size.x / 4,
          offset.y + this.center.y - this.size.y / 2,
          this.size.x / 4, this.size.y );
        break;
      case 4:
        rect(
          offset.x + this.center.x - this.size.x / 2,
          offset.y + this.center.y + this.size.y / 4,
          this.size.x, this.size.y / 4);
        break;
      case 6:
        rect(
          offset.x + this.center.x - this.size.x / 2,
          offset.y + this.center.y - this.size.y / 2,
          this.size.x / 4, this.size.y );
        rect(
          offset.x + this.center.x - this.size.x / 2,
          offset.y + this.center.y - this.size.y / 2,
          this.size.x, this.size.y / 4);
        break;
      case 5:
        rect(
          offset.x + this.center.x - this.size.x / 2,
          offset.y + this.center.y - this.size.y / 2,
          this.size.x / 4, this.size.y );
        break;
      case 7:
        rect(
          offset.x + this.center.x - this.size.x / 2,
          offset.y + this.center.y - this.size.y / 2,
          this.size.x, this.size.y / 4);
        rect(
          offset.x + this.center.x + this.size.x / 4,
          offset.y + this.center.y - this.size.y / 2,
          this.size.x / 4, this.size.y );
        break;
      case 8:
        rect(
          offset.x + this.center.x + this.size.x / 4,
          offset.y + this.center.y - this.size.y / 2,
          this.size.x / 4, this.size.y );
        rect(
          offset.x + this.center.x - this.size.x / 2,
          offset.y + this.center.y + this.size.y / 4,
          this.size.x, this.size.y / 4);
        break;
      case 9:
        rect(
          offset.x + this.center.x - this.size.x / 2,
          offset.y + this.center.y + this.size.y / 4,
          this.size.x, this.size.y / 4);
        rect(
          offset.x + this.center.x - this.size.x / 2,
          offset.y + this.center.y - this.size.y / 2,
          this.size.x / 4, this.size.y );
        break;
    }

    //draw text
    textSize( fontSize * this.scale * 0.7 );
    fill( 0 );
    //if( this.interior != 'floor' )
    text( this.index, offset.x + this.center.x, offset.y + this.center.y + fontSize / 6 );
    textSize( fontSize );
  }
}
