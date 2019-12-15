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
      meeple: 0,
      endGame: false
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
    this.const.r = this.const.a / ( Math.tan( Math.PI / 6 ) * 2 );

    //this.init();
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
    let target = 1;//this.array.cell[Math.floor(this.const.n / 2)][Math.floor(this.const.m / 2)].const.index;
    let grid = createVector( 0, 0 );
    this.addMeeple( grid, 0 );
    grid = createVector( 6, 2 );
    this.addMeeple( grid, 1 );
    grid = createVector( 2, 3 );
    this.addMeeple( grid, 1 );
    grid = createVector( this.const.m - 1, this.const.n - 1 ) ;
    this.addMeeple( grid, 0 );
    /*grid = createVector( 4, 5 );
    this.addMeeple( grid, 1 );
    grid = createVector( 0, this.const.n - 1 ) ;
    this.addMeeple( grid, 1 );
    grid = createVector( this.const.m - 1, this.const.n - 1 ) ;
    this.addMeeple( grid );
    grid = createVector( 0, 3 ) ;
    this.addMeeple( grid );
    grid = createVector( 4, 5 ) ;
    this.addMeeple( grid );*/

    //this.array.meeple[0].var.stopped = true;
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

  addTeam( team ){
    if( team >= this.array.team.length )
      this.array.team.push( [] );
    if( team > this.array.team.length - 1)
      team = this.array.team.length  - 1;
    return team;
  }

  addMeeple( grid, team ){
    let center = this.array.cell[grid.y][grid.x].var.center;
    let cell = grid.y * this.const.m + grid.x;

    team = this.addTeam( team );
    this.array.team[team].push( this.var.meeple );

    this.array.meeple.push( new meeple( this.var.meeple, center, cell, team ) );
    this.array.cell[grid.y][grid.x].setStatus( 1 );
    this.array.cell[grid.y][grid.x].var.meeple = this.var.meeple;

    let newbie = this.array.meeple[this.var.meeple];

    for( let i = 0; i < this.array.team.length; i++ )
      if( i != team )
        for( let j = 0; j < this.array.team[i].length; j++ ){
          let index = this.array.team[i][j];
          let meeple = this.array.meeple[index];
          meeple.addThreat( this.var.meeple );
          newbie.addThreat( index );
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
      let d = meeple.var.center.dist( dot );
      if( d < min ){
        min = d;
        stage = i;
      }
    }

    switch ( stage ) {
      case 0:
        meeple.var.stage = 'beforeMid';
        meeple.var.center.add( step );
        previousCell.setStatus( 2 );
        nextCell.setStatus( 2 );
        nextCell.setMeeple( meeple.const.index );
        meeple.setNext( nextCell.const.index );
        break;
      case 1:
        meeple.var.stage = 'afterMid';
        meeple.var.center.add( step );
        break;
      case 2:
        meeple.var.stage = 'atEnd';
        if( min >= step.mag() )
          meeple.var.center.add( step );
        else{
          meeple.var.center =  meeple.array.dot[stage].copy();
          meeple.setCell( nextCell.const.index );
          meeple.setAction( 0 );
          meeple.var.stage = 'atBegin';
          previousCell.setStatus( 0 );
          previousCell.setMeeple( null );
          meeple.setNext( null );
          //meeple.selectTarget( this.array.meeple );
          console.log( index, 'stage', meeple.var.stage, 'cell', meeple.var.cell, 'In', meeple.var.movesIn );
        }
        break;
    }

    //console.log( meeple.const.index, ':', previousCell.const.index, '_', nextCell.const.index, '|', meeple.var.stage );
  }

  rotateMeeple( index ){
    let meeple = this.array.meeple[index];
    let cell = this.convertIndex( meeple.var.cell );
    let angle = Math.PI / 3 / fr / meeple.var.speed.rotate;
    let shift = 1;

    if( !meeple.var.clockwise )
      shift = -1;
    angle *= shift;

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
  }

  attackMeeple( index, last ){
    let meeple = this.array.meeple[index];
    let min = meeple.const.a * 4;
    let stage = 0;
    let orientation = ( meeple.var.orientation + meeple.array.way.length ) % meeple.array.way.length;
    let step = meeple.array.way[orientation].copy();
    step.div( meeple.var.speed.move * fr );

    for( let i = 0; i < meeple.array.dot.length; i++ ){
      let dot = meeple.array.dot[i];
      let d = meeple.var.center.dist( dot );
      if( d < min ){
        min = d;
        stage = i;
      }
    }

    if( meeple.var.stage == 'atBegin' ){
      console.log('_____________first____________');
      meeple.var.stage = 'lunge';
    }

    switch ( stage ) {
      case 0:
        if( meeple.var.forward )
          meeple.var.center.add( step );
        else
          if( min > step.mag() )
            meeple.var.center.sub( step );
          else{
              meeple.makeDamage( this.array.meeple );
              meeple.var.center = meeple.array.dot[stage].copy();
              meeple.setAction( 0 );
              meeple.var.stage = 'lunge';
              meeple.var.forward = true;
            }
        break;
      case 1:
        if( meeple.var.forward )
          if( min > step.mag() )
            meeple.var.center.add( step );
          else{
            meeple.var.stage = 'retrun';
            meeple.var.forward = false;
          }
        else
          meeple.var.center.sub( step );
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

  //is the cell within the field
  checkCell( grid ){
    let flag = true;

    if( grid.x < 0 || grid.y < 0 || grid.x > this.const.m - 1 || grid.y > this.const.n - 1 )
      flag = false;

    return flag;
  }

  checkGoalAchievement( meeple ){
    let target = meeple.var.target;
    let targetCell = this.array.meeple[target].var.cell;
    //if target moving
    if( this.array.meeple[target].var.movesIn != null )
      targetCell = this.array.meeple[target].var.movesIn;

    let nextCell = meeple.var.cell;
    let vecT = this.convertIndex( targetCell );
    let vecN = this.convertIndex( nextCell );
    let orientation = meeple.var.orientation;
    let parity = ( vecN.y % 2 );
    let flag = false;
    vecN.add( this.array.neighbor[parity][orientation] );

    if( vecN.y == vecT.y &&
        vecN.x == vecT.x )
      flag = true;

    //console.log( flag, 'meeple:', meeple.const.index, 'target:', target, 'c:', vecN.y, vecN.x, 't:', vecT.y, vecT.x )
    return flag;
  }

  checkTargetLife( meeple ){
    let victim = this.array.meeple[meeple.var.target];
    let flag = false;
    if( victim.array.bar[0].points.current == 0 ){
      this.murderMeeple( meeple.var.target );
      flag = true;
    }
    return flag;
  }

  chooseNearest(){

  }

  takeTrack( meeple ){
    let target = meeple.var.target;
    let end = this.array.meeple[target].var.cell;
/*
    //if target moving
    if( this.array.meeple[target].var.movesIn != null )
      end = this.array.meeple[target].var.movesIn;
*/
    //console.log('meeple', meeple.const.index, 'from',meeple.var.cell, 'to',this.array.meeple[target].var.cell, this.array.meeple[target].var.movesIn)
    let begin = meeple.var.cell;
    let marked = this.markGrid( begin, end );

    //slow mode
    /*if(!marked)
      return;*/

    let nearests = this.paveWay( begin, end );
    let orientation = meeple.var.orientation;
    let grid = this.convertIndex( meeple.var.cell );
    let parity = grid.y % 2;
    let turns = {};

    for( let i = 0; i < this.array.neighbor[parity].length; i++ ){
        let neighbor = grid.copy();
        neighbor.add( this.array.neighbor[parity][i] );
        if( this.checkCell( neighbor ) ){
          let index = this.array.cell[neighbor.y][neighbor.x].const.index;
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
      if( begin.y == 0 )
        min = -1;
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
    //console.log(meeple.const.index, meeple.var.cell, '_|_',min, result, nearests, meeple.var.action)
  }

  doStuff( index ){
    let meeple = this.array.meeple[index];
    let targetCell = this.array.meeple[meeple.var.target].var.cell;

    //if target moving
    if( this.array.meeple[meeple.var.target].var.movesIn != null )
      targetCell = this.array.meeple[meeple.var.target].var.movesIn;

    let c = this.convertIndex( meeple.var.cell );
    let t = this.convertIndex( targetCell );
    let cell = this.array.cell[c.y][c.x];
    let status = cell.var.status;
    let action = meeple.var.action;
    let target;
    let last;

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

            /*console.log( index, targetCell,  meeple.var.target,
              this.array.cell[t.y][t.x].var.free, this.array.cell[t.y][t.x].const.index,
              meeple.var.movesIn )*/

            /*if( meeple.var.movesIn == null )
              this.takeTrack( meeple );*/

            if( this.checkGoalAchievement( meeple ) )
              cell.setStatus( 1 );
            else
              this.moveMeeple( index );
            break;
        }
        break;
      case 'attack':
        if( !this.checkTargetLife( meeple ) )
          if( meeple.var.action == 'waiting' )
            meeple.setAction( 4 );
          else
            this.attackMeeple( index );
        else{
          console.log('______________kill_____________');
          meeple.setAction( 0 );
        }
        break;
    }
  }

  markNeighbors( cell, wave, end ){
    let vec = this.convertIndex( cell );
    let gridE = this.convertIndex( end );
    let parity = ( vec.y % 2 );
    let flag = false;

    for( let i = 0; i < this.array.neighbor[parity].length; i++ ){
      let grid = vec.copy();
      grid.add( this.array.neighbor[parity][i] );

      if( this.checkCell( grid ) ){
        if( ( this.array.cell[grid.y][grid.x].var.free ||
              this.array.cell[grid.y][grid.x].const.index == end ) &&
              this.array.cell[grid.y][grid.x].var.wave == null )
                this.array.cell[grid.y][grid.x].var.wave = wave + 1;

        if( this.array.cell[grid.y][grid.x].const.index == end )
          flag = true;
      }

    }

    return flag;
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
    flag = this.markNeighbors( this.array.cell[gridB.y][gridB.x].const.index, wave, end );
    wave++;

    while( !flag && wave < max ){
      for( let i = 0; i < this.array.cell.length; i++ )
        for( let j = 0; j < this.array.cell[i].length; j++ )
          if( this.array.cell[i][j].var.free &&
              this.array.cell[i][j].var.wave == wave )
            flag = this.markNeighbors( this.array.cell[i][j].const.index, wave,end );

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
    //console.log( begin )

    //initiate all possible paths
    while( wave > 0 ){
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
            let index = this.array.cell[grid.y][grid.x].const.index;
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
                let index = this.array.cell[grid.y][grid.x].const.index;
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

  stickScheme( index ){
    let meeple = this.array.meeple[index];
    let action = meeple.var.action;

    if( !meeple.isAlive() )
      return;

    //console.log(index, meeple.var.status, meeple.var.priority, meeple.var.action )

    switch ( meeple.var.scheme ) {
      case 'killAllEnemies':
        switch ( meeple.var.status ) {
          case 'frozen':
          case 'enemyEliminated':
            meeple.setStatus( 1, this.array.meeple );
            break;
          case 'onWay':
            if( this.checkGoalAchievement( meeple ) )
              meeple.setStatus( 2 );
            break;
          case 'atЕheReady':
            if( this.checkTargetLife( meeple ) )
              meeple.setStatus( 3 );
            break;
            break;
          case 'victory':
            this.var.endGame = true;
            break;
        }
        break;
    }

    this.doStuff( index );
  }

  murderMeeple( index ){
    let murdredMeeple = this.array.meeple[index];
    let team = murdredMeeple.const.team;

    for( let i = 0; i < this.array.team.length; i++ )
      if( i != team )
        for( let j = 0; j < this.array.team[i].length; j++ ){
          let id = this.array.team[i][j];
          let meeple = this.array.meeple[id];
          meeple.removeThreat( index );
        }

  }

  draw(){
    this.cleanCells();

    for( let i = 0; i < this.array.cell.length; i++ )
      for( let j = 0; j < this.array.cell[i].length; j++ ){
        this.array.cell[i][j].draw();
        let index = this.array.cell[i][j].var.meeple;
        if( index != null ){
          if( !this.var.endGame )
            this.stickScheme( index );
        this.array.meeple[index].draw();
        }
      }
  }
}
