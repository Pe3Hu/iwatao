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
      mode: 'search' //'search' fight
    };

    this.init();
  }

  init(){
    this.initVertex();
    this.grounds = new grounds();
    this.hearth = new hearth();
  }

  initVertex(){
    this.array.vertex.push( createVector( cellSize * 0.5, cellSize * 1.5 ) );
    this.array.vertex.push( createVector( cellSize * 0, cellSize * 0 ) );
  }

  //drawing hunting grounds
  draw(){
    switch ( this.var.mode ) {
      case 'search':
        this.grounds.draw( this.array.vertex[0] );
        break;
      case 'fight':
        this.hearth.draw( this.array.vertex[1] );
        break;
    }
  }
}
