//
class foundation{
  constructor(){
    this.const = {
      n: 24,
      a: cellSize,
      showcase: null
    };
    this.var = {
    };
    this.array = {
      droplet: [],
      fulcrum: []
    };

    this.init();
  }

  init(){
    this.initGrades();
    this.initDroplets();
    this.initFulcrums();
  }

  initGrades(){
    let sum = 278;
    //this.findFib( sum );
    this.array.fib = [ 6, 10, 16, 26, 42, 68, 110 ];

    let begins = [];
    let ends = [];
    let begin = 0;
    let end;
    sum = 0;
    for( let i = this.array.fib.length - 1; i >= 0; i-- ){
      end = begin + this.array.fib[i] - 1;
      begins.push( begin );
      ends.push( end );
      begin = end + 1;
      sum += this.array.fib[i];
    }
    //console.log( begins );
    //console.log( ends );
    //console.log( sum );
  }

  initFulcrums(){
    for( let i = 0; i < this.const.n + 1; i++ ){
      this.array.fulcrum.push( [] );
      for( let j = 0; j < this.const.n + 1; j++ ){
        let index = i * this.const.n + j + i;
        let center = createVector(
          j * this.const.a,
          i * this.const.a );
        this.array.fulcrum[i].push( new fulcrum( index, center ) );
        if( i == this.const.n ){
          this.array.fulcrum[i][j].setStatus( 2 );
          if( j == 0 )
            this.array.fulcrum[i][j].kickParts( 1 );
          if( j == this.const.n )
            this.array.fulcrum[i][j].kickParts( 0 );
        }
      }
    }

    //add showcase fulcrum
    this.array.fulcrum.push( [] );
    this.const.showcase = ( this.const.n + 1 ) * ( this.const.n + 1 );
    let center = createVector(
      ( this.const.n + 1 ) * this.const.a,
       this.const.n * this.const.a );
    this.array.fulcrum[this.array.fulcrum.length - 1].push( new fulcrum( this.const.showcase, center ) );
    this.array.fulcrum[this.array.fulcrum.length - 1][0].setStatus( 1 );
  }

  initDroplets(){
    for( let i = 0; i < this.const.n; i++ ){
      this.array.droplet.push( [] );
      for( let j = 0; j < this.const.n; j++ ){
        let index = i * this.const.n + j;
        let center = createVector(
          ( j + 0.5 ) * this.const.a,
          ( i + 0.5 ) * this.const.a );
        this.array.droplet[i].push( new droplet( index, this.const.a, center ) );
      }
    }
  }

  findFib( max ){
    let results = [];
    let begins = [];
    let combs = [];
    let maxSumm = 0;
    let maxIndex = null;
    let maxSize = null;
    let length = 50;

    for( let i = 0; i < 10; i+= 0.5 ){
      begins.push( i );
    }

    for( let i = 2; i < 3; i++ ){
      combs.push( [] );
      for( let j = 0; j < i; j++ ){
        combs[i - 2].push( [] );
          for( let l = 0; l < length; l++ )
            combs[i - 2][j].push( begins[l] );
      }
    }
    console.log( combs );

    for( let i = 0; i < combs.length; i++ ){
      let totalLength = Math.pow( length, combs[i].length );
      let counter = 1;

      while( counter < totalLength ){
        let indexs = [];
        let numbers = [];
        let copy = [];
        for( let j = 0; j < combs[i].length; j++ )
          indexs.push( null );

        let temp = counter;
        for( let j = indexs.length - 1; j >= 0; j-- ){
          let index = temp % length;
          indexs[j] = index;
          temp = Math.floor( temp / length );
        }

        for( let j = 0; j < indexs.length; j++ ){
          numbers.push( combs[i][j][indexs[j]] );
          copy.push( combs[i][j][indexs[j]] );
        }

        let flag = true;
        for( let j = 0; j < numbers.length; j++ )
          if( numbers[j] > numbers[j + 1] )
            flag = false;

        if( flag ){
          let summ = 0;
          flag = true;
          for( let j = 0; j < numbers.length; j++ )
            summ += numbers[j];

          while( flag ){
            let nextNumber = 0;
            for( let j = 0; j < numbers.length; j++ )
              nextNumber += numbers[j];

            for( let j = numbers.length - 2; j >= 0 ; j-- )
              numbers[j] = numbers[j + 1];

            numbers[numbers.length - 1] = nextNumber;
            copy.push( nextNumber) ;
            summ += nextNumber;
            if( summ > max ){
              flag = false;
              summ -= nextNumber;
              copy.pop();
              }
            }

            if( summ > maxSumm ){
              maxSumm = summ;
              maxSize = numbers.length;
              maxIndex = counter;
            }

            if( summ == max )
              results.push( copy );
        }

        counter++;
      }
    }
    console.log( results )
    return results;
  }

  updateFulcrum(){
    /*for( let i = 0; i < this.const.n + 1; i++ )
      for( let j = 0; j < this.const.n + 1; j++ )*/
  }

  checkBorder( grid ){
    let flag = true;

    if( grid.x < 0 || grid.y < 0 || grid.x > this.const.n || grid.y > this.const.n )
      flag = false;

    return flag;
  }

  introduceAfflatus( afflatus, fulcrum ){
    let width =  afflatus.var.width;
    let height = afflatus.var.height;
    let begin = afflatus.convertIndex( fulcrum );
    let end = begin.copy();
    end.x += width;

    if( width < 0 ){
      let temp = begin.copy();
      begin = end.copy();
      end = temp.copy();
    }

    for( let j = begin.x + 1; j <= end.x - 1; j++ )
      this.array.fulcrum[begin.y][j].setStatus( 0 );

    //update corner points
    switch ( afflatus.const.type ) {
      case 3:
        switch ( afflatus.var.turn ) {
          case 0:
            this.array.fulcrum[begin.y][begin.x].kickParts( 0 );
            this.array.fulcrum[end.y][end.x].kickParts( 3, afflatus );
            break;
          case 3:
            this.array.fulcrum[begin.y][begin.x].kickParts( 2, afflatus );
            this.array.fulcrum[end.y][end.x].kickParts( 1 );
            break;
          case 1:
            this.array.fulcrum[begin.y][begin.x].kickParts( 4 );
              if( begin.y - height != 0 ){
                for( let j = begin.x + 1; j <= end.x - 1; j++ )
                  this.array.fulcrum[begin.y - height][j].setStatus( 2 );
                this.array.fulcrum[begin.y - height][begin.x].setStatus( 3 );
                this.array.fulcrum[end.y - height][end.x].setStatus( 3 );
                this.array.fulcrum[begin.y - height][begin.x].addParts( 0 );
                let angle = 0;

                if( this.array.fulcrum[begin.y][begin.x].array.height[angle] > height ){
                  this.array.fulcrum[end.y - height][end.x].setAngle( this.array.fulcrum[begin.y][begin.x], angle, afflatus );
                  this.array.fulcrum[end.y - height][end.x].addParts( 3 );
                }
                if( this.array.fulcrum[begin.y][begin.x].array.height[angle] == height )
                  this.array.fulcrum[end.y - height][end.x].addParts( 1 );
              }
            //update fulcrum index
            fulcrum = this.array.fulcrum[begin.y - height][begin.x].const.index;
            break;
          case 2:
            this.array.fulcrum[end.y][end.x].kickParts( 5 );
            if( begin.y - height != 0 ){
              for( let j = begin.x + 1; j <= end.x - 1; j++ )
                this.array.fulcrum[begin.y - height][j].setStatus( 2 );
              this.array.fulcrum[begin.y - height][begin.x].setStatus( 3 );
              this.array.fulcrum[end.y - height][end.x].setStatus( 3 );
              this.array.fulcrum[end.y - height][end.x].addParts( 1 );
              let angle = 1;

              if( this.array.fulcrum[end.y][end.x].array.height[angle] > height ){
                this.array.fulcrum[begin.y - height][begin.x].setAngle( this.array.fulcrum[end.y][end.x], angle, afflatus );
                this.array.fulcrum[begin.y - height][begin.x].addParts( 2 );
              }
              if( this.array.fulcrum[end.y][end.x].array.height[angle] == height )
                this.array.fulcrum[begin.y - height][begin.x].addParts( 0 );
            }
            //update fulcrum index
            fulcrum = this.array.fulcrum[end.y - height][end.x].const.index;
            break;
        };
        break;
      case 4:
        switch ( afflatus.var.turn ) {
          case 0:
            this.array.fulcrum[begin.y][begin.x].kickParts( 0 );
            this.array.fulcrum[end.y][end.x].kickParts( 1 );
            if( begin.y - height != 0 ){
              for( let j = begin.x + 1; j <= end.x - 1; j++ )
                this.array.fulcrum[begin.y - height][j].setStatus( 2 );
              this.array.fulcrum[begin.y - height][begin.x].setStatus( 3 );
              this.array.fulcrum[begin.y - height][begin.x].addParts( 0 );
              this.array.fulcrum[end.y - height][end.x].setStatus( 3 );
              this.array.fulcrum[end.y - height][end.x].addParts( 1 );
            }
            break;
          case 3:
            this.array.fulcrum[begin.y][begin.x].kickParts( 0 );
            this.array.fulcrum[end.y][end.x].kickParts( 1 );
            if( begin.y - height != 0 ){
              for( let j = begin.x + 1; j <= end.x - 1; j++ )
                this.array.fulcrum[begin.y - height][j].setStatus( 2 );
              this.array.fulcrum[begin.y - height][begin.x].setStatus( 3 );
              this.array.fulcrum[begin.y - height][begin.x].addParts( 0 );
              this.array.fulcrum[end.y - height][end.x].setStatus( 3 );
              this.array.fulcrum[end.y - height][end.x].addParts( 1 );
            }
            break;
        };
        break;
    }
    return fulcrum;

    //console.log(this.array.fulcrum[begin.y][end.x].const.indee)
    /*console.log( 'i', fulcrum, 'w', width,
                'b', this.array.fulcrum[begin.y][begin.x].const.index,
                'e', this.array.fulcrum[begin.y][end.x].const.index )*/
    //this.updateFulcrum();

/*
    for( let j = 0; j < 25; j++ )
      console.log( this.array.fulcrum[24][j].const.index, this.array.fulcrum[24][j].var.available, this.array.fulcrum[24][j].array.eighthPart )
*/  }

  draw( offset ){
    fill( colorMax * 3 / 4 );
    //central background
    rect(
      offset.x + this.const.n / 4 * this.const.a, offset.y,
      this.const.n * this.const.a / 2, this.const.n * this.const.a );

    for( let i = 0; i < this.array.droplet.length; i++ )
      for( let j = 0; j < this.array.droplet[i].length; j++ )
       this.array.droplet[i][j].draw( offset );

  }

  drop( offset ){
   for( let i = 0; i < this.array.fulcrum.length; i++ )
     for( let j = 0; j < this.array.fulcrum[i].length; j++ )
      this.array.fulcrum[i][j].draw( offset );
  }
}
