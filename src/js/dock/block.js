//the basic element of which consists module
class block {
  constructor ( index, center, scale, partition ){
    this.index  = index;
    this.center = center;
    this.scale = scale;
    this.partition = partition ? partition : null;
    this.size = createVector( cellSize * scale, cellSize * scale );
    this.kind = null;
    this.colorBackground = color( 0, 0, colorMax * 4 / 5 );
    this.colorPartition =  color( colorMax * 0.5, colorMax * 0.25, colorMax * 0.25 );
    this.colorGateway = color( colorMax * 5 / 6, colorMax, colorMax * 0.5 );
    this.colorFocus = color( colorMax / 7, colorMax, colorMax * 0.6 );
  }

  setKind( kind ){
    this.kind = kind;
  }

  setPartition( partition ){
    this.partition = partition;
  }

  //drawing block
  draw( offset ){
    fill( this.colorBackground );
    if( this.partition == 1 )
      fill( this.colorGateway );
    if( this.partition == 10 )
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
    textSize( fontSize * this.scale  );
    fill( 0 );
    text( this.index, offset.x + this.center.x, offset.y + this.center.y + fontSize / 6 );
    textSize( fontSize );
  }
}
