//universal component of the ship
class module {
  constructor( index, type, grade ){
    this.index = index;
    this.const = {
      a: cellSize / 2,
      type: type,
      block: {
        x: type * 2,
        y: type * 2
      },
      edge: {
        i: 4,
        j: ( type - 1 ) * 2
      },
      m: 4
    };
    this.array = {
      gate: [ [], [], [], [] ],
      freeCorner: [],
      freeEdge: [],
      corner: [],
      block: [],
      edge: []
    };
    this.status = 'wait';
    this.offset = createVector();
    this.joint = null;

    this.init();

    this.pick( grade );
  }

  init(){
    this.initBlocks();
    this.initEdges();
    this.initCorners();
  }

  //set array of block
  initBlocks(){
    for (let i = 0; i < this.const.block.x; i++){
      this.array.block.push([]);
      for (let j = 0; j < this.const.block.y; j++){
        //add block
        let index = this.const.block.x * i + j;
        let center = createVector( this.const.a * ( j + 0.5 ), this.const.a * ( i + 0.5 ));
        let scale = 0.5;
        let partition = this.calculatePartition( i, j );
        this.array.block[i].push( new block( index, center, scale ) );
        this.array.block[i][j].setPartition( partition );
        }
      }
  }

  //set array of edge indexs
  initEdges(){
    for (let i = 0; i < this.const.edge.i; i++)  {
      this.array.edge.push([]);
      for (let j = 0; j < this.const.edge.j; j++) {
        let index;
        switch ( i ) {
          case 0:
           index = j + 1;
           break;
          case 1:
           index = this.const.block.x * ( j + 2 ) - 1;
           break;
          case 2:
           index = this.const.block.x * this.const.block.y - j - 2;
           break;
          case 3:
           index = this.const.block.x * ( this.const.block.y - j - 2 );
           break;
        }
      this.array.edge[i].push( index );
      this.array.freeEdge.push( index );
      }
    }
  }

  //set array of corner indexs
  initCorners(){
    this.array.freeCorner.push( 0 );
    this.array.freeCorner.push( this.const.block.x - 1 );
    this.array.freeCorner.push( this.const.block.x * this.const.block.y - 1 );
    this.array.freeCorner.push( this.const.block.x * ( this.const.block.y - 1 ) );
  }

  //generate the module in accordance with grade
  pick( grade ){
    switch ( grade ) {
      case 0:
        this.addGateway( 0 );
        break;
      case 1:
        this.addGateway( 1 );
        break;
      case 2:
        this.addGateway( 0 );
        this.addGateway( 0 );
        break;
      case 3:
        this.addGateway( 0 );
        this.addGateway( 1 );
        break;
      case 4:
        this.addGateway( 1 );
        this.addGateway( 1 );
        break;
      case 5:
        this.addGateway( 2 );
        break;
      case 6:
        if( this.const.type == 1 )
          this.addGateway( 6 );
        else
          this.addGateway( 3 );
        break;
      case 7:
        this.addGateway( 0 );
        this.addGateway( 0 );
        this.addGateway( 0 );
        break;
      case 8:
        this.addGateway( 1 );
        this.addGateway( 0 );
        this.addGateway( 0 );
        break;
      case 9:
        this.addGateway( 2 );
        this.addGateway( 0 );
        break;
      case 10:
        this.addGateway( 3 );
        this.addGateway( 0 );
        break;
      case 11:
        this.addGateway( 4 );
        break;
      case 12:
        this.addGateway( 0 );
        this.addGateway( 0 );
        this.addGateway( 0 );
        this.addGateway( 0 );
        break;
      case 13:
        this.addGateway( 2 );
        this.addGateway( 0 );
        this.addGateway( 0 );
        break;
      case 14:
        this.addGateway( 2 );
        this.addGateway( 2 );
        break;
      case 15:
        this.addGateway( 3 );
        this.addGateway( 0 );
        this.addGateway( 0 );
        break;
      case 16:
        this.addGateway( 3 );
        this.addGateway( 3 );
        break;
      case 17:
        this.addGateway( 4 );
        this.addGateway( 0 );
        break;
      case 18:
        this.addGateway( 5 );
        break;
    }
  }

  //convert block index to type
  determineBlockType( index ){
    let blockType = null;
    let vec = this.convertIndex( index );

    //corner
    if( vec.x == 0 && vec.y == 0 )
      blockType = 0;
    if( vec.x == this.const.block.x - 1 && vec.y == 0 )
      blockType = 1;
    if( vec.x == this.const.block.x - 1 && vec.y == this.const.block.y - 1 )
      blockType = 2;
    if( vec.x == 0 && vec.y == this.const.block.y - 1 )
      blockType = 3;

    if( blockType == null ){
      //edge
      if( vec.y == 0 )
        blockType = 4;
      if( vec.x == this.const.block.x - 1 )
        blockType = 5;
      if( vec.y == this.const.block.y - 1 )
        blockType = 6;
      if( vec.x == 0 )
        blockType = 7;

      //cornered edge
      if( vec.x == 1 && vec.y == 0 )
        blockType = 8;
      if( vec.x == this.const.block.x - 2 && vec.y == 0 )
        blockType = 9;
      if( vec.x == this.const.block.x - 1 && vec.y == 1 )
        blockType = 10;
      if( vec.x == this.const.block.x - 1 && vec.y == this.const.block.y - 2 )
        blockType = 11;
      if( vec.x == this.const.block.x - 2 && vec.y == this.const.block.y - 1 )
        blockType = 12;
      if( vec.x == 1 && vec.y == this.const.block.y - 1 )
        blockType = 13;
      if( vec.x == 0 && vec.y == this.const.block.y - 2 )
        blockType = 14;
      if( vec.x == 0 && vec.y == 1 )
        blockType = 15;
    }

    return blockType;
  }

  //set variables of impossible indexes
  cutOffNeighbors( index ){
    let blockType = this.determineBlockType( index );
    let first;
    let second;
    let third;

    switch ( blockType ) {
      case 0:
        first = 'up';
        second = 'left';
        break;
      case 1:
        first = 'up';
        second = 'right';
        break;
      case 2:
        first = 'down';
        second = 'right';
        break;
      case 3:
        first = 'down';
        second = 'left';
        break;
      case 4:
        first = 'up';
        break;
      case 5:
        first = 'right';
        break;
      case 6:
        first = 'down';
        break;
      case 7:
        first = 'left';
        break;
      case 8:
        first = 'up';
        third = this.const.block.y;
        break;
      case 9:
        first = 'up';
        third = this.const.block.y * 2 - 1;
        break;
      case 10:
        first = 'right';
        third = this.const.block.y - 2;
        break;
      case 11:
        first = 'right';
        third = this.const.block.x * this.const.block.y - 2;
        break;
      case 12:
        first = 'down';
        third = this.const.block.x * ( this.const.block.y - 1 ) - 1;
        break;
      case 13:
        first = 'down';
        third = this.const.block.x * ( this.const.block.y - 2 );
        break;
      case 14:
        first = 'left';
        third = this.const.block.x * ( this.const.block.y - 1 ) + 1;
        break;
      case 15:
        first = 'left';
        third = 1;
        break;
    }

    this.cutOffNearest( first, second, third );
  }

  //remove impossible indexes from free edge array
  cutOffNearest( first, second, third ){
    this.cleanSide( first );

    if( second !== undefined )
      this.cleanSide( second );

    let index = null;
    index = this.array.freeEdge.indexOf( third )
  //  console.log( 'error', third, index );

    if( index !== -1  && index != null ){
      this.array.freeEdge.splice( index, 1 );
    }
  }

  //erase the whole edge and corners
  cleanSide( way ){
    let edge = [];
    let corner = [];

    switch ( way ) {
      case 'up':
        corner.push( 0 );
        corner.push( this.const.block.x - 1 );

        for( let i = 0; i < this.const.block.x - 2; i++ ){
          let index = i + 1;
          edge.push( index );
        }
        break;
      case 'right':
        corner.push( this.const.block.x * this.const.block.y - 1 );
        corner.push( this.const.block.x - 1 );

        for( let i = 0; i < this.const.block.x - 2; i++ ){
          let index = ( i + 2 ) * this.const.block.x - 1;
          edge.push( index );
        }
        break;
      case 'down':
        corner.push( this.const.block.x * this.const.block.y - 1 );
        corner.push( this.const.block.x * ( this.const.block.y - 1 ) );

        for( let i = 0; i < this.const.block.x - 2; i++ ){
          let index = this.const.block.x * ( this.const.block.y - 1 ) + i + 1;
          edge.push( index );
        }
        break;
      case 'left':
        corner.push( 0 );
        corner.push( this.const.block.x * ( this.const.block.y - 1 ) );

        for( let i = 0; i < this.const.block.x - 2; i++ ){
          let index = this.const.block.x * ( i + 1 );
          edge.push( index );
        }
        break;
    }

    //check possible match on the side
    for( let i = this.array.freeEdge.length - 1; i >= 0; i-- )
      for( let j = edge.length - 1; j >= 0; j-- )
        if( edge[j] == this.array.freeEdge[i] ){
          let vec = this.convertIndex( this.array.freeEdge[i] );
          //this.array.block[vec.y][vec.x].setKind( 'noGate' );
          this.array.freeEdge.splice( i, 1 );
        }

    //check for possible coincidence at the corners
    for( let i = this.array.freeCorner.length - 1; i >= 0; i-- )
      for( let j = corner.length - 1; j >= 0; j-- )
        if( corner[j] == this.array.freeCorner[i] ){
          let vec = this.convertIndex( this.array.freeCorner[i] );
          //this.array.block[vec.y][vec.x].setKind( 'noGate' );
          this.array.freeCorner.splice( i, 1 );
        }

  }

  //find the grid coordinates by index
  convertIndex( index ){
    if( index == undefined )
      return null;

    let y = Math.floor( index / this.const.block.x );
    let x = index % this.const.block.y;
    return createVector( x, y );
  }

  //find the index coordinates by grid coordinates
  convertGrid( vec ){
    if( vec == undefined )
      return null;

    return vec.y * this.const.block.x + vec.x;
  }

  //activate a certain type of gateway
  addGateway( gateKind ){
    let rand;
    let index;
    let id;
    let ids;
    let vec;
    let name;
    let testValue;
    let testIndex;
    let blockType = null;
    let counter = 0;

    switch ( gateKind ) {
      case 0:
        name = 'solo';//'anyEdge';
        rand = Math.floor( Math.random() * this.array.freeEdge.length );
        index = this.array.freeEdge[rand];
        vec = this.convertIndex( index );
        this.array.block[vec.y][vec.x].setKind( name );
        this.array.freeEdge.splice( rand, 1 );
        this.cutOffNeighbors( index );
        this.accountingGateway( index, name );
        break;
      case 1:
        name = 'solo';//'anyCorner';
        rand = Math.floor( Math.random() * this.array.freeCorner.length );
        index = this.array.freeCorner[rand];
        vec = this.convertIndex( index );
        this.array.block[vec.y][vec.x].setKind( name );
        this.array.freeCorner.splice( rand, 1 );
        this.cutOffNeighbors( index );
        this.accountingGateway( index, name );
        break;
      case 2:
        if( this.const.type < 3 )
          return;

        name = 'solo';//'unilateralEdge';
        while( blockType == null && counter < 1000 ){
          rand = Math.floor( Math.random() * this.array.freeEdge.length );
          index = this.array.freeEdge[rand];
          let type = this.determineBlockType( index );
          if( type > 7 ){
            testValue = this.getCouple( type );
            testIndex = this.array.freeEdge.indexOf( testValue );
            if ( testIndex != -1 )
              blockType = type;
          }
          counter++;
        }

        vec = this.convertIndex( index );
        this.array.block[vec.y][vec.x].setKind( name );
        this.array.freeEdge.splice( rand, 1 );
        this.accountingGateway( index, name );

        id = this.getCouple( blockType );
        vec = this.convertIndex( id );
        this.cutOffNeighbors( index );

        this.array.block[vec.y][vec.x].setKind( name );
        this.accountingGateway( id, name );
        this.cutOffNeighbors( id );
        break;
      case 3:
      case 4:
      case 5:
        ids = this.getAdjacent( gateKind - 1 );

        for( let i = 0; i < ids.length; i++ )
          this.cutOffNeighbors( ids[i] );
        break;
      case 6:
        name = 'duo';//'duoCorner';
        let direction = [ 'up', 'right', 'down', 'left' ];
        let firstID;
        let secondID;
        let dir;

        rand = Math.floor( Math.random() * direction.length );
        firstID = rand;
        secondID = ( rand + 1 ) %  direction.length;
        index = ( rand + 2 ) %  direction.length;
        dir =  direction[index];

        index = this.array.freeCorner[firstID];
        vec = this.convertIndex( index );
        this.array.block[vec.y][vec.x].setKind( name );
        this.accountingGateway( index, name );

        index = this.array.freeCorner[secondID];
        vec = this.convertIndex( index );
        this.array.block[vec.y][vec.x].setKind( name );
        this.accountingGateway( index, name );

        if( rand != 3 )
          this.array.freeCorner.splice( rand, 2 );
        else{
          this.array.freeCorner.splice( 0, 1 );
          this.array.freeCorner.pop();
        }

        this.cutOffNearest( dir );
        break;
    }
  }

  //find out a pair for a specific type of block
  getCouple( blockType ){
    let couples = [
      [ 8, 9 ],
      [ 10, 11 ],
      [ 12, 13 ],
      [ 14, 15 ]
    ];
    let type;
    let index;
    let vec;

    for( let i = 0; i < couples.length; i++ )
      for( let j = 0; j < couples[i].length; j++ )
        if( couples[i][j] == blockType ){
          couples[i].splice( j, 1 );
          type = couples[i].pop();
          break;
        }

    switch ( type ) {
      case 8:
        vec = createVector( 0, 1 );
        break;
      case 9:
        vec = createVector( 0, this.const.block.y - 2 );
        break;
      case 10:
        vec = createVector( 1, this.const.block.y - 1 );
        break;
      case 11:
        vec = createVector( this.const.block.x - 2, this.const.block.y - 1 );
        break;
      case 12:
        vec = createVector( this.const.block.x - 1, this.const.block.y - 2 );
        break;
      case 13:
        vec = createVector( this.const.block.x - 1 , 1 );
        break;
      case 14:
        vec = createVector( this.const.block.x - 2, 0 );
        break;
      case 15:
        vec = createVector( 1, 0 );
        break;
    }

    index = vec.x * this.const.block.y + vec.y;
    return index;
  }

  //create a gateway of a given width
  getAdjacent( count ){
    let name = null;
    let ids;
    let adjacents = [];
    let rand = Math.floor( Math.random() * this.array.freeEdge.length );
    let index = this.array.freeEdge[rand];
    let vec = this.convertIndex( index );

    switch ( count ) {
      case 2:
        name = 'duo';//'duoEdge';
        break;
      case 3:
        name = 'trio';//'trioEdge';
        break;
      case 4:
        name = 'quartet';//'quartetEdge';
        break;
    }

    this.array.block[vec.y][vec.x].setKind( name );
    this.array.freeEdge.splice( rand, 1 );
    this.accountingGateway( index, name );

    this.tryAdject( index, adjacents );

    ids = this.applyAdject( adjacents, count - 1);
    ids.push( index );

    return ids;
  }

  //update an array of adjacent blocks
  tryAdject( index, adjacents ){
    let blockType = this.determineBlockType( index );
    let neighbors = [];
    let id;

    switch ( blockType ) {
      case 4:
      case 6:
        id = index - 1;
        neighbors.push( id );
        id = index + 1;
        neighbors.push( id );
        break;
      case 5:
      case 7:
        id = index - this.const.block.x;
        neighbors.push( id );
        id = index + this.const.block.x;
        neighbors.push( id );
        break;
      case 8:
      case 13:
        id = index + 1;
        neighbors.push( id );
        break;
      case 9:
      case 12:
        id = index - 1;
        neighbors.push( id );
        break;
      case 10:
      case 15:
        id = index + this.const.block.x;
        neighbors.push( id );
        break;
      case 11:
      case 14:
        id = index - this.const.block.x;
        neighbors.push( id );
        break;
    }

    for( let i = 0; i < neighbors.length; i++ )
      for( let j = 0; j < this.array.freeEdge.length; j++ )
        if( this.array.freeEdge[j] == neighbors[i] )
          adjacents.push( neighbors[i] );
  }

  //choose from an array of adjacent blocks
  applyAdject( adjacents, count ){
    let name;
    let vec;
    let rand;
    let adjIndex;
    let ids = [];

    switch ( count ) {
      case 1:
      name = 'duo';//'duoEdge';
      break;
    case 2:
      name = 'trio';//'trioEdge';
      break;
    case 3:
      name = 'quartet';//'quartetEdge';
      break;
    }

    while( count > 0 ){
      rand =  Math.floor( Math.random() * adjacents.length );
      adjIndex  = adjacents[rand];
      adjacents.splice( rand, 1 );
      let index = this.array.freeEdge.indexOf( adjIndex );
      ids.push( adjIndex );

      this.tryAdject( adjIndex, adjacents );

      vec = this.convertIndex( adjIndex );
      this.array.block[vec.y][vec.x].setKind( name );
      this.array.freeEdge.splice( index, 1 );
      this.accountingGateway( adjIndex, name );
      count--;
    }

    return ids;
  }

  //determine the type of partition by column and row
  calculatePartition( x, y ){
    let partition = null;

    if( x == 0 && y == 0 )
      partition = 6;
    if( x == 0 && y == this.const.block.y - 1 )
      partition = 7;
    if( x == this.const.block.x - 1 && y == this.const.block.y - 1 )
      partition = 8;
    if( x == this.const.block.x - 1 && y == 0 )
      partition = 9;

    if( partition == null ){
      if( x == 0 )
        partition = 2;
      if( y == this.const.block.y - 1 )
        partition = 3;
      if( x == this.const.block.x - 1 )
        partition = 4;
      if( y == 0 )
        partition = 5;
      }
    return partition;
  }

  //add to gateway array taken index
  accountingGateway( index, kind ){
    let way = null;
    let anotherWay = null;
    let vec = this.convertIndex( index );


    if( vec.x == 0 && vec.y == 0 ){
      way = 0;
      anotherWay = 3;
    }
    if( vec.x == this.const.block.x - 1 && vec.y == 0 ){
      way = 1;
      anotherWay = 0;
    }
    if( vec.x == this.const.block.x - 1 && vec.y == this.const.block.y - 1 ){
      way = 2;
      anotherWay = 1;
    }
    if( vec.x == 0 && vec.y == this.const.block.y - 1 ){
      way = 3;
      anotherWay = 2;
    }

    if( way == null ){
      if( vec.y == 0 )
        way = 0;
      if( vec.x == this.const.block.x - 1 )
        way = 1;
      if( vec.y == this.const.block.y - 1 )
        way = 2;
      if( vec.x == 0 )
        way = 3;
      }

    this.array.gate[way].push( new gate( index, kind, way ) );
    if( anotherWay != null )
      this.array.gate[anotherWay].push( new gate( index, kind, way ) );
  }

  setStatus( status ){
    switch ( status ) {
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

  setOffset( offset ){
    this.offset = offset;
  }

  setJoint( joint ){
    this.joint = joint;
  }

  updateGateway(){
    this.array.gate = [ [], [], [], [] ];

    for( let i = 0; i < this.array.block.length; i++)
      for( let j = 0; j < this.array.block[i].length; j++ ){
          if( this.array.block[i][j].gateKind != null )
            this.accountingGateway( this.array.block[i][j].index, this.array.block[i][j].gateKind );
      }
  }

  draw(){
    let vec = this.offset.copy();
    vec.x -= this.const.a * this.const.block.x /2;
    vec.y -= this.const.a * this.const.block.y / 2;

  //  if( this.status != 'wait' )
      for (let i = 0; i < this.array.block.length; i++)
        for (let j = 0; j < this.array.block[i].length; j++)
          this.array.block[i][j].draw( vec );
          //let index = i *  this.const.block.x + j;
  }
}
