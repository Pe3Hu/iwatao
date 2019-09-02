//
class chain{
  constructor ( index, offset, suit ){
    this.index = index;
    this.offset = offset;
    this.const = {
      a: cellSize * 2,
      n: 11,
      k: 3,
      suit: suit
    }
    this.array = {
      link: []
    };
    this.var = {
      shift: 0
    }

    this.init();
  }

  init(){
    for( let i = 0; i < this.const.n; i++ ){
      let center = createVector( 0, i * this.const.a );
      center.add( this.offset );
      this.array.link.push( new link( i, center, this.const.suit, this.const.n - i - 1 ) );
      if( i < this.const.k )
        this.array.link[i].setStatus( 1 );
    }
  }

  spin(){
    let rand = Math.floor( Math.random() * this.const.n );
    this.var.shift = ( rand + this.var.shift ) % this.const.n;

    for( let i = 0; i < this.array.link.length; i++ ){
      this.array.link[i].setStatus( 0 );
      let y = ( i + this.var.shift ) % this.array.link.length;
      let center = createVector( 0, y * this.const.a );
      center.add( this.offset );
      this.array.link[i].setCenter( center );

      if( y >= 0 && y < this.const.k )
        this.array.link[i].setStatus( 1 );
    }
  }

  draw( offset ){
    for (let i = 0; i < this.array.link.length; i++)
        this.array.link[i].draw( offset );
  }
}
