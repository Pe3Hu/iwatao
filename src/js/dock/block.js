//the basic element of which consists module
class block {
  constructor ( index, center, status ){
    this.index  = index;
    this.center = center;
    this.status = status;
    this.size = createVector( cellSize * 0.5, cellSize * 0.5 );
    this.kind = null;

    this.setStatus( this.status );
  }

  setStatus( status ){
    this.status = status;

    switch ( status ) {
      case 0:
        this.color = color( colorMax * 0.8 );
        break;
      case 1:
        this.color = color( 0, colorMax, colorMax * 0.5 );
        break;
      case 2:
        this.color = color( colorMax / 3, colorMax, colorMax * 0.5 );
        break;
    }
  }

  setKind( kind ){
    this.kind = kind;
  }

  //drawing block
  draw( offset ){
    fill( this.color );
    rect(
      offset.x + this.center.x - this.size.x / 2,
      offset.y + this.center.y - this.size.y / 2,
      this.size.x, this.size.y );

    //draw text

    textSize( fontSize / 2  );
    fill( 0 );
    text( this.index, offset.x + this.center.x, offset.y + this.center.y + fontSize / 6 );
    textSize( fontSize );
  }
}
