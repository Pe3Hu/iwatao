//
class foundation{
  constructor(){
    this.const = {
      n: 24,
      a: cellSize * 1 / 2,
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
        if( i == this.const.n )
          this.array.fulcrum[i][j].setStatus( 2 );
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
    let small = afflatus.var.small / afflatus.const.a;
    let big = afflatus.var.big / afflatus.const.a;
    let width = null;

    switch ( afflatus.var.turn ) {
      case 0:
        if( afflatus.var.clockwise )
          width = small;
        else
          width = big;
        break;
      case 3:
        if( afflatus.var.clockwise )
          width = -big;
        else
          width = -small;
        break;
    };

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

    this.array.fulcrum[begin.y][begin.x].setStatus( 3 );
    this.array.fulcrum[begin.y][end.x].setStatus( 3 );



    //console.log(this.array.fulcrum[begin.y][end.x].const.indee)

    console.log( fulcrum, width, this.array.fulcrum[begin.y][begin.x].const.index, this.array.fulcrum[begin.y][end.x].const.index )
    //this.updateFulcrum();
  }

  draw( offset ){
    fill( colorMax * 3 / 4 );
    //central background
    rect(
      offset.x + this.const.n / 4 * this.const.a, offset.y,
      this.const.n * this.const.a / 2, this.const.n * this.const.a );

    for( let i = 0; i < this.array.droplet.length; i++ )
      for( let j = 0; j < this.array.droplet[i].length; j++ )
       this.array.droplet[i][j].draw( offset );

     for( let i = 0; i < this.array.fulcrum.length; i++ )
       for( let j = 0; j < this.array.fulcrum[i].length; j++ )
        this.array.fulcrum[i][j].draw( offset );
  }
}
