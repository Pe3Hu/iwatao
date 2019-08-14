//detail from which game items are created
//деталь taipitopito
class tptpt {
  constructor ( index, ){
    this.index = index;
    this.const = {
      pika: {
        x: 8,
        y: 8
      },
      edge: {
        x: 4,
        y: 6
      }
    };
    this.array = {
      pika: [],
      edge: [],
      freeEdge: []
    };
    this.offset = createVector();
    this.leftAngle = createVector();
    this.status = 'wait';

    this.initPikas();
    this.initEdges();
  }

  //set array of pika
  initPikas(){
    for (let i = 0; i < this.const.pika.x; i++){
      this.array.pika.push([]);
      for (let j = 0; j < this.const.pika.y; j++){
        //add pika
        let index = this.const.pika.x * i + j;
        let center = createVector( cellSize * ( j + 0.5 ), cellSize * ( i + 0.5 ));
        let aNum = ( i + j ) % daoNum;
        this.array.pika[i].push( new pika( index, center, aNum ) );

        //clean angles
        if ( i == 0 ||
          j == 0 ||
          i == this.const.pika.x - 1 ||
          j == this.const.pika.y - 1 )
          this.array.pika[i][j].setStatus( 0 );
        }
      }
  }

  //set array of edge
  initEdges(){
    for (let i = 0; i < this.const.edge.x; i++)  {
      this.array.edge.push([]);
      for (let j = 0; j < this.const.edge.y; j++) {
        let index;
        switch ( i ) {
          case 0:
           index = j + 1;
           break;
          case 1:
           index = this.const.pika.x * ( j + 2 ) - 1;
           break;
          case 2:
           index = this.const.pika.x * this.const.pika.y - j - 2;
           break;
          case 3:
           index = this.const.pika.x * ( this.const.pika.y - j - 2 );
           break;
        }
      this.array.edge[i].push( index );
      this.array.freeEdge.push( index );
      }
    }
  }

  //generate a random arrangement for a given quantity of pika
  addRandPikaEdge( max ){
    //overload check
    if ( max > this.array.freeEdge.length )
      max = this.array.freeEdge.length;

    for (let i = 0; i < max; i++){
      let rand = Math.floor( Math.random() * this.array.freeEdge.length );
      let x = this.array.freeEdge[rand] % this.const.pika.x;
      let y = Math.floor( this.array.freeEdge[rand] / this.const.pika.x );
      this.array.pika[x][y].setStatus( 2 );
      this.array.freeEdge.splice( rand, 1 );
    }
  }

  check(){
    let x = mouseX - this.offset.x;
    let y = mouseY - this.offset.y;
    if( x > 0 &&
        y > 0 &&
        x < this.const.pika.x * cellSize &&
        y < this.const.pika.y * cellSize ){
      x = Math.floor( x / cellSize );
      y = Math.floor( y / cellSize );
      this.detectShift( x, y );
      this.detectRotation( x, y );
    }
  }

  detectShift( x, y ){
    if( x == 7 && ( !this.array.pika[y][x].status == 'selected' ) && ( this.array.pika[y][0].status == 'selected' ))
      this.shift( 'row', y, true );
    if( x == 0 && ( !this.array.pika[y][x].status == 'selected' ) && ( this.array.pika[y][7].status == 'selected' ))
      this.shift( 'row', y, false );
    if( y == 7 && ( !this.array.pika[y][x].status == 'selected' ) && ( this.array.pika[0][x].status == 'selected' ))
      this.shift( 'col', x, true );
    if( y == 0 && ( !this.array.pika[y][x].status == 'selected' ) && ( this.array.pika[7][x].status == 'selected' ))
      this.shift( 'col', x, false );
  }

  detectRotation( x, y ){
    if( x == 0 && y == 0 )
      this.rotation( false );
    if( x == 7 && y == 0 )
      this.rotation( true );
  }

  shift( str, num, clockwise){
    switch ( str ) {
      case 'row':
      if ( clockwise ){
        this.array.pika[num][this.const.pika.x - 1].setStatus( 2 );
        for (let j = this.const.pika.x - 1; j > 0; j--)
          this.array.pika[num][j].setType( this.array.pika[num][j - 1].aspect.num );
        this.array.pika[num][0].setType( 9 );
      }
      else {
        this.array.pika[num][0].setStatus( 2 );
        for (let j = 0; j < this.const.pika.x - 1; j++)
          this.array.pika[num][j].setType( this.array.pika[num][j + 1].aspect.num );
        this.array.pika[num][this.const.pika.x - 1].setType( 9 );
      }
      break;
    case 'col':
      if ( clockwise ){
        this.array.pika[this.const.pika.y - 1][num].setStatus( 2 );
        for (let i = this.const.pika.y - 1; i > 0; i--)
          this.array.pika[i][num].setType( this.array.pika[i - 1][num].aspect.num );
        this.array.pika[0][num].setType( 9 );
      }
      else {
        this.array.pika[0][num].setStatus( 2 );
        for (let i = 0; i < this.const.pika.y - 1; i++)
          this.array.pika[i][num].setType( this.array.pika[i + 1][num].aspect.num );
        this.array.pika[this.const.pika.y - 1][num].setType( 9 );
      }
      break;
    }
  }

  rotation( clockwise ){
    if ( clockwise ){
      for (let i = 0; i < this.const.pika.y / 2; i++)
        for (let j = i; j < this.const.pika.x - 1 - i; j++){
          let temp = new pika();
          temp.setVars( this.array.pika[i][j] );
          let current = createVector( i, j );
          let next = createVector( j, 7 - i  );
          this.array.pika[current.x][current.y].setVars( this.array.pika[next.x][next.y] );
          current = next.copy();
          next.set( 7 - i, 7 - j );
          this.array.pika[current.x][current.y].setVars( this.array.pika[next.x][next.y] );
          current = next.copy();
          next.set( 7 - j, i );
          this.array.pika[current.x][current.y].setVars( this.array.pika[next.x][next.y] );
          current = next.copy();
          this.array.pika[current.x][current.y].setVars( temp );
          }
    }
    else {
    for (let i = 0; i < this.const.pika.y / 2; i++)
      for (let j = i; j < this.const.pika.x - 1 - i; j++){
        let temp = new pika();
        temp.setVars( this.array.pika[i][j] );
        let current = createVector( i, j );
        let next = createVector( 7 - j, i );
        this.array.pika[current.x][current.y].setVars( this.array.pika[next.x][next.y] );
        current = next.copy();
        next.set( 7 - i, 7 - j );
        this.array.pika[current.x][current.y].setVars( this.array.pika[next.x][next.y] );
        current = next.copy();
        next.set( j, 7 - i  );
        this.array.pika[current.x][current.y].setVars( this.array.pika[next.x][next.y] );
        current = next.copy();
        this.array.pika[current.x][current.y].setVars( temp );
        }
      }
    }

  setOffset( offset ){
    this.offset = offset;
  }

  setLeftAngle( leftAngle ){
    this.leftAngle = leftAngle;
  }

  setStatus( stat ){
    switch ( stat ) {
      //do not show
      case 0:
        this.status = 'wait';
        break;
      //show as an option
      case 1:
        this.status = 'view';
        break;
      //show as selected
      case 2:
        this.status = 'edit';
        break;
    }
  }

  draw(){
    if( this.status != 'wait' )
      for (let i = 0; i < this.array.pika.length; i++)
        for (let j = 0; j < this.array.pika[i].length; j++)
          this.array.pika[i][j].draw( this.leftAngle );
  }
}
