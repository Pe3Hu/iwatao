//
class forgottenLand{
  constructor(){
    this.const = {
      parties: 6,
      n: 24,
      m: 24,
      k: 8,
      o: 6,
      a: cellSize / 2
    };
    this.var = {
      enclave: 0,
      endGame: false
    }
    this.array = {
      windRose: [ 'NNE', 'E', 'SSE', 'SSW', 'W', 'NNW' ],
      toConstruct: [],
      adjacency: [],
      neighbor: [],
      enclave: [],
      team: [],
      plot: []
    }

    this.init();
  }

  initNeighbors(){
    this.array.neighbor = [
      [
        createVector( 0, -1 ),
        createVector( 1, 0 ),
        createVector( 0, 1 ),
        createVector( -1, 1 ),
        createVector( -1, 0 ),
        createVector( -1, -1 ),
      ],
      [
        createVector( 1, -1 ),
        createVector( 1, 0 ),
        createVector( 1, 1 ),
        createVector( 0, 1 ),
        createVector( -1, 0 ),
        createVector( 0, -1 ),
      ]
    ];
  }

  initPlots(){
    for( let i = 0; i < this.const.n; i++ ){
      this.array.plot.push( [] );
      for( let j = 0; j < this.const.m; j++ ){
          let index = i * this.const.m + j;
          let vec = createVector( this.offset.x, this.offset.y );
          let grid = createVector( j, i );
            vec.x += this.const.r * 2 * j;
            vec.y += this.const.a * 1.5 * i;
          if( i % 2 == 1 )
            vec.x += this.const.r;

          this.array.plot[i].push( new plot( index, vec, grid, this.const.a ) );

          if( i >= this.const.n / this.const.k &&
              i < this.const.n * ( this.const.k - 1 ) / this.const.k &&
              j >= this.const.m / this.const.k &&
              j < this.const.m * ( this.const.k - 1 ) / this.const.k ){
                let flag = true;
                if( i >= this.const.n * ( this.const.k / 2 - 1 ) / this.const.k &&
                    i < this.const.n * ( this.const.k / 2 + 1 ) / this.const.k &&
                    j >= this.const.m * ( this.const.k / 2 - 1 ) / this.const.k &&
                    j < this.const.m * ( this.const.k / 2 + 1 ) / this.const.k )
                    flag = false;
                if( flag )
                  this.array.toConstruct.push( index );  //this.array.plot[i][j].setStatus(1);
              }
      }
    }
  }

  initTeams(){
    for( let i = 0; i < this.const.parties; i++ )
      this.array.team.push( [] );
  }

  initEnclaves(){
    this.addEnclave();
    this.expandHorizon( 0 );
  }

  addEnclave(){
    let rand = Math.floor( Math.random() * this.array.toConstruct.length );
    //let index = this.array.toConstruct[rand];
    //let vec = this.convertIndex( index );
    let vec = createVector( 5, 6 );
    let index = this.convertGrid( vec );
    this.array.plot[vec.y][vec.x].setStatus( 1 );
    this.array.enclave.push( new enclave( this.var.enclave, index ) );
    console.log(vec.y, vec.x, index);
    this.setHorizon( this.var.enclave, index );

    this.addNeighbor( this.var.enclave, index );
    this.var.enclave++;
  }

  setHorizon( enclaveIndex, plotIndex ){
    let enclave = this.array.enclave[enclaveIndex];
    let plotVec = this.convertIndex( plotIndex );
    let parity = ( plotVec.y % 2 );

    for( let i = 0; i < this.array.neighbor[parity].length; i++ ){
      let vec = plotVec.copy();
      vec.add( this.array.neighbor[parity][i] );
      let expandIndex = this.convertGrid( vec );

      if( this.checkPlot( vec ) )
        enclave.array.horiznot[i].push( expandIndex );
    }
  }

  expandHorizon(  ){
    let enclaveIndex = 0;
    let array = [];
    let enclave = this.array.enclave[enclaveIndex];
    let orientation = Math.floor( Math.random() * this.const.o );
    for( let i = 0; i < enclave.array.horiznot[orientation].length; i++ )
      array.push( enclave.array.horiznot[orientation][i] )

    //change status for plots of current horiznot
    for( let i = 0; i < enclave.array.horiznot[orientation].length; i++ ){
      let expandIndex = enclave.array.horiznot[orientation][i];
      let vec = this.convertIndex( expandIndex );
      this.array.plot[vec.y][vec.x].setStatus( 2 );
    }

    //remove all selected plots from current horiznot
    for( let l = 0; l < array.length; l++ )
      for( let i = 0; i < enclave.array.horiznot.length; i++ )
        for( let j = 0; j < enclave.array.horiznot[i].length; j++ )
          if( enclave.array.horiznot[i][j] === array[l] ){
            enclave.array.horiznot[i].splice( j, 1 );
            break;
          }

    //add new plots to all horiznots
    for( let i = 0; i < array.length; i++ )
      this.setHorizon( enclaveIndex, array[i] );

    console.log( array, enclave.array.horiznot )
  }

  addNeighbor( enclaveIndex, plotIndex ){
    let enclave = this.array.enclave[enclaveIndex];
    let vec = this.convertIndex( plotIndex );
    let orientation = 0;//Math.floor( Math.random() * this.const.o );
    let parity = ( vec.y % 2 );
    vec.add( this.array.neighbor[parity][orientation] );
    let addIndex = this.convertGrid( vec );

    for( let i = 0; i < enclave.array.horiznot[orientation].length; i++ )
      if ( enclave.array.horiznot[orientation][i] === addIndex )
        enclave.array.horiznot[orientation].splice( i, 1 );

    this.setHorizon( enclaveIndex, addIndex );
    this.array.plot[vec.y][vec.x].setStatus( 2 );
  }

  init(){
    this.offset = createVector( cellSize * 2, cellSize * 2 )
    this.const.r = this.const.a / ( Math.tan( Math.PI / 6 ) * 2 );

    this.initNeighbors();
    this.initPlots();
    this.initTeams();
    this.initEnclaves();
  }

  cleanPlots(){
    for( let i = 0; i < this.array.plot.length; i++ )
      for( let j = 0; j < this.array.plot[i].length; j++ )
          this.array.plot[i][j].setStatus( 0 );
  }

  addTeam( team ){
    if( team >= this.array.team.length )
      this.array.team.push( [] );
    if( team > this.array.team.length - 1)
      team = this.array.team.length  - 1;
    return team;
  }

  //find the grid coordinates by index
  convertIndex( index ){
    if( index == undefined )
      return null;

    let y = Math.floor( index / this.const.m );
    let x = index % this.const.m;
    return createVector( x, y );
  }

  //find the index coordinates by grid coordinates
  convertGrid( vec ){
    if( vec == undefined )
      return null;

    return vec.y * this.const.m + vec.x;
  }

  //is the Plot within the field
  checkBorder( grid ){
    let flag = true;

    if( grid.x < 0 || grid.y < 0 || grid.x > this.const.m - 1 || grid.y > this.const.n - 1 )
      flag = false;

    return flag;
  }

  checkPlot( grid ){
    let flag = this.checkBorder( grid );

    if( flag )
      flag = this.array.plot[grid.y][grid.x].var.free;

    return flag;
  }

  draw(){
    //this.cleanPlots();

    for( let i = 0; i < this.array.plot.length; i++ )
      for( let j = 0; j < this.array.plot[i].length; j++ ){
        this.array.plot[i][j].draw();
        }
  }
}
