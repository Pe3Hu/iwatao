//
class forgottenLand{
  constructor(){
    this.const = {
      enclave: 6,
      n: 24,
      m: 24,
      k: 8,
      o: 6,
      a: cellSize * 0.5
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
      plot: [],
      hue: [],
      fib: []
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
                  this.array.toConstruct.push( index );
              }
      }
    }
  }

  initEnclaves(){
    for( let i = 0; i < this.const.enclave; i++ )
      this.addEnclave();
  }

  initHues(){
    this.array.hue = [
      52,
      122,
      192,
      262,
      297,
      332
    ];
  }

  init(){
    this.offset = createVector( cellSize * 2, cellSize * 2 )
    this.const.r = this.const.a / ( Math.tan( Math.PI / 6 ) * 2 );

    this.initHues();
    this.initNeighbors();
    this.initPlots();
    this.initEnclaves();
  }

  addEnclave(){
    let hue = this.array.hue[this.var.enclave];
    let rand = Math.floor( Math.random() * this.array.toConstruct.length );
    let index = this.array.toConstruct[rand]; //25
    let vec = this.convertIndex( index );
    let clockwise = true;
    let incline = 0;
    let type = 8;
    /*let vec = createVector( 5, 6 );
    let index = this.convertGrid( vec );*/
    this.array.plot[vec.y][vec.x].setStatus( 1, this.var.enclave, hue );
    this.array.plot[vec.y][vec.x].setType( type, incline, clockwise );
    this.array.enclave.push( new enclave( this.var.enclave, index ) );

    //console.log( this.var.enclave, 'enclave with vec:', vec.y, vec.x, 'index', index );

    this.setHorizon( this.var.enclave, index );
    this.addNeighbor( this.var.enclave, index );
/*
    let e = this.array.enclave[this.var.enclave];
    //form first exclusion zone for the new enclave
    let firstGap = [];
    for( let i = 0; i < e.array.plot.length; i++ ){
      firstGap.push( e.array.plot[i] );
      vec = this.convertIndex( e.array.plot[i] );
      let parity = ( vec.y % 2 );

      for( let j = 0; j < this.array.neighbor[parity].length; j++ ){
          let copy = vec.copy();
          copy.add( this.array.neighbor[parity][j] );
          let gapIndex = this.convertGrid( copy );
          firstGap.push( gapIndex );
      }
    }

    //expansion of the exclusion zone
    let secondGap = [];
    for( let i = 0; i < firstGap.length; i++ ){
      vec = this.convertIndex( firstGap[i] );
      let parity = ( vec.y % 2 );

      for( let j = 0; j < this.array.neighbor[parity].length; j++ ){
          let copy = vec.copy();
          copy.add( this.array.neighbor[parity][j] );
          let gapIndex = this.convertGrid( copy );
          secondGap.push( gapIndex );
      }
    }

    //remove used plots and their neighbors from toConstruct
    for( let i = 0; i < firstGap.length; i++ )
      for( let j = 0; j < this.array.toConstruct.length; j++ )
        if( firstGap[i] == this.array.toConstruct[j] ){
          this.array.toConstruct.splice( j, 1 );
          break;
        }

      //remove used plots and their neighbors from toConstruct
      for( let i = 0; i < secondGap.length; i++ )
        for( let j = 0; j < this.array.toConstruct.length; j++ )
          if( secondGap[i] == this.array.toConstruct[j] ){
            this.array.toConstruct.splice( j, 1 );
            break;
          }
*/
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

  expandHorizon( enclaveIndex ){
    let horiznots = [];
    let enclave = this.array.enclave[enclaveIndex];
    let orientations = [];
    let orientation = null;
    let hue = this.array.hue[enclaveIndex];

    for( let i = 0; i < enclave.array.horiznot.length; i++ ){
      //kick taken plots from horiznots
      for( let j = enclave.array.horiznot[i].length - 1; j > -1 ; j-- ){
        let vec = this.convertIndex( enclave.array.horiznot[i][j] );
        if( !this.array.plot[vec.y][vec.x].var.free )
          enclave.array.horiznot[i].splice( j, 1 );
        }

      //add to options if possible
      if( enclave.array.horiznot[i].length > 0 )
        orientations.push( i );
      }

    //no ways to expand
    if( orientations.length == 0 ){
      console.log( enclaveIndex, enclave.array.plot.length );
      return;
    }

    let rand = Math.floor( Math.random() * orientations.length );
    orientation = orientations[rand];

    for( let i = 0; i < enclave.array.horiznot[orientation].length; i++ ){
      let vec = this.convertIndex( enclave.array.horiznot[orientation][i] );
      if( this.array.plot[vec.y][vec.x].var.free )
        horiznots.push( enclave.array.horiznot[orientation][i] );
    }

    //change status for plots of current horiznot
    for( let i = 0; i < enclave.array.horiznot[orientation].length; i++ ){
      let expandIndex = enclave.array.horiznot[orientation][i];
      let vec = this.convertIndex( expandIndex );

      if( this.array.plot[vec.y][vec.x].var.free ){
        this.array.plot[vec.y][vec.x].setStatus( 2, enclaveIndex, hue );
        enclave.array.plot.push( this.array.plot[vec.y][vec.x].const.index );
      }
    }

    //remove all selected plots from current horiznot
    for( let l = 0; l < horiznots.length; l++ )
      for( let i = 0; i < enclave.array.horiznot.length; i++ )
        for( let j = 0; j < enclave.array.horiznot[i].length; j++ )
          if( enclave.array.horiznot[i][j] === horiznots[l] ){
            enclave.array.horiznot[i].splice( j, 1 );
            break;
          }

    //add new plots to all horiznots
    for( let i = 0; i < horiznots.length; i++ ){
      let vec = this.convertIndex( horiznots[i] );
      this.setHorizon( enclaveIndex, horiznots[i] );
    }

    //console.log( enclaveIndex, 'move to', orientation, enclave.array.plot.length, horiznots )
  }

  allHorizon(){
    for( let i = 0; i < this.array.enclave.length; i++ )
      this.expandHorizon( i );
  }

  addNeighbor( enclaveIndex, plotIndex ){
    let enclave = this.array.enclave[enclaveIndex];
    let vec = this.convertIndex( plotIndex );
    let orientation = Math.floor( Math.random() * this.const.o );
    let parity = ( vec.y % 2 );
    vec.add( this.array.neighbor[parity][orientation] );
    let addIndex = this.convertGrid( vec );
    let hue = this.array.hue[enclaveIndex];

    for( let i = 0; i < enclave.array.horiznot[orientation].length; i++ )
      if ( enclave.array.horiznot[orientation][i] === addIndex )
        enclave.array.horiznot[orientation].splice( i, 1 );

    this.setHorizon( enclaveIndex, addIndex );
    this.array.plot[vec.y][vec.x].setStatus( 2, enclaveIndex, hue );
    enclave.array.plot.push( this.array.plot[vec.y][vec.x].const.index );
  }

  cleanPlots(){
    for( let i = 0; i < this.array.plot.length; i++ )
      for( let j = 0; j < this.array.plot[i].length; j++ )
          this.array.plot[i][j].setStatus( 0 );
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
      for( let j = 0; j < this.array.plot[i].length; j++ )
        this.array.plot[i][j].draw( this.array.toConstruct );
  }
}
