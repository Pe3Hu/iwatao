//random event
class halt{
  constructor ( index, center, type , grade ){
    this.index  = index;
    this.center = center;
    this.status = 'forgotten'; //forgotten proposed selected
    this.data = {
      type: null,
      grade: null
    };
    this.size = createVector( cellSize, cellSize );

    this.setData( type, grade )

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

  setData( type, grade ){
    this.data.type = type;
    this.data.grade = grade;
  }

  //drawing halt
  draw( offset ){
    switch ( this.status ) {
      case 'proposed':
        noStroke();
        break;
      case 'selected':
        stroke( 0 );
        break;
    }

    stroke( 0 );
    fill( 0, 0, colorMax );
    ellipse(
      offset.x + this.center.x,
      offset.y + this.center.y,
      this.size.x, this.size.y );

    //draw text
    fill( 0 );
    text( this.data.type, offset.x + this.center.x, offset.y + this.center.y + fontSize / 3 );
  }
}
