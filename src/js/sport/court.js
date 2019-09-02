//the
class court{
  constructor ( offset ){
    this.offset = offset;
    this.size = createVector( cellSize, cellSize );
    this.const = {
      a: cellSize,
      n: 9,
      m: 16,
      k: 3,
      c: 4
    };
    this.array = {
      tile: []
    };

    this.init();
  }

  init(){
    this.initTiles();

    this.setTypes();
  }

  initTiles(){
    for( let i = 0; i < this.const.m; i++ ){
      this.array.tile.push([]);
      for( let j = 0; j < this.const.n; j++ ){
        let index = i * this.const.n + j;
        let center = createVector( i * this.const.a, j * this.const.a );
        this.array.tile[i].push( new tile( index, center ) );
      }
    }
  }

  setTypes(){
    //set centers
    this.array.tile[4][4].setType( 0 );
    this.array.tile[11][4].setType( 0 );

    //set borders
    for( let i = 0; i < this.const.m; i++ ){
        this.array.tile[i][0].setType( 1 );
        this.array.tile[i][this.const.n - 1].setType( 1 );
    }
    for( let i = 0; i < this.const.n; i++ ){
        this.array.tile[0][i].setType( 1 );
        this.array.tile[this.const.m - 1][i].setType( 1 );
    }

    //set regions l-u
    for( let i = 0; i < this.const.c; i++ )
      for( let j = 0; j < this.const.k; j++ ){
          let addI = 1 + i;
          let addJ = 1 + j;
          this.array.tile[addI][addJ].setType( 2 );
          addI = 8 + i;
          this.array.tile[addI][addJ].setType( 4 );
      }

    //set regions r-u
    for( let i = 0; i < this.const.k; i++ )
      for( let j = 0; j < this.const.c; j++ ){
          let addI = 5 + i;
          let addJ = 1 + j;
          this.array.tile[addI][addJ].setType( 3 );
          addI = 12 + i;
          this.array.tile[addI][addJ].setType( 5 );
      }

    //set regions r-d
    for( let i = 0; i < this.const.c; i++ )
      for( let j = 0; j < this.const.k; j++ ){
          let addI = 4 + i;
          let addJ = 5 + j;
          this.array.tile[addI][addJ].setType( 4 );
          addI = 11 + i;
          this.array.tile[addI][addJ].setType( 2 );
      }

    //set regions l-d
    for( let i = 0; i < this.const.k; i++ )
      for( let j = 0; j < this.const.c; j++ ){
          let addI = 1 + i;
          let addJ = 4 + j;
          this.array.tile[addI][addJ].setType( 5 );
          addI = 8 + i;
          this.array.tile[addI][addJ].setType( 3 );
      }

  }

  //drawing pika
  draw(){
    for( let i = 0; i < this.array.tile.length; i++ )
      for( let j = 0; j < this.array.tile[i].length; j++ )
        this.array.tile[i][j].draw( this.offset );
  }
}
