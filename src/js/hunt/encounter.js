//
class encounter{
    constructor ( type ){
      this.const = {
        a: cellSize
      }
      this.array = {
        vertex: []
      };
      this.var = {
      };
      this.const = {
        type: type
      }

      this.init();
    }

    init(){
      //this.locale = new locale( this.const.type );
      this.initVertexs();
      this.initHearths();
    }

    initVertexs(){
      this.array.vertex.push( createVector( cellSize * 6, cellSize * 6 ) );
      this.array.vertex.push( createVector( cellSize * 12, cellSize * 6 ) );
    }

    initHearths(){
      this.player = new hearth( 'player' );
      this.enemy = new hearth( 'enemy' );
    }

    draw(){
      this.player.draw( this.array.vertex[0] );
    }
}
