//gambling platform
class gamingHouse {
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
    this.bandit = new bandit( this.array.vertex[0] );
  }

  //drawing gamingHouse
  draw(){
    this.bandit.draw( this.array.vertex[0] );
  }
}
