//
class hearth{
    constructor ( side ){
      this.const = {
        a: cellSize
      }
      this.array = {
        vertex: [],
        bar: []
      };
      this.var = {
        currentPoints: 100
      };
      this.const = {
        side: side,
        fullPoints: 100
      }

      this.init();
    }

    init(){
      let center = createVector( cellSize * 5, cellSize * (  1 + 1 / 6 ) );
      this.array.bar.push( new bar( center.copy(), 0, 'health' ) );
      center = createVector( cellSize * 5, cellSize * (  1 + 3 / 6 ) );
      this.array.bar.push( new bar( center, 0, 'mana' ) );
      center = createVector( cellSize * 5, cellSize * (  1 + 5 / 6 ) );
      this.array.bar.push( new bar( center, 0, 'stamina' ) );
      center = createVector( cellSize * 3.5, cellSize * 5.5 );
      this.array.bar.push( new bar( center, 2, 'composure' ) );
      center = createVector( cellSize * 3.5, cellSize * 5.5 );
      this.array.bar.push( new bar( center, 3, 'rage' ) );
      center = createVector( cellSize * 5, cellSize * 13 );
      this.array.bar.push( new bar( center, 4, 'composure' ) );
      center = createVector( cellSize * 5, cellSize * 13 );
      this.array.bar.push( new bar( center, 5, 'rage' ) );
      this.array.bar[6].updatePoints( 100 - this.array.bar[5].points.current );
    }

    draw( offset ){
      switch ( this.const.side ) {
        case 'player':

          break;
        case 'enemy':

          break;
      }
      for ( let i = 0; i < this.array.bar.length; i++ )
        this.array.bar[i].draw( offset );
    }
}
