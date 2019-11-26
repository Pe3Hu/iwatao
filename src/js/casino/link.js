//
class link{
  constructor ( index, center, suit , value ){
    this.const = {
      index: index
    };
    this.center = center;
    this.status = 'forgotten'; //forgotten proposed selected
    this.data = {
      suit: null,
      value: null
    };
    this.size = createVector( cellSize * 2, cellSize * 2 );

    this.setData( suit , value );

    this.init();
  }

  init(){

  }

  setCenter( center ){
    this.center = center;
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

  setData( suit, value ){
    this.data.suit = suit;
    this.data.value = value;
    let hue = null;

    switch ( this.data.suit ) {
      case 'a':
        hue = 0;
        break;
      case 'b':
        hue = 1;
        break;
      case 'c':
        hue = 2;
        break;
      case 'd':
        hue = 3;
        break;
        break;
      case 'e':
        hue = 4;
        break;
    }
    this.hue = colorMax / 5 * hue;
    this.color = color ( this.hue, colorMax, colorMax * 0.5 );
  }

  //drawing link
  draw( offset ){
    switch ( this.status ) {
      case 'proposed':
        noStroke();
        fill( this.color );
        rect(
          offset.x + this.center.x - this.size.x / 2,
          offset.y + this.center.y - this.size.y / 2,
          this.size.x, this.size.y );

        //draw text
        fill( 0 );
        text( this.data.value, offset.x + this.center.x, offset.y + this.center.y + fontSize / 3 );
        break;
      case 'selected':
        noStroke();
        fill( this.color );
        rect(
          offset.x + this.center.x - this.size.x / 2,
          offset.y + this.center.y - this.size.y / 2,
          this.size.x, this.size.y );

        noStroke();
        fill( 0, 0, colorMax * 0.66 );
        ellipse(
          offset.x + this.center.x,
          offset.y + this.center.y,
          this.size.x * 0.75, this.size.y * 0.75 );

        //draw text
        fill( 0 );
        text( this.data.value, offset.x + this.center.x, offset.y + this.center.y + fontSize / 3 );
        break;
    }
  }
}
