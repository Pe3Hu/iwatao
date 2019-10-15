//the basic element of vortex
class gear {
  constructor ( index, orientation, center, teeths ){
    this.index =  index;
    this.orientation = orientation;
    this.center = center;
    this.const = {
      teeths: teeths,
      n: teeths * 2,
      a: cellSize,
      r: null,
      R: null
    };
    this.const.R = this.const.a / ( Math.sin( Math.PI / this.const.n ) * 2 );
    this.const.r = this.const.a / ( Math.tan( Math.PI / this.const.n ) * 2 );
    this.color = null;
    this.status = 'forgotten'; //forgotten proposed selected
    this.array = {
      vertex: [],
      tooth: [],
      contact: []
    };

    this.init();
  }

  initVertexs(){
    for( let i = 0; i < this.const.n; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / this.const.n * ( 0.5 - i + this.const.teeths + this.orientation ) ) * this.const.R,
        Math.cos( Math.PI * 2 / this.const.n * ( 0.5 - i + this.const.teeths + this.orientation ) ) * this.const.R );
      vec.add( this.center );
      this.array.vertex.push( vec );
    }
  }

  initTeeths(){
    for( let i = 0; i < this.const.teeths; i++ ){
      let angle = Math.PI * 2 / this.const.teeths * ( i + this.orientation / 2 ) - Math.PI / 2;
      let vec = createVector(
        Math.cos( angle ) * this.const.a / 2,
        Math.sin( angle ) * this.const.a / 2 );
      let center = createVector(
        Math.cos( angle ) * this.const.r,
        Math.sin( angle ) * this.const.r );
      center.add( this.center );
      center.add( vec );
      this.array.tooth.push( new tooth( i, center, vec ) );
    }
  }

  initContacts(){
    for( let i = 0; i < this.const.teeths; i++ ){
      let angle = Math.PI * 2 / this.const.teeths * ( 0.5 + i + this.orientation / 2 ) - Math.PI / 2;
      let vec = createVector(
        Math.cos( angle ) * ( this.const.r + this.const.a / 2 ),
        Math.sin( angle ) * ( this.const.r + this.const.a / 2 ));
      vec.add( this.center  )
      this.array.contact.push( vec );
    }
  }

  init(){
    this.initVertexs();
    this.initTeeths();
    this.initContacts();
  }

  rotate(){
    this.orientation = ( this.orientation + 1 ) % 2;
  }

  update(){
    let array = this.array.tooth;
    for( let i = 0; i < this.array.tooth.length; i++ )
      this.array.tooth[i] = this.array.contact[i].copy();

    for( let i = 0; i < this.array.contact.length; i++ )
      this.array.contact[i] = array[i].copy();
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
    noStroke();
    fill( 'yellow' );
    ellipse( this.center.x, this.center.y, this.const.a, this.const.a );

    /*stroke( 0 );
    noFill();// 'purple'
    for( let i = 0; i < this.array.contact.length; i++ )//this.array.contact.length
      ellipse( this.array.contact[i].x, this.array.contact[i].y, this.const.a, this.const.a );
    */

    stroke( 0 );
    for( let i = 0; i < this.array.vertex.length; i++ ){//this.array.vertex.length
      let nextI = ( i + 1 ) % this.array.vertex.length;
      line( this.array.vertex[i].x, this.array.vertex[i].y,
        this.array.vertex[nextI].x, this.array.vertex[nextI].y
      );
     }

     for( let i = 0; i < this.array.tooth.length; i++ )//this.array.tooth.length
      this.array.tooth[i].draw();
  }
}
