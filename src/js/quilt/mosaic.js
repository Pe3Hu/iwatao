//
class mosaic{
  constructor( index, center ){
    this.const = {
      index: index,
      a: cellSize / 2,
      b: null,
      n: 5
    };
    this.var = {
      center: center,
      kind: null
    };
    this.array = {
      vertex: [],
      vector: []
    };

    this.init();
  }

  init(){
    this.const.b = this.const.a / ( Math.sqrt( 3 ) - 1 );
    this.initVectors();
    this.setKind();
  }

  setKind( kind ){
    this.var.kind = kind;
    this.updateVertexs();
  }


  initVectors(){
    let angleRotate = Math.PI;
    this.array.vector = [];
    this.array.vector.push( this.var.center.copy() );
    let angle = angleRotate;
    let vec = this.var.center.copy();
    let add = createVector(
       Math.cos( angle ) * this.const.a,
       Math.sin( angle ) * this.const.a );
    vec.add( add );
    this.array.vector.push( vec.copy() );

    angle = Math.PI / 3 + angleRotate;
    add = createVector(
       Math.cos( angle ) * this.const.b,
       Math.sin( angle ) * this.const.b );
     vec.add( add );
     this.array.vector.push( vec.copy() );

     angle = Math.PI * 5 / 6 + angleRotate;
     add = createVector(
        Math.cos( angle ) * this.const.b,
        Math.sin( angle ) * this.const.b );
      vec.add( add );
      this.array.vector.push( vec.copy() );

     angle = Math.PI * 7 / 6 + angleRotate;
     add = createVector(
        Math.cos( angle ) * this.const.b,
        Math.sin( angle ) * this.const.b );
      vec.add( add );
      this.array.vector.push( vec.copy() );

  }

  updateVertexs(){
    this.array.vertex = [];
    switch ( this.var.kind ) {
      case 0:

        break;
    }

    for( let i = 0; i < this.const.n; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / this.const.n * ( - i + this.const.n / 2 ) ) * this.const.a,
        Math.cos( Math.PI * 2 / this.const.n * ( - i + this.const.n / 2 ) ) * this.const.a );
      vec.add( this.var.center );
      this.array.vertex.push( vec );
    }

    //console.log( this.array.vertex )
  }

  draw(){
    ellipse( this.var.center.x, this.var.center.y, 10, 10 );
    stroke('red');
    for( let i = 0; i < this.array.vector.length; i++ ){
      let ii = ( i + 1 ) % this.array.vector.length;
      triangle( this.var.center.x, this.var.center.y,
                this.array.vector[i].x, this.array.vector[i].y,
                this.array.vector[ii].x, this.array.vector[ii].y );
     }
  }
}
