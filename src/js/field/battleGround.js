//
class battleGround{
  constructor(){
    this.const = {
      n: 4,
      m: 5,
      a: cellSize
    };
    this.array = {
      windRose: [ 'NNE', 'E', 'SSE', 'SSW', 'W', 'NNW' ],
      neighbor: [],
      meeple: [],
      cell: []
    }
    this.offset = createVector( cellSize * 2, cellSize * 2 )
    this.const.r = cellSize / ( Math.tan( Math.PI / 6 ) * 2 );

    this.init();
  }

  initCells(){
    for( let i = 0; i < this.const.n; i++ ){
      this.array.cell.push( [] );
      for( let j = 0; j < this.const.m; j++ ){
          let index = i * this.const.m + j;
          let vec = createVector( this.offset.x, this.offset.y );
            vec.x += this.const.r * 2 * j;
            vec.y += this.const.a * 1.5 * i;
          if( i % 2 == 1 )
            vec.x += this.const.r;

          this.array.cell[i].push( new cell( index, vec ) )
      }
    }
  }

  initMeeples(){
    let grid = createVector( 0, 0 ) ;
    let center = this.array.cell[grid.y][grid.x].center;
    this.array.meeple.push( new meeple( 0, grid, center ) );
    grid = createVector( 3, 3 ) ;
    center = this.array.cell[grid.y][grid.x].center;
    this.array.meeple.push( new meeple( 0, grid, center ) );

    this.array.meeple[0].setStatus( 1, null, true );

    this.updateMeeples()
  }

  initNeighbors(){
    this.array.neighbor = [
      createVector( 1, -1 ),
      createVector( 1, 0 ),
      createVector( 1, 1 ),
      createVector( 0, 1 ),
      createVector( -1, 0 ),
      createVector( 0, -1 ),
    ];
  }

  init(){
    this.initCells();
    this.initMeeples();
    this.initNeighbors();
  }

  paveWay( meeple, begin, end ){

  }

  //find the grid coordinates by index
  convertIndex( index ){
    if( index == undefined )
      return null;

    let y = Math.floor( index / this.const.n );
    let x = index % this.const.m;
    return createVector( x, y );
  }

  //find the index coordinates by grid coordinates
  convertGrid( vec ){
    if( vec == undefined )
      return null;

    return vec.y * this.const.m + vec.x;
  }

  cleanCells(){
    for( let i = 0; i < this.array.cell.length; i++ )
      for( let j = 0; j < this.array.cell[i].length; j++ )
        this.array.cell[i][j].setStatus( 0 );
  }

  updateMeeples(){
    this.cleanCells();

    for( let i = 0; i < this.array.meeple.length; i++ ){
      let vec = this.array.meeple[i].current;
      let status = 1;
      if( this.array.meeple[i].status == 'move' )
        status = 2;
      this.array.cell[vec.y][vec.x].setStatus( status );
    }
  }

  draw(){
    this.updateMeeples();
    
    for( let i = 0; i < this.array.cell.length; i++ )
      for( let j = 0; j < this.array.cell[i].length; j++ ){
        this.array.cell[i][j].draw();
      }

    for( let i = 0; i < this.array.meeple.length; i++ ){
      this.array.meeple[i].update();
      this.array.meeple[i].draw();
    }
  }
}
