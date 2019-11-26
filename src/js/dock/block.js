//the basic element of which consists module
class block {
  constructor( index, center, scale ){
    this.const = {
      index: index
    };
    this.center = center;
    this.scale = scale;
    this.kind = null;
    this.sequence = null;
    this.partition = null;
    this.interior = 'floor';
    this.content = 'empty';
    this.status = 'forgotten';
    this.size = createVector( cellSize * scale, cellSize * scale );
    this.colorBackground = color( 0, 0, colorMax * 4 / 5 );
    this.colorPartition =  color( colorMax * 0.5, colorMax * 0.25, colorMax * 0.25 );
    this.colorGateway = color( colorMax * 5 / 6, colorMax, colorMax * 0.5 );
    this.colorGateway2 = color( colorMax * 2 / 6, colorMax, colorMax * 0.5 );
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

  setGate( kind, sequence ){
    this.kind = kind;
    this.sequence = sequence;
    this.interior = 'door';
    if( kind == null )
      this.interior = 'floor';
    else if ( sequence == undefined )
      console.log( '!' );
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
    //this.visible = block.visible;
    this.content = block.content;
    this.interior = block.interior;
    this.kind = block.kind;
    this.sequence = block.sequence;
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

    if( this.interior == 'door' ){
      if( this.status == 'expectant' )
        fill( this.colorGateway2 );
      if( this.status == 'selected' || this.status == 'proposed' )
        fill( this.colorGateway );
    }
    if( this.content == 1 )
      fill( this.colorFocus );
    rect(
      offset.x + this.center.x - this.size.x / 2,
      offset.y + this.center.y - this.size.y / 2,
      this.size.x, this.size.y );

    fill( this.colorPartition );
    if( this.interior == 'wall' )
      switch ( this.partition ) {
        case 0:
          rect(
            offset.x + this.center.x - this.size.x / 2,
            offset.y + this.center.y - this.size.y / 2,
            this.size.x, this.size.y / 4);
          break;
        case 1:
          rect(
            offset.x + this.center.x + this.size.x / 4,
            offset.y + this.center.y - this.size.y / 2,
            this.size.x / 4, this.size.y );
          break;
        case 2:
          rect(
            offset.x + this.center.x - this.size.x / 2,
            offset.y + this.center.y + this.size.y / 4,
            this.size.x, this.size.y / 4);
          break;
        case 3:
          rect(
            offset.x + this.center.x - this.size.x / 2,
            offset.y + this.center.y - this.size.y / 2,
            this.size.x / 4, this.size.y );
          break;
        case 4:
          rect(
            offset.x + this.center.x - this.size.x / 2,
            offset.y + this.center.y - this.size.y / 2,
            this.size.x, this.size.y / 4);
          rect(
            offset.x + this.center.x + this.size.x / 4,
            offset.y + this.center.y - this.size.y / 2,
            this.size.x / 4, this.size.y );
          break;
        case 5:
          rect(
            offset.x + this.center.x + this.size.x / 4,
            offset.y + this.center.y - this.size.y / 2,
            this.size.x / 4, this.size.y );
          rect(
            offset.x + this.center.x - this.size.x / 2,
            offset.y + this.center.y + this.size.y / 4,
            this.size.x, this.size.y / 4);
          break;
        case 6:
          rect(
            offset.x + this.center.x - this.size.x / 2,
            offset.y + this.center.y + this.size.y / 4,
            this.size.x, this.size.y / 4);
          rect(
            offset.x + this.center.x - this.size.x / 2,
            offset.y + this.center.y - this.size.y / 2,
            this.size.x / 4, this.size.y );
          break;
        case 7:
          rect(
            offset.x + this.center.x - this.size.x / 2,
            offset.y + this.center.y - this.size.y / 2,
            this.size.x / 4, this.size.y );
          rect(
            offset.x + this.center.x - this.size.x / 2,
            offset.y + this.center.y - this.size.y / 2,
            this.size.x, this.size.y / 4);
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
