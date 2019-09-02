//
class bandit{
  constructor ( offset ){
    this.offset = offset;
    this.const = {
      a: cellSize * 2,
      m: 5
    }
    this.array = {
      suit: [ 'a', 'b', 'c', 'd', 'e' ],
      chain: [],
      payline: []
    };
    this.var = {
      payline: 0
    }

    this.init();

    this.setPayline( 29 );
  }

  init(){
    this.initChains();
    this.initPaylines();
  }

  initChains(){
    for( let i = 0; i < this.const.m; i++ ){
      let center = createVector( i * this.const.a, 0 );
      this.array.chain.push( new chain( i, center, this.array.suit[i] ) );
    }
  }

  initPaylines(){
    this.array.payline.push( [ 5, 6, 7, 8, 9 ] );
    this.array.payline.push( [ 0, 1, 2, 3, 4 ] );
    this.array.payline.push( [ 10, 11, 12, 13, 14 ] );
    this.array.payline.push( [ 0, 6, 12, 8, 4 ] );
    this.array.payline.push( [ 10, 6, 2, 8, 14 ] );
    this.array.payline.push( [ 0, 1, 7, 13, 14 ] );
    this.array.payline.push( [ 10, 11, 7, 3, 4 ] );
    this.array.payline.push( [ 5, 1, 7, 13, 9 ] );
    this.array.payline.push( [ 5, 11, 7, 3, 9 ] );
    this.array.payline.push( [ 0, 6, 7, 8, 14 ] );

    this.array.payline.push( [ 10, 6, 7, 8, 4 ] );
    this.array.payline.push( [ 5, 1, 2, 8, 14 ] );
    this.array.payline.push( [ 5, 11, 12, 8, 4 ] );
    this.array.payline.push( [ 0, 6, 12, 8, 4 ] );
    this.array.payline.push( [ 10, 6, 2, 8, 14 ] );
    this.array.payline.push( [ 0, 6, 2, 8, 14 ] );
    this.array.payline.push( [ 10, 6, 12, 8, 4 ] );
    this.array.payline.push( [ 10, 6, 2, 3, 9 ] );
    this.array.payline.push( [ 0, 6, 12, 13, 9 ] );
    this.array.payline.push( [ 0, 6, 7, 13, 9 ] );
    this.array.payline.push( [ 0, 6, 2, 8, 4 ] );
    this.array.payline.push( [ 10, 6, 12, 8, 14 ] );
    this.array.payline.push( [ 0, 11, 2, 13, 4 ] );
    this.array.payline.push( [ 10, 1, 12, 3, 14 ] );
    this.array.payline.push( [ 0, 1, 12, 3, 4 ] );
    this.array.payline.push( [ 10, 11, 2, 13, 14 ] );
    this.array.payline.push( [ 0, 11, 12, 13, 4 ] );
    this.array.payline.push( [ 10, 1, 2, 3, 14 ] );
    this.array.payline.push( [ 5, 1, 12, 3, 9 ] );
    this.array.payline.push( [ 5, 11, 2, 13, 9 ] );

    let array = [];
    for (var i = 0; i < 15; i++)
      array.push( 0 );

    for (var i = 0; i < this.array.payline.length; i++)
      for (var j = 0; j < this.array.payline[i].length; j++)
        array[this.array.payline[i][j]]++;

    /*console.log(array[0], array[1], array[2], array[3], array[4]);
    console.log(array[5], array[6], array[7], array[8], array[9]);
    console.log(array[10], array[11], array[12], array[13], array[14]);*/
  }

  spin(){
    for (let i = 0; i < this.array.chain.length; i++)
      this.array.chain[i].spin();
  }

  setPayline( num ){
    if( num > this.array.payline.length )
      return;

    for (let i = 0; i < this.array.payline[num].length; i++)
      this.selectLink( this.array.payline[num][i] );
  }

  selectLink( index ){
    let i = index % 5;
    let j = Math.floor ( index / 5 );
    this.array.chain[i].array.link[j].setStatus( 2 );
  }

  draw(){
    for (let i = 0; i < this.array.chain.length; i++)
        this.array.chain[i].draw( this.offset );

  }
}
