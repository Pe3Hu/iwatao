//the basic element of which consists plant
class delta {
  constructor ( index, orientation, center, offset ){
    this.index =  index;
    this.center = center;
    this.offset = offset;
    this.orientation = {
      flag: orientation,
      name: null,
      num: null
    };
    this.const = {
      a: cellSize,
      r: cellSize * Math.sqrt( 3 ) / 6,
      R: cellSize * Math.sqrt( 3 ) / 3,
      i: null,
      j: null
    };
    this.neighbor = {
      a: null,
      b: null,
      c: null
    }
    this.color = null;
    this.status = 'forgotten';
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
    this.array = {
      vertex: []
    };

    this.convertIndex();
    this.initVertexs();
  }

  convertIndex(){
    let minRing = 0;
    let maxRing = Math.ceil( this.index / 3 );
    let ringSelection = 0;
    while ( minRing < maxRing ){
      ringSelection++;
      minRing = ringSelection * ( ringSelection + 1 ) / 2;
    }
    minRing = ringSelection * ( ringSelection - 1 ) / 2;
    this.const.i = ringSelection;
    this.const.j = this.index - 1 - minRing  * 3;
    if ( this.index == 0 )
      this.const.j = 0;
  }

  initVertexs(){
    for (let i = 0; i < 3; i++){
      let vec = createVector(
        Math.sin( Math.PI * 2 / 3 * ( i + this.orientation.num )) * this.const.R,
        Math.cos( Math.PI * 2 / 3 * ( i + this.orientation.num )) * this.const.R );
      vec.add( this.center );
      this.array.vertex.push( vec );
    }
  }

  setOffset( vec ){
     this.offset = vec;
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

  draw(){
    switch ( this.status ) {
      case 'proposed':
        noFill();
        triangle(
          this.array.vertex[0].x + this.offset.x, this.array.vertex[0].y + this.offset.y,
          this.array.vertex[1].x + this.offset.x, this.array.vertex[1].y + this.offset.y,
          this.array.vertex[2].x + this.offset.x, this.array.vertex[2].y + this.offset.y );
        break;
      case 'selected':
        fill( this.color );
        triangle(
          this.array.vertex[0].x + this.offset.x, this.array.vertex[0].y + this.offset.y,
          this.array.vertex[1].x + this.offset.x, this.array.vertex[1].y + this.offset.y,
          this.array.vertex[2].x + this.offset.x, this.array.vertex[2].y + this.offset.y );
        break;
    }
  }
}
