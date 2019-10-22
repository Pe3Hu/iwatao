//
class battleGround{
  constructor(){
    this.const = {
      n: 9,
      m: 7,
      a: cellSize
    };
    this.var = {
      meeple: 0
    }
    this.array = {
      windRose: [ 'NNE', 'E', 'SSE', 'SSW', 'W', 'NNW' ],
      adjacency: [],
      action: {
        'past': [],
        'now': [],
        'future': []
      },
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
          let grid = createVector( j, i );
            vec.x += this.const.r * 2 * j;
            vec.y += this.const.a * 1.5 * i;
          if( i % 2 == 1 )
            vec.x += this.const.r;

          this.array.cell[i].push( new cell( index, vec, grid ) );
      }
    }
  }

  initMeeples(){
    let grid = createVector( 1, 1 ) ;
    this.addMeeple( grid );
    grid = createVector( 5, 3 ) ;
    this.addMeeple( grid );

    this.array.meeple[0].setPriority( 1 );
    this.array.meeple[0].var.target = this.const.n * this.const.m - 1;
    this.updateMeeples();
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

  init(){
    this.initNeighbors();
    this.initCells();
    this.initMeeples();
  }

  cleanCells(){
    for( let i = 0; i < this.array.cell.length; i++ )
      for( let j = 0; j < this.array.cell[i].length; j++ )
        if( this.array.cell[i][j].meeple != null )
          this.array.cell[i][j].setStatus( 0 );
  }

  addMeeple( grid ){
    let center = this.array.cell[grid.y][grid.x].center;
    let cell = grid.y * this.const.m + grid.x;
    this.array.meeple.push( new meeple( this.var.meeple, center, cell ) );
    this.array.cell[grid.y][grid.x].setStatus( 1 );
    this.array.cell[grid.y][grid.x].var.meeple = this.var.meeple;
    this.var.meeple++;
  }

  moveMeeple( index ){
    let meeple = this.array.meeple[index];
    meeple.setStatus( 1 );

    let previous = this.convertIndex( meeple.var.cell );
    let previousCell = this.array.cell[previous.y][previous.x];
    let parity = ( previous.y % 2 );
    let way = this.array.neighbor[parity][meeple.var.orientation];
    let next = previous.copy();
    next.add( way );


    if ( !this.checkCell( next ) )
      return;
    let nextCell = this.array.cell[next.y][next.x];
    let min = meeple.const.a * 4;
    let stage = 0;
    let step = meeple.array.way[meeple.var.orientation].copy();
    step.div( meeple.var.speed.move * fr );

    for( let i = 0; i < meeple.array.dot.length; i++ ){
      let dot = meeple.array.dot[i];
      let d = meeple.center.dist( dot );
      if( d < min ){
        min = d;
        stage = i;
      }
    }

    console.log( previousCell.index, '_', nextCell.index, min, stage );
    switch ( stage ) {
      case 0:
        meeple.var.stage = 'beforeMid';
        meeple.center.add( step );
        nextCell.setStatus( 1 );
        nextCell.setMeeple( meeple.index );
        break;
      case 1:
        meeple.var.stage = 'afterMid';
        meeple.center.add( step );
        previousCell.setStatus( 0 );
        break;
      case 2:
        meeple.var.stage = 'atEnd';
        if( min > step.mag() )
          meeple.center.add( step );
        else{
          meeple.setCell( nextCell.index );
          meeple.setStatus( 0 );
          meeple.var.stage = 'atBegin';
          previousCell.setMeeple( null );
        }
        break;
    }
  }

  rotateMeeple( index ){
    let meeple = this.array.meeple[index];
    let angle = Math.PI / 3 / fr / meeple.var.speed.rotate;
    let shift = 1;

    if( !meeple.var.clockwise )
      shift = -1;
    angle *= shift;

    if( meeple.var.timer < meeple.var.stop )
      //smooth rotation
      for( let i = 0; i < meeple.array.vertex.length; i++ )
        meeple.array.vertex[i].rotate( angle )
    else{
      meeple.setStatus( 0 );
      //fixing a new position
      meeple.var.orientation = ( meeple.var.orientation + shift ) % meeple.array.way.length;
      for( let i = 0; i < meeple.array.vertex.length; i++ )
        meeple.array.vertex[i].rotate( -angle * meeple.var.stop )
    }

    meeple.var.timer++;
    //console.log( meeple.var.timer, meeple.var.stop, frameCount );
  }

  updateMeeples(){
    this.cleanCells();

    for( let i = 0; i < this.array.cell.length; i++ )
      for( let j = 0; j < this.array.cell[i].length; j++ )
        if( this.array.cell[i][j].meeple != null ){
          let status = 1;
          let index =  this.array.cell[i][j].meeple;
          if( this.array.meeple[index].status == 'move' )
            status = 2;
          this.array.cell[i][j].setStatus( status );
        }
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

  checkCell( grid ){
    let flag = true;
    if( grid.x < 0 || grid.y < 0 || grid.x >= this.const.m  || grid.y >= this.const.n )
      flag = false;
    return flag;
  }

  chooseNearest(){

  }

  takeTrack( meeple ){
    let end = meeple.var.target;
    let begin = meeple.var.cell;
    this.markGrid( begin, end );

    let nearests = this.paveWay( begin, end );
    let orientation = meeple.var.orientation;
    let grid = this.convertIndex( meeple.var.cell );
    let parity = grid.y % 2;
    let turns = {};

    for( let i = 0; i < this.array.neighbor[parity].length; i++ ){
        let neighbor = grid.copy();
        neighbor.add( this.array.neighbor[parity][i] );
        let index = this.array.cell[neighbor.y][neighbor.x].index;
        let rotates = ( i - orientation ) % this.array.neighbor[parity].length;
        if( i > this.array.neighbor[parity].length / 2 )
          rotates -= this.array.neighbor[parity].length;
        turns[index] = rotates;
    }

    let min = this.array.neighbor[parity].length;
    let result = null;
    let action = null;

    for( let i = 0; i < nearests.length; i++ ){
      let rotates = Math.abs( turns[nearests[i]] );
      if( min > rotates ){
        min = rotates;
        result = nearests[i];
      }
    }

    if( min == 3 )
      min = Math.floor( Math.rand() * 2 - 1 );

    switch ( min ) {
      case 0:
        action = 'move';
        break;
      case 1:
      case 2:
        action = 'rotateClockwise';
        break;
      case -1:
      case -2:
        action = 'rotateCounterclockwise';
        break;
    }

    return action;
  }

  doStuff( index ){
    let meeple = this.array.meeple[index];

    switch ( meeple.priority ) {
      case 'sleep':
        break;
      case 'convergence':
        let action = meeple.var.action;

        if( action == 'wait' )
          action = this.takeTrack( meeple );;

        switch ( action ) {
          case 'rotateClockwise':
            this.rotateMeeple( index, 1 );
            break;
          case 'rotateCounterclockwise':
            this.rotateMeeple( index, -1 );
            break;
          case 'move':
            this.moveMeeple( index );
            break;
        }
        break;
    }
  }

  markNeighbors( cell, wave ){
    let vec = this.convertIndex( cell );
    let parity = ( vec.y % 2 );

    for( let i = 0; i < this.array.neighbor[parity].length; i++ ){
      let grid = vec.copy();
      grid.add( this.array.neighbor[parity][i] );

      if( this.checkCell( grid ) )
        if( this.array.cell[grid.y][grid.x].var.meeple == null &&
            this.array.cell[grid.y][grid.x].var.wave == null )
              this.array.cell[grid.y][grid.x].var.wave = wave + 1;
    }
  }

  markGrid( begin, end ){
    let gridB = this.convertIndex( begin );
    let flag = false;
    let wave = 0;

    this.array.cell[gridB.y][gridB.x].var.wave = 0;
    this.markNeighbors( this.array.cell[gridB.y][gridB.x].index, wave );
    wave++;

    while( !flag && wave < 100 ){
      for( let i = 0; i < this.array.cell.length; i++ )
        for( let j = 0; j < this.array.cell[i].length; j++ )
          if( this.array.cell[i][j].var.meeple == null &&
              this.array.cell[i][j].var.wave == wave ){
            this.markNeighbors( this.array.cell[i][j].index, wave );
            if( this.array.cell[i][j].index == end )
              flag = true;
          }
      wave++;
    }
  }

  paveWay( begin, end ){
    let gridE = this.convertIndex( end );
    let flag = false;
    let wave = this.array.cell[gridE.y][gridE.x].var.wave;
    let cell = end;
    let paths = [[]];
    let firstSteps = [];

    //initiate all possible paths
    while( wave > 0  ){
      let vec = this.convertIndex( cell );
      let parity = ( vec.y % 2 );
      wave--;
      let choises = 0;

      for( let i = 0; i < this.array.neighbor[parity].length; i++ ){
        let grid = vec.copy();
        grid.add( this.array.neighbor[parity][i] );

        if( this.checkCell( grid ) )
          if( this.array.cell[grid.y][grid.x].var.meeple == null &&
              this.array.cell[grid.y][grid.x].var.wave == wave ){
            if( choises > 0 ){
              let array = [];
              for( let j = 0; j < paths[paths.length - 1].length - 1; j++ )
                array.push( paths[paths.length - 1][j] );
              paths.push( array );
            }
            let index = this.array.cell[grid.y][grid.x].index;
            paths[paths.length - 1].push( index );
            cell = index;
            choises++;
          }
      }
    }

    //finish the paths from the fork to their start
    for( let i = 0; i < paths.length; i++ )
      if( paths[i].length < this.array.cell[gridE.y][gridE.x].var.wave - 1 ){
        cell = paths[i][paths[i].length - 1];
        let grid = this.convertIndex( cell );
        wave = this.array.cell[grid.y][grid.x].var.wave;

        while( wave > 0  ){
          let vec = this.convertIndex( cell );
          let parity = ( vec.y % 2 );
          wave--;

          for( let j = 0; j < this.array.neighbor[parity].length; j++ ){
            let grid = vec.copy();
            grid.add( this.array.neighbor[parity][j] );

            if( this.checkCell( grid ) )
              if( this.array.cell[grid.y][grid.x].var.meeple == null &&
                  this.array.cell[grid.y][grid.x].var.wave == wave ){
                let index = this.array.cell[grid.y][grid.x].index;
                paths[i].push( index );
                cell = index;
              }
          }
        }
      }

    //reverse the path from beginning to end
    for( let i = 0; i < paths.length; i++ ){
      paths[i].reverse();
      paths[i].push( end );
      let flag = true;

      //formation of an array of options in the first step
      for( let j = 0; j < firstSteps.length; j++ )
        if( paths[i][0] == firstSteps[j] )
          flag = false;

      if( flag )
        firstSteps.push( paths[i][0] );
    }

    return firstSteps;
  }

  draw(){
    this.updateMeeples();

    for( let i = 0; i < this.array.cell.length; i++ )
      for( let j = 0; j < this.array.cell[i].length; j++ ){
        this.array.cell[i][j].draw();
        let meeple = this.array.cell[i][j].var.meeple;
        let cell = this.array.cell[i][j].index;
        if( meeple != null ){
          this.doStuff( meeple );
          this.array.meeple[meeple].draw();
        }
      }
  }
}
