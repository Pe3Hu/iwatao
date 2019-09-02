//use strict;
//plant growth process display
class greenHouse {
  constructor ( offset ){
    this.offset = offset;
    this.const = {
      a: cellSize * Math.sqrt( 3 ) / 3 * 8,
      l: 7
    }
    this.array = {
      plant: [],
      view: [],
      edit: [],
      id: []
    };
    this.var = {
      firstID: 0,
      secondID: 1,
      mode: 'growth'
    }

    this.initDots();

    this.initPlants();
  }

  switchMode(){
    switch ( this.var.mode ) {
      case 'growth':
        this.var.mode = 'duo';
        this.var.secondID = this.array.id.shift();
        break;
      case 'duo':
        this.var.mode = 'growth';
        this.array.id.unshift( this.var.secondID );
        break;
    }
    this.updatePlants( 0, null );
  }

  initDots(){
    let vec = createVector( cellSize * 4.5, cellSize * 3.5 );
    while( vec.x < ( canvasSize.x - 6.5 * cellSize ) ){
      this.array.view.push( vec.copy() );
      vec.x +=  8 * cellSize;
    }
    this.array.edit.push( createVector( cellSize * ( 8 * this.array.view.length / 2 + 0.5 ), cellSize * 11.5 ));
  }

  initPlants(){
    for ( let i = 0; i < this.const.l; i++ ){
      this.array.plant.push( new plant( i, true ));
      this.array.id.push( i );
    }

    this.array.id.splice( this.var.firstID, 1 );

    this.updatePlants( 0, 0 );
  }

  cleanPlants(){
    for ( let i = 0; i < this.array.plant.length; i++ )
      this.array.plant[i].setStatus( 0 );
  }

  updatePlants( step, type ){
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
      default:

    }
    this.cleanPlants();
    this.nextIndex( step, target );

    //set position and status for editable Plants
    switch ( this.var.mode ) {
      case 'growth':
        this.array.plant[this.var.firstID].setStatus( 2 );
        this.array.plant[this.var.firstID].setOffset( this.array.edit[0] );
        break;
      case 'duo':
        this.array.plant[this.var.firstID].setStatus( 3 );
        this.array.plant[this.var.firstID].setOffset( this.array.edit[1] );
        this.array.plant[this.var.secondID].setStatus( 3 );
        this.array.plant[this.var.secondID].setOffset( this.array.edit[2] );
        break;
    }

    //set position and status for visible Plants
    for( let i = 0; i < this.array.view.length; i++ ){
      let index = this.array.id[i];
      this.array.plant[index].setStatus( 1 );
      this.array.plant[index].setOffset( this.array.view[i] );
    }
  }

  nextIndex( step, target ){
    switch ( target ) {
      case 'first':
        //return the index of the first sample to an array of options
        if( step > 0 ){
          this.array.id.push( this.var.firstID );
          this.var.firstID = this.array.id.shift();
        }
        if( step < 0 ){
          this.array.id.unshift( this.var.firstID );
          this.var.firstID = this.array.id.pop();
        }
      break;
      case 'second':
        if( this.var.mode != 'duo' )
          return;

        //return the index of the second sample to an array of options
        if( step > 0 ){
          this.array.id.push( this.var.secondID );
          this.var.secondID = this.array.id.shift();
        }
        else{
          this.array.id.unshift( this.var.secondID );
          this.var.secondID = this.array.id.pop();
        }
        break;
    }
  }

  //drawing greenhouse
  draw(){
    this.array.plant.forEach( function( element ){
      element.draw();
    });
  }

  //run check on click
  clickCheck(){
    this.array.plant.forEach( function( element ) {
      element.check();
    });
  }
}
