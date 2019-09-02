//the basic element of which consists plant
class delta {
  constructor ( index, orientation, center ){
    this.index =  index;
    this.orientation = {
      flag: orientation,
      name: null,
      num: null
    };
    this.center = center;
    this.const = {
      r: cellSize / 4,
      R: cellSize / 2
    };
    this.neighbor = {
      a: null,
      b: null,
      c: null
    }
    this.color = null;
    this.array = {
      vertex: []
    };

    this.init();
  }

  initVertexs(){
    for( let i = 0; i < 3; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / 3 * ( i + this.orientation.num )) * this.const.R,
        Math.cos( Math.PI * 2 / 3 * ( i + this.orientation.num )) * this.const.R );
      vec.add( this.center );
      this.array.vertex.push( vec );
    }
  }

  init(){
    this.status = 'forgotten'; //forgotten proposed selected
    switch ( this.orientation.flag ) {
      case true:
        this.orientation.name = 'up';
        this.orientation.num = 0.5;
        this.color = color( 0 );
        break;
      case false:
        this.orientation.name = 'down';
        this.orientation.num = 0;
        this.color = color( colorMax );
        break;
    }
    
    this.initVertexs();
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

  //whether all the vertices are in the visible part of the screen
  stayWithinCheck(){
    let flag = true;
    for( let i = 0; i < this.array.vertex; i++ )
      if ( this.array.vertex[i].x < 0 ||
          this.array.vertex[i].y < 0 ||
          this.array.vertex[i].x > canvasSize.x ||
          this.array.vertex[i].y > canvasSize.x )
        flag = false;
    return flag;
  }

  draw( offset, plantStatus ){
    if ( this.stayWithinCheck() )
    switch ( this.status ) {
      case 'proposed':
        noFill();
        stroke( 1 );
        if ( plantStatus == 'soloEdit' )
          triangle(
            this.array.vertex[0].x + offset.x, this.array.vertex[0].y + offset.y,
            this.array.vertex[1].x + offset.x, this.array.vertex[1].y + offset.y,
            this.array.vertex[2].x + offset.x, this.array.vertex[2].y + offset.y );
        noStroke();
        break;
      case 'selected':
        fill( this.color );
        if ( this.index == 0 )
          fill( 'red' );
        triangle(
          this.array.vertex[0].x + offset.x, this.array.vertex[0].y + offset.y,
          this.array.vertex[1].x + offset.x, this.array.vertex[1].y + offset.y,
          this.array.vertex[2].x + offset.x, this.array.vertex[2].y + offset.y );
        break;
    }
  }
}
