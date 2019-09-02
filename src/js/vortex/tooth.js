//protruding part of the gear
class tooth {
  constructor ( index, center, vec ){
    this.index =  index;
    this.const =  {
      a: cellSize,
      vec: vec
    };
    this.center = center;
    this.array = {
      vertex: []
    };

    this.initVertexs();
  }

  initVertexs(){
    let vec = this.center.copy();
    let addVec = createVector(
      this.const.vec.x - this.const.vec.y,
      this.const.vec.y + this.const.vec.x );
    vec.add( addVec );
    vec.x -= this.const.vec.x;
    vec.y -= this.const.vec.y;
    this.array.vertex.push( vec.copy() );

    vec = this.center.copy();
    let addVec2 = createVector(
      this.const.vec.x + this.const.vec.y,
      this.const.vec.y - this.const.vec.x );
    vec.add( addVec2 );
    vec.x -= this.const.vec.x;
    vec.y -= this.const.vec.y;
    this.array.vertex.push( vec.copy() );

    vec = this.center.copy();
    addVec.mult( -1 );
    vec.add( addVec );
    this.array.vertex.push( vec.copy() );

    vec = this.center.copy();
    addVec2.mult( -1 );
    vec.add( addVec2 );
    this.array.vertex.push( vec.copy() );

  }

  draw(){
    fill('purple');
    noStroke();
    triangle( this.array.vertex[0].x, this.array.vertex[0].y,
      this.array.vertex[1].x, this.array.vertex[1].y,
      this.array.vertex[2].x, this.array.vertex[2].y );
    triangle( this.array.vertex[0].x, this.array.vertex[0].y,
      this.array.vertex[3].x, this.array.vertex[3].y,
      this.array.vertex[2].x, this.array.vertex[2].y );
    ellipse( this.center.x, this.center.y, this.const.a, this.const.a );
    /*for( let i = 0; i < this.array.vertex.length; i++ ){//this.array.vertex.length
      let nextI = ( i + 1 ) % this.array.vertex.length;
      line( this.array.vertex[i].x, this.array.vertex[i].y,
        this.array.vertex[nextI].x, this.array.vertex[nextI].y
      );
    }*/
  }
}
