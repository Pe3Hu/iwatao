//the basic element of which consists module
class hull {
  constructor( index, core ){
    this.const = {
      index: index,
      n: 33,
      m: 16,
      scale: 0.5,
      a: cellSize * 0.25
    }
    this.var = {
    }
    this.array = {
      gate:  [ [], [], [], [] ],
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
      this.addGateway( index + this.array.way[i], 'focus', 'solo', i );
  }

  addGateway( index, kind, sequence, way ){
    if( way == undefined )
      return;

    let vec = this.convertIndex( index );
    this.array.grid[vec.y][vec.x].setGate( kind, sequence );
    this.array.grid[vec.y][vec.x].setStatus( 3 );
    this.array.gate[way].push( new gate( index, kind, sequence, way ) );
  }

  cleanGrid(){
    for( let i = 0; i < this.array.grid.length; i++ )
      for( let j = 0; j < this.array.grid[i].length; j++ )
        if( this.array.grid[i][j].var.status != 'selected' ){
          this.array.grid[i][j].setGate( null, null );
          this.array.grid[i][j].setStatus( 0 );
        }

    for( let i = 0; i < this.array.gate.length; i++ )
      for( let j = 0; j < this.array.gate[i].length; j++ ){
        let vec = this.convertIndex( this.array.gate[i][j].const.index );
        let kind = this.array.gate[i][j].var.kind;
        let sequence = this.array.gate[i][j].var.sequence;
        this.array.grid[vec.y][vec.x].setGate( kind, sequence );
        this.array.grid[vec.y][vec.x].setStatus( 3 );
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

        //if( this.array.grid[i][j].var.status != 'forgotten' )
         this.array.grid[i][j].draw( vec )
      }
  }
}
