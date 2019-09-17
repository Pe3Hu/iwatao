//tptpt growth process display
class jewelryHouse {
  constructor ( offset ){
    this.const = {
      a: cellSize,
      l: 8
    }
    this.array = {
      tptpt: [],
      view: [],
      edit: [],
      id: []
    };
    this.var = {
      firstShift: 0,
      secondShift: 1,
      mode: 'solo'
    }
    this.offset = createVector();

    this.init();
  }

  switchMode(){
    switch ( this.var.mode ) {
      case 'solo':
        this.var.mode = 'duo';
        this.var.secondShift = this.array.id.shift();
        break;
      case 'duo':
        this.var.mode = 'solo';
        this.array.id.unshift( this.var.secondShift );
        break;
    }
    this.updateTptpts( 0, null );
  }

  initDots(){
    let vec = createVector( cellSize, cellSize );
    while( vec.x < ( canvasSize.x - 10 * cellSize ) ){
      this.array.view.push( vec.copy() );
      vec.x += 9 * cellSize;
    }

    this.array.edit.push( createVector( cellSize * ( this.array.view.length * 9 / 2 - 3.5 ), cellSize * 12 ));
    this.array.edit.push( createVector( cellSize * ( this.array.view.length * 9 / 2 - 9.5 ), cellSize * 12 ));
    this.array.edit.push( createVector( cellSize * ( this.array.view.length * 9 / 2 + 2.5 ), cellSize * 12 ));
  }

  initTptpts(){
    for ( let i = 0; i < this.const.l; i++ ){
      this.array.tptpt.push( new tptpt( i, 12  ));
      this.array.id.push( i );
    }

    this.array.id.splice( this.var.firstShift, 1 );

    this.updateTptpts( 0, 0 );
  }

  init(){
    this.initDots();
    this.initTptpts();
  }

  cleanTptpts(){
    for( let i = 0; i < this.array.tptpt.length; i++ )
      this.array.tptpt[i].setStatus( 0 );
  }

  updateTptpts( step, type ){
    let target = null;
    switch ( type ) {
      case 0:
        target = 'first';
        break;
      case 1:
        target = 'first';
        break;
      case 2:
        target = 'second';
        break;
    }

    this.cleanTptpts();
    this.nextIndex( step, target );

    //set position and status for editable tptpts
    switch ( this.var.mode ) {
      case 'solo':
        this.array.tptpt[this.var.firstShift].setStatus( 2 );
        this.array.tptpt[this.var.firstShift].setOffset( this.array.edit[0] );
        break;
      case 'duo':
        this.array.tptpt[this.var.firstShift].setStatus( 3 );
        this.array.tptpt[this.var.firstShift].setOffset( this.array.edit[1] );
        this.array.tptpt[this.var.secondShift].setStatus( 3 );
        this.array.tptpt[this.var.secondShift].setOffset( this.array.edit[2] );
        break;
    }

    //set position and status for visible tptpts
    for( let i = 0; i < this.array.view.length; i++ ){
      let index = this.array.id[i];
      this.array.tptpt[index].setStatus( 1 );
      this.array.tptpt[index].setOffset( this.array.view[i] );
    }
  }

  nextIndex( step, target ){
    switch ( target ) {
      case 'first':
        //return the index of the first sample to an array of options
        if( step > 0 ){
          this.array.id.push( this.var.firstShift );
          this.var.firstShift = this.array.id.shift();
        }
        if( step < 0 ){
          this.array.id.unshift( this.var.firstShift );
          this.var.firstShift = this.array.id.pop();
        }
      break;
      case 'second':
        if( this.var.mode != 'duo' )
          return;

        //return the index of the second sample to an array of options
        if( step > 0 ){
          this.array.id.push( this.var.secondShift );
          this.var.secondShift = this.array.id.shift();
        }
        else{
          this.array.id.unshift( this.var.secondShift );
          this.var.secondShift = this.array.id.pop();
        }
        break;
    }
  }

  //drawing jewelery house
  draw(){
    this.array.tptpt.forEach( function( element ){
      element.draw();
    });
  }
}
