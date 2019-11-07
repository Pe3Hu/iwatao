//
class battleGround{
  constructor(){
    this.const = {
      parties: 2,
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
      team: [],
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

  initTeams(){
    for( let i = 0; i < this.const.parties; i++ )
      this.array.team.push( [] );
  }

  initMeeples(){
    let target = 1;//this.array.cell[Math.floor(this.const.n / 2)][Math.floor(this.const.m / 2)].index;
    let grid = createVector( 0, 0 ) ;
    this.addMeeple( grid, 0 );
    grid = createVector( this.const.m - 1, 2 ) ;
    this.addMeeple( grid, 1 );
    /*grid = createVector( 0, this.const.n - 1 ) ;
    this.addMeeple( grid );
    grid = createVector( this.const.m - 1, this.const.n - 1 ) ;
    this.addMeeple( grid );
    grid = createVector( 0, 3 ) ;
    this.addMeeple( grid );
    grid = createVector( 4, 5 ) ;
    this.addMeeple( grid );*/

    this.array.meeple[0].setPriority( 1, this.array.meeple );
    console.log(   this.array.meeple[0] )
  /*  this.array.meeple[1].setPriority( 1, target );
    this.array.meeple[2].setPriority( 1, target );
    this.array.meeple[3].setPriority( 1, target );
    this.array.meeple[4].setPriority( 1, target );
    this.array.meeple[5].setPriority( 1, target );*/
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
    this.initTeams();
    this.initMeeples();
  }

  cleanCells(){
    for( let i = 0; i < this.array.cell.length; i++ )
      for( let j = 0; j < this.array.cell[i].length; j++ )
        if( this.array.cell[i][j].meeple != null )
          this.array.cell[i][j].setStatus( 0 );
  }

  addMeeple( grid, team ){
    let center = this.array.cell[grid.y][grid.x].center;
    let cell = grid.y * this.const.m + grid.x;
    this.array.meeple.push( new meeple( this.var.meeple, center, cell, team ) );
    this.array.cell[grid.y][grid.x].setStatus( 1 );
    this.array.cell[grid.y][grid.x].var.meeple = this.var.meeple;
    this.array.team[team].push( this.var.meeple );

    for( let i = 0; i < this.array.team.length; i++ )
      if( i != team )
        for( let j = 0; j < this.array.team[i].length; j++ ){
          let index = this.array.team[i][j];
          let meeple = this.array.meeple[index];
          meeple.addThreat( this.var.meeple );
        }

    this.var.meeple++;
  }

  moveMeeple( index ){
    let meeple = this.array.meeple[index];
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
    let orientation = ( meeple.var.orientation + meeple.array.way.length ) % meeple.array.way.length;
    let step = meeple.array.way[orientation].copy();
    step.div( meeple.var.speed.move * fr );

    for( let i = 0; i < meeple.array.dot.length; i++ ){
      let dot = meeple.array.dot[i];
      let d = meeple.center.dist( dot );
      if( d < min ){
        min = d;
        stage = i;
      }
    }

    switch ( stage ) {
      case 0:
        meeple.var.stage = 'beforeMid';
        meeple.center.add( step );
        previousCell.setStatus( 2 );
        nextCell.setStatus( 2 );
        nextCell.setMeeple( meeple.index );
        break;
      case 1:
        meeple.var.stage = 'afterMid';
        meeple.center.add( step );
        break;
      case 2:
        meeple.var.stage = 'atEnd';
        if( min > step.mag() )
          meeple.center.add( step );
        else{
          meeple.center =  meeple.array.dot[stage].copy();
          meeple.setCell( nextCell.index );
          meeple.setAction( 0 );
          meeple.var.stage = 'atBegin';
          previousCell.setMeeple( null );
          previousCell.setStatus( 0 );
        }
        break;
    }
    //console.log( meeple.index, ':', previousCell.index, '_', nextCell.index, '|', meeple.var.stage );
  }

  rotateMeeple( index ){
    let meeple = this.array.meeple[index];
    let cell = this.convertIndex( meeple.var.cell );
    let angle = Math.PI / 3 / fr / meeple.var.speed.rotate;
    let shift = 1;

    if( !meeple.var.clockwise )
      shift = -1;
    angle *= shift;
    this.array.cell[cell.y][cell.x].setStatus( 3 );

    if( meeple.var.timer < meeple.var.stop )
      //smooth rotation
      for( let i = 0; i < meeple.array.vertex.length; i++ ){
        meeple.array.vertex[i].rotate( angle );
        meeple.array.pointer[i].rotate( angle );
      }
    else{
      meeple.setAction( 0 );
      this.array.cell[cell.y][cell.x].setStatus( null );
      //fixing a new position
      meeple.var.orientation = ( meeple.var.orientation + shift + meeple.array.way.length ) % meeple.array.way.length;
      for( let i = 0; i < meeple.array.vertex.length; i++ ){
        meeple.array.pointer[i].rotate( -angle * meeple.var.stop );
        meeple.array.vertex[i].rotate( -angle * meeple.var.stop );
      }
    }

    meeple.var.timer++;
    //console.log( meeple.var.timer, meeple.var.stop, frameCount );
  }

  attackMeeple( index ){
    let meeple = this.array.meeple[index];
    let previous = this.convertIndex( meeple.var.cell );
    let previousCell = this.array.cell[previous.y][previous.x];
    let parity = ( previous.y % 2 );
    let way = this.array.neighbor[parity][meeple.var.orientation];
    let next = previous.copy();
    next.add( way );

    if ( !this.checkCell( next ) )
      return;

    let min = meeple.const.a * 4;
    let stage = 0;
    let orientation = ( meeple.var.orientation + meeple.array.way.length ) % meeple.array.way.length;
    let step = meeple.array.way[orientation].copy();
    step.div( meeple.var.speed.move * fr );

    for( let i = 0; i < meeple.array.dot.length; i++ ){
      let dot = meeple.array.dot[i];
      let d = meeple.center.dist( dot );
      if( d < min ){
        min = d;
        stage = i;
      }
    }
    meeple.var.stage = 'attack';

    switch ( stage ) {
      case 0:
        if( meeple.var.forward ){
          meeple.center.add( step );
          previousCell.setStatus( 4 );
        }
        else{
          if( min > step.mag() )
            meeple.center.sub( step );
          else{
            meeple.center =  meeple.array.dot[stage].copy();
            meeple.setAction( 0 );
            //previousCell.setStatus( 0 );
            meeple.var.stage = 'attack';
            meeple.var.forward  = true;
          }
        }
        break;
      case 1:
        if( meeple.var.forward )
          if( min > step.mag() )
            meeple.center.add( step );
          else{
             meeple.var.forward  = false;
             meeple.var.stage = 'retrun';
          }
        else
          meeple.center.sub( step );
        break;
    }
  }

  updateMeeples(){
    this.cleanCells();

    /*for( let i = 0; i < this.array.cell.length; i++ )
      for( let j = 0; j < this.array.cell[i].length; j++ )
        if( this.array.cell[i][j].meeple != null ){
          let status = 1;
          let index =  this.array.cell[i][j].meeple;
          if( this.array.meeple[index].status == 'move' )
            status = 2;
          this.array.cell[i][j].setStatus( status );
        }*/
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
    if( grid.x < 0 || grid.y < 0 || grid.x > this.const.m - 1 || grid.y > this.const.n - 1 )
      flag = false;
    return flag;
  }

  checkGoalAchievement( meeple ){
    let target = meeple.var.target;
    let cell = meeple.var.cell;
    let orientation = meeple.var.orientation;
    let vecT = this.convertIndex( target );
    let vecC = this.convertIndex( cell );
    let parity = ( vecC.y % 2 );
    let flag = false;
    vecC.add( this.array.neighbor[parity][orientation] );

    if( vecC.y == vecT.y &&
        vecC.x == vecT.x )
      flag = true;

    return flag;
  }

  checkTargetLife( meeple ){
    return true;
  }

  chooseNearest(){

  }

  takeTrack( meeple ){
    let end = meeple.var.target;
    let begin = meeple.var.cell;
    let marked = this.markGrid( begin, end );
    /*if( !marked ){
      meeple.setAction( 0 );
    }*/
    let nearests = this.paveWay( begin, end );
    let orientation = meeple.var.orientation;
    let grid = this.convertIndex( meeple.var.cell );
    let parity = grid.y % 2;
    let turns = {};

    for( let i = 0; i < this.array.neighbor[parity].length; i++ ){
        let neighbor = grid.copy();
        neighbor.add( this.array.neighbor[parity][i] );
        if( this.checkCell( neighbor ) ){
          let index = this.array.cell[neighbor.y][neighbor.x].index;
          let l = this.array.neighbor[parity].length;
          let rotates = ( i - orientation + l ) % l;
          if( rotates > l / 2 )
            rotates -= l;
          turns[index] = rotates;
        }
    }

    let min = this.array.neighbor[parity].length;
    let result = null;

    for( let i = 0; i < nearests.length; i++ ){
      let rotates = Math.abs( turns[nearests[i]] );
      if( min >= rotates ){
        min = turns[nearests[i]];
        result = nearests[i];
      }
    }

    if( min == 3 ){
      min = Math.floor( Math.random() * 2 ) * 2 - 1;
      console.log( '_______', min )
    }

    switch ( min ) {
      case 0:
        meeple.setAction( 1 );
        break;
      case 1:
      case 2:
        meeple.setAction( 2 );
        break;
      case -1:
      case -2:
        meeple.setAction( 3 );
        break;
    }
  }

  doStuff( index ){
    let meeple = this.array.meeple[index];
    let c = this.convertIndex( meeple.var.cell );
    let t = this.convertIndex( meeple.var.target );
    let status = this.array.cell[c.y][c.x].var.status;
    let target;
    let action = meeple.var.action;

    switch ( meeple.var.priority ) {
      case 'sleep':
        break;
      case 'convergence':
        if( action == 'waiting' )
          this.takeTrack( meeple );
        switch ( action ) {
          case 'clockwiseRotating':
            this.rotateMeeple( index, 1 );
            break;
          case 'counterClockwiseRotating':
            this.rotateMeeple( index, -1 );
            break;
          case 'moving':
            if( !this.checkCell( t ) )
              break;
            target = this.array.cell[t.y][t.x];
            if( this.checkGoalAchievement( meeple ) ){
              this.array.cell[c.y][c.x].setStatus( 1 );
              meeple.setPriority( 2 );
            }
            else
              this.moveMeeple( index );
            break;
        }
        break;
      case 'attack':
        if( !this.checkTargetLife( meeple ) ){
          console.log('life');
          this.array.cell[c.y][c.x].setStatus( 1 );
          meeple.setPriority( 0 );
        }
        else
          if( meeple.var.action == 'waiting' )
            meeple.setAction( 4 );
          else
            this.attackMeeple( index );
        break;
    }
      console.log( index, action, status )
  }

  markNeighbors( cell, wave, end ){
    let vec = this.convertIndex( cell );
    let parity = ( vec.y % 2 );

    for( let i = 0; i < this.array.neighbor[parity].length; i++ ){
      let grid = vec.copy();
      grid.add( this.array.neighbor[parity][i] );

      if( this.checkCell( grid ) )
        if( ( this.array.cell[grid.y][grid.x].var.free || this.array.cell[grid.y][grid.x].index == end ) &&
            this.array.cell[grid.y][grid.x].var.wave == null )
          this.array.cell[grid.y][grid.x].var.wave = wave + 1;
    }
  }

  markGrid( begin, end ){
    let gridB = this.convertIndex( begin );
    let flag = false;
    let wave = 0;
    let max = this.const.n + this.const.m;

    for( let i = 0; i < this.array.cell.length; i++ )
      for( let j = 0; j < this.array.cell[i].length; j++ )
        this.array.cell[i][j].var.wave = null;

    this.array.cell[gridB.y][gridB.x].var.wave = 0;
    this.markNeighbors( this.array.cell[gridB.y][gridB.x].index, wave, end );
    wave++;

    while( !flag && wave < max ){
      for( let i = 0; i < this.array.cell.length; i++ )
        for( let j = 0; j < this.array.cell[i].length; j++ )
          if( this.array.cell[i][j].var.free &&
              this.array.cell[i][j].var.wave == wave ){
            this.markNeighbors( this.array.cell[i][j].index, wave,end );
             if( this.array.cell[i][j].index == end )
              flag = true;
          }

      wave++;
      //console.log( 'wave number:', wave, flag, end )
    }
    return flag;
  }

  paveWay( begin, end ){
    let gridE = this.convertIndex( end );
    let flag = false;
    let wave = this.array.cell[gridE.y][gridE.x].var.wave;
    let cell = end;
    let paths = [[]];
    let nearests = [];

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
          if( this.array.cell[grid.y][grid.x].var.free &&
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

        while( wave > 1 ){
          let vec = this.convertIndex( cell );
          let parity = ( vec.y % 2 );
          wave--;

          for( let j = 0; j < this.array.neighbor[parity].length; j++ ){
            let grid = vec.copy();
            grid.add( this.array.neighbor[parity][j] );

            if( this.checkCell( grid ) )
              if( this.array.cell[grid.y][grid.x].var.free &&
                  this.array.cell[grid.y][grid.x].var.wave == wave ){
                let index = this.array.cell[grid.y][grid.x].index;
                paths[i].push( index );
                cell = index;
              }
          }
        }
      }

      let min = paths[0].length;

      for( let i = 0; i < paths.length; i++ )
        if( paths[i].length < min )
          min = paths[i].length;

      for( let i = paths.length - 1; i >= 0; i-- )
        if( paths[i].length > min )
          paths.splice( i, 1 );


      for( let i = 0; i < paths.length; i++ ){
          //reverse the path from beginning to end
          paths[i].reverse();
          //add meeple target cell
          paths[i].push( end );
          let flag = true;

          //formation of an array of options in the first step
          for( let j = 0; j < nearests.length; j++ )
            if( paths[i][0] == nearests[j] )
              flag = false;

          if( flag )
            nearests.push( paths[i][0] );
        }

      return nearests;
  }

  draw(){
    this.cleanCells();

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
