//
class forgottenLand{
  constructor(){
    this.const = {
      parties: 6,
      n: 24,
      m: 24,
      k: 16,
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

          if( i >= this.const.n / this.const.k && i < this.const.n * 7 / 8 &&
              j >= this.const.m / this.const.k && j < this.const.m * 7 / 8 ){
                let flag = true;
                if( i >= this.const.n * 3 / 8 && i < this.const.n * 5 / 8 &&
                    j >= this.const.m * 3 / 8 && j < this.const.m * 5 / 8 )
                    flag = false;
                if( flag )
                this.array.plot[i][j].setStatus(1);
              }
          //this.array.toConstruct.push( index );

      }
    }
  }

  initTeams(){
    for( let i = 0; i < this.const.parties; i++ )
      this.array.team.push( [] );
  }

  initEnclaves(){

  }

  addEnclave( grid ){

  }

  addNeighbor( plot ){

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
  checkPlot( grid ){
    let flag = true;

    if( grid.x < 0 || grid.y < 0 || grid.x > this.const.m - 1 || grid.y > this.const.n - 1 )
      flag = false;

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
