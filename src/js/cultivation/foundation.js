//
class foundation{
  constructor(){
    this.const = {
      n: 24,
      a: cellSize * 2 / 3,
      offset: createVector( cellSize * 1, cellSize * 1 )
    };
    this.var = {
    };
    this.array = {
      droplet: []
    };

    this.init();
  }

  init(){
    this.initGrades();
    this.initDroplets();
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

  initDroplets(){
    for( let i = 0; i < this.const.n; i++ ){
      this.array.droplet.push( [] );
      for( let j = 0; j < this.const.n; j++ ){
        let index = i * this.const.n + j;
        let center = createVector(
          this.const.offset.x + j * this.const.a,
          this.const.offset.y + i * this.const.a,
        );
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

  add

  draw(){
    for( let i = 0; i < this.array.droplet.length; i++ )
      for( let j = 0; j < this.array.droplet[i].length; j++ )
       this.array.droplet[i][j].draw( this.const.offset );
  }
}
