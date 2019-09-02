//hunting grounds
class grounds{
    constructor ( offset ){
      this.offset = offset;
      this.const = {
        a: cellSize
      }
      this.array = {
        vertex: [],
        halt: [],
        trail: []
      };
      this.var = {
        halt: 0,
        n: 0,
        m: 0,
        l: 0
      }

      this.generateHalts( [ 3, 2, 4 ] );
    }


    generateHalts( array ){
      this.array.vertex = [];
      this.var.n = 0;
      this.var.m = array.length;
      for (let i = 0; i < array.length; i++)
        this.var.n += array[i];
      this.var.l = 1 + this.var.n + this.var.m;
      console.log(this.var)

      let delataX = 24 / this.var.n;
      this.array.vertex.push( [] );
      for( let i = 0; i < this.var.n; i++ ){
        let x = cellSize * ( i + 0.5 ) * delataX;
        let y = 0;
        this.array.vertex[0].push( createVector( x, y ) );
      }

      let index = 0;
      this.array.vertex.push( [] );
      for( let i = 0; i < this.var.m; i++ ){
        let x = cellSize * ( index + array[i] * 0.5 ) * delataX;
        let y = cellSize * 3;
        this.array.vertex[1].push( createVector( x, y ) );
        index += array[i];
      }

      this.array.vertex.push( [] );
      this.array.vertex[2].push( createVector( cellSize * 12, cellSize * 6 ) );

      this.initHalts();
      this.initTrails( array );
    }

    initHalts(){
      let index = 0;
      for( let i = 0; i < this.array.vertex.length; i++ )
        for( let j = 0; j < this.array.vertex[i].length; j++ ){
          this.array.halt.push( new halt( index, this.array.vertex[i][j], index ) );
          index++;
        }
    }

    initTrails( array ){
      let index = 0;
      for( let i = this.var.n; i < this.var.l; i++ ){
        let first = this.var.l - 1;
        let second = i;
        this.createTrail( first, second );

        for( let j = 0; j < array[i - this.var.n]; j++ ){
          first = index + j;
          this.createTrail( first, second );
        }
        index += array[i - this.var.n];
      }
    }

    createTrail( first, second ){
      let begin = this.createIndex( first );
      let end = this.createIndex( second );

      if( Math.abs( begin.x - end.x ) == 1 )
        this.array.trail.push( new trail(
          this.array.vertex[begin.x][begin.y],
          this.array.vertex[end.x][end.y] ) );
    }

    createIndex( index ){
      let i = 2;
      let j = 0;
      if( index == this.var.l - 1 )
        return createVector( i, j );

      if( index < this.array.vertex[0].length ){
        i = 0;
        j = index;
      }
      else{
        i = 1;
        j = index - this.array.vertex[0].length;
      }
      return createVector( i, j );
    }

    draw(){
      //draw trails of hunting grounds
      for (let i = 0; i < this.array.trail.length; i++)
        this.array.trail[i].draw( this.offset );

      //draw halts of hunting grounds
      for (let i = 0; i < this.array.halt.length; i++)
        this.array.halt[i].draw( this.offset );
    }
  }
