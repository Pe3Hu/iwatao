//
class chessBoard{
  constructor ( index, offset, suit ){
    this.offset = offset;
    this.const = {
      index: index,
      a: cellSize * 2,
      n: 11,
      suit: suit
    };
    this.array = {
      link: []
    };
    this.var = {

    };

    this.init();
  }

  init(){
    for( let i = 0; i < this.const.n; i++ ){
      let center = createVector( i * this.const.a + this.const.a, this.const.a )
      this.array.link.push( new link( i, center, this.const.suit, i ) );
    }
  }
}
