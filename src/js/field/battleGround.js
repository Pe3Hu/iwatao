//
class battleGround{
  constructor(){
    this.const = {
      n: 4,
      m: 5,
      a: cellSize
    };
    this.var = {
      meeple: 0
    }
    this.array = {
      windRose: [ 'NNE', 'E', 'SSE', 'SSW', 'W', 'NNW' ],
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
    this.addMeeple( grid );
    grid = createVector( 3, 3 ) ;
    this.addMeeple( grid );

    this.array.meeple[0].setStatus( 1, true );
    this.array.meeple[0].setPriority( 1 );

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
    this.initCells();
    this.initMeeples();
    this.initNeighbors();
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
      if( meeple.status == 'wait' )
        return;

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

    //console.log( previousCell.index, '_', nextCell.index, min, stage );
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
        break;
      case 2:
        meeple.var.stage = 'atEnd';
        if( min > step.mag() )
          meeple.center.add( step );
        else{
          meeple.setCell( nextCell.index );
          meeple.status = 'wait';
          meeple.var.stage = 'atBegin';
          previousCell.setStatus( 0 );
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

  checkCell( grid ){
    let flag = true;
    if( grid.x < 0 || grid.y < 0 || grid.x >= this.const.m  || grid.y >= this.const.n )
      flag = false;
    return flag;
  }

  doStuff( m ){
    let meeple = this.array.meeple[m];

    /*switch ( meeple.status ) {
      case 'wait':
        break;
      case 'move':
        this.moveMeeple( index );
        break;
      case 'rotate':
        this.rotateMeeple( index );
        break;
      case 'attack':
        this.attackMeeple( index );
        break;
    }*/

    switch ( meeple.priority ) {
      case 'sleep':
        break;
      case 'convergence':
        this.moveMeeple( m );
        if( meeple.status == 'wait' )
          meeple.setStatus( 1 );
        break;
    }
  }

  paveWay( meeple, end ){

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
