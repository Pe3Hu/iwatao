//the basic element of which consists module
class hull {
  constructor( index, core ){
    this.index  = index;
    this.const = {
      n: 33,
      m: 16,
      scale: 0.5,
      a: cellSize * 0.25
    }
    this.var = {
    }
    this.array = {
      gateway: [ [], [], [], [] ],
      kind: [ [], [], [], [] ],
      module: [],
      block: [],
      focus: [],
      grid: [],
      id: [],
      way: [ -this.const.n, 1, this.const.n, -1 ]//'up', 'right', 'down', 'left'
    }

    this.init();
  }

  init(){
    this.initGrid();
    this.initFocus();
  }

  initGrid(){
    for( let i = 0; i < this.const.n; i++ ){
        this.array.grid.push( [] );
        for( let j = 0; j < this.const.n; j++ ){
          let index = i * this.const.n + j;
          //+1 only for smooth grid coordinates
          let x = this.const.a * ( - this.const.n / 2 + j );
          let y = this.const.a * ( - this.const.n / 2 + i );
          let center = createVector( x, y );
          this.array.grid[i].push( new block( index, center, this.const.scale ) );
        }
    }
  }

  initFocus(){
    let i = Math.floor( this.const.n / 2 );
    let j = Math.floor( this.const.n / 2 );
    let index = j * this.const.n + i;
    this.array.grid[i][j].setContent( 1 );
    this.array.grid[i][j].setStatus( 2 );


    for ( let i = 0; i < this.array.way.length; i++ )
      this.addGateway( i, index + this.array.way[i], 'solo' );
  }

  addGateway( way, index, kind ){
    if( way == undefined )
      return;

    let vec = this.convertIndex( index );
    this.array.grid[vec.y][vec.x].setKind( kind );
    this.array.grid[vec.y][vec.y].setStatus( 3 );
    this.array.gateway[way].push( index );
    this.array.kind[way].push( kind );
  }

  cleanGrid(){
    for( let i = 0; i < this.array.grid.length; i++ )
      for( let j = 0; j < this.array.grid[i].length; j++ )
        if( this.array.grid[i][j].status == 'forgotten'
        || this.array.grid[i][j].status == 'proposed' ){
          this.array.grid[i][j].setKind( null );
          this.array.grid[i][j].setStatus( 0 );
        }

    for( let i = 0; i < this.array.gateway.length; i++ )
      for( let j = 0; j < this.array.gateway[i].length; j++ ){
        let vec = this.convertIndex( this.array.gateway[i] );
        this.array.grid[vec.x][vec.y].setKind( this.array.kind[i][j] );
        this.array.grid[vec.x][vec.y].setStatus( 3 );
        this.array.grid[vec.x][vec.y].partition = null;
      }
  }

  //find the grid coordinates by index
  convertIndex( index ){
    if( index == undefined )
      return null;

    let y = Math.floor( index / this.const.n );
    let x = index % this.const.n;
    return createVector( x, y );

  }

  //find the index coordinates by grid coordinates
  convertGrid( vec ){
    if( vec == undefined )
      return null;

    return vec.y * this.const.n + vec.x;
  }

  draw( offset ){
    //let offset = createVector( 5.5*cellSize, 5.5*cellSize );
    for( let i = 0; i < this.array.grid.length; i++ )
      for( let j = 0; j < this.array.grid[i].length; j++ ){
        let x = offset.x + ( j - this.const.n * 0.5 ) * this.const.a;
        let y = offset.y + ( i - this.const.n * 0.5 ) * this.const.a;
        let vec = createVector( x, y );

        /*stroke('white');
        noFill();
        rect( x, y, this.const.a, this.const.a );*/

        //if( this.array.grid[i][j].status != 'forgotten' )
         this.array.grid[i][j].draw( vec )
      }
  }
}
