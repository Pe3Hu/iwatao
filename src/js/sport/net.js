//the
class net{
  constructor ( offset ){
    this.offset = offset;
    this.size = createVector( cellSize, cellSize );
    this.const = {
      a: cellSize,
      n: 5,
      m: 9
    };
    this.array = {
      tile: []
    };

    this.init();
  }

  init(){
    for( let i = 0; i < this.const.m; i++ ){
      this.array.tile.push([]);
      for( let j = 0; j < this.const.n; j++ ){
        let index = i * this.const.n + j;
        let center = createVector( i * this.const.a, j * this.const.a );
        let height = j + 6;
        this.array.tile[i].push( new tile( index, center ) );
        this.array.tile[i][j].setType( height );
      }
    }
  }

  //drawing pika
  draw(){
    for( let i = 0; i < this.array.tile.length; i++ )
      for( let j = 0; j < this.array.tile[i].length; j++ )
        this.array.tile[i][j].draw( this.offset );
  }
}
