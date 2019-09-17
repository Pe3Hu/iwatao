//detail from which game items are created
//деталь taipitopito
class tptpt {
  constructor ( index, steps ){
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
    this.status = 'wait';

    this.init();

    this.addRandPikaEdge( steps );
  }

  init(){
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
      let x = this.array.freeEdge[rand] % this.const.pika.y;
      let y = Math.floor( this.array.freeEdge[rand] / this.const.pika.y );
      this.array.pika[y][x].setStatus( 2 );
      this.array.freeEdge.splice( rand, 1 );
    }
  }

  setOffset( offset ){
    this.offset = offset;
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
        this.status = 'soloEdit';
        break;
      case 3:
        this.status = 'firstTerm';
        break;
      case 4:
        this.status = 'secondTerm';
        break;
    }
  }

  draw(){
    if( this.status != 'wait' )
      for (let i = 0; i < this.array.pika.length; i++)
        for (let j = 0; j < this.array.pika[i].length; j++)
          this.array.pika[i][j].draw( this.offset );
  }
}
