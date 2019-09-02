//exploration of uncharted land
class fogOfWar{
  constructor (){
    this.const = {
      a: cellSize
    }
    this.array = {
      vertex: []
    };
    this.var = {

    }

    this.init();
  }

  init(){
    this.array.vertex.push( createVector( cellSize * 2, cellSize * 2 ) );
    this.grounds = new grounds( this.array.vertex[0] );
  }

  //drawing hunting grounds
  draw(){
    this.grounds.draw( this.array.vertex[0] );
  }
}
