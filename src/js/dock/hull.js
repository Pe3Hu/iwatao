//the basic element of which consists module
class hull {
  constructor( index, core ){
    this.index  = index;
    this.array = {
      gateway: [ [], [], [], [] ],
      module: [],
      block: [],
      focus: [],
      grid: [],
      id: []
    }

    this.const = {
      n: 33,
      m: 16,
      scale: 0.5,
      a: cellSize * 0.25
    }
    this.var = {
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
          let index = j * this.const.n + i;
          //+1 only for smooth grid coordinates
          let x = this.const.a * ( - this.const.n / 2 + i + 1 );
          let y = this.const.a * ( - this.const.n / 2 + j );
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

    this.array.gateway[0].push( index - this.const.n );
    this.array.gateway[1].push( index + 1 );
    this.array.gateway[2].push( index + this.const.n );
    this.array.gateway[3].push( index - 1 );
  }

  cleanGrid(){
    for( let i = 0; i < this.array.grid.length; i++ )
      for( let j = 0; j < this.array.grid[i].length; j++ )
        if( this.array.grid[i][j].status != 'selected' )
          this.array.grid[i][j].setStatus( 0 );
  }

  //find the grid coordinates by index
  convertIndex( index ){
    if( index == undefined )
      return null;
    let x = Math.floor( index / this.const.n );
    let y = index % this.const.n;
    return createVector( x, y );
  }

  draw( offset ){
    //let offset = createVector( 5.5*cellSize, 5.5*cellSize );
    for( let i = 0; i < this.array.grid.length; i++ )
      for( let j = 0; j < this.array.grid[i].length; j++ ){
        let x = offset.x + ( i - this.const.n * 0.5 ) * this.const.a;
        let y = offset.y + ( j - this.const.n * 0.5 ) * this.const.a;
        let vec = createVector( x, y );

        /*stroke('white');
        noFill();
        rect( x, y, this.const.a, this.const.a );*/

        if( this.array.grid[i][j].status != 'forgotten' )
         this.array.grid[i][j].draw( vec )
      }
  }
}
