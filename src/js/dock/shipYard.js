//module growth process display
class shipYard{
  constructor (){
    this.const = {
      a: cellSize,
      n: 4,
      l: 1
    }
    this.array = {
      module: [ [], [], [], [] ],
      id: [ [], [], [], [] ],
      shift: [ null, null, null, null ],
      distribution: [],
      option: [],
      hull: [],
      view: [],
      edit: []
    };
    this.var = {
      mode: 2,
      border: null
    };

    this.init();

    console.log( this.array.module )
  }

  initDots(){
    let vec;
    let offset;
    let index;
    let blockCount = 2;
    let blockSize = 0.5;
    let layerMenu = 2;
    let shiftButtons = 4.5;
    let offsetModule = 3;
    let currentModule = 5;
    let shoot;
    let undershoot = [];
    this.var.border = createVector( ( canvasGrid.x - layerMenu - shiftButtons ) * cellSize, 0 );

    for( let i = 0; i < 4; i++ ){
      vec = createVector( cellSize * ( offsetModule + currentModule + blockCount * blockSize / 2 ), cellSize * 3 );
      this.array.view.push( [] );
      offset = blockCount * blockSize + layerMenu + shiftButtons;

      while( vec.x <= ( canvasGrid.x - offset ) * cellSize ){
        this.array.view[i].push( vec.copy() );
        vec.x += ( ( blockCount + 1 ) * blockSize ) * cellSize;
      }
      stop = this.var.border.x - this.array.view[i][this.array.view[i].length - 1].x;
      shoot = stop / cellSize - blockCount * blockSize / 2 - 0.5;
      undershoot.push( shoot / 2 );
      blockCount += 2;
      offset++;
    }

    for( let i = 0; i < this.const.n; i++ )
      for ( let j = 0; j < this.array.view[i].length; j++ ){
        this.array.view[i][j].x += undershoot[i] * cellSize;
      }

    this.array.edit.push( createVector( cellSize * 5, cellSize * 3 ));
  }

  initModules(){
    /*for ( let i = 0; i < this.const.n; i++ ){
      for ( let j = 0; j < this.array.view[i].length; j++ )
        this.addModule();
      this.var.mode++;
    }*/

  }

  initDistribution(){
    this.array.distribution = [
      [ 14, 6, 16 ],
      [ 10, 4, 9, 5, 1, 7 ],
      [ 1, 6, 9, 2, 1, 4, 2, 9, 2 ],
      [ 6, 3, 1, 4, 3, 7, 1, 1, 3, 3, 3, 1 ]
    ];
    this.array.option = [
      [ 1, 4, 6 ],
      [ 0, 1, 2, 3, 4, 6 ],
      [ 5, 6, 7, 8, 9, 10, 11, 12, 16 ],
      [ 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ]
    ];
  }

  init(){
    this.initDistribution();
    this.initDots();
    this.initModules();
    this.addHull();
  }

  addHull(){
    this.array.hull.push( new hull( this.array.hull.length, 0 ) );
  }

  switchMode( buttonID ){
    let buttonOffset = 47;
    this.var.mode = buttonID - buttonOffset;
  }

  scroll( buttonID ){

  }

  addModule(){
    let i = this.var.mode;
    let index = this.array.module[i].length;
    let l = this.array.option[i].length;
    let rand = Math.floor( Math.random() * l );
    let grade = this.array.option[i][rand];
    this.array.module[i].push( new module( index, i + 1, grade ) );

    if( this.array.shift[i] == null ){
      this.array.shift[i] = 0;
      this.updateModules( 0 );
    }
    else{      
      this.array.id[i].push( index );
      this.updateModules( -1 );
    }

  }

  cleanModules(){
    for( let i = 0; i < this.array.module.length; i++ )
      for( let j = 0; j < this.array.module[i].length; j++ )
        this.array.module[i][j].setStatus( 0 );
  }

  nextIndex( step ){
    //return the index of the first sample to an array of options
    if( step > 0 ){
      this.array.id[this.var.mode].push( this.array.shift[this.var.mode] );
      this.array.shift[this.var.mode] = this.array.id[this.var.mode].shift();
    }
    if( step < 0 ){
      this.array.id[this.var.mode].unshift( this.array.shift[this.var.mode] );
      this.array.shift[this.var.mode] = this.array.id[this.var.mode].pop();
    }
    if( step == 0 ){

    }
    console.log( step, this.array.id[this.var.mode] )
  }

  updateModules( step ){
    if( this.array.module[this.var.mode] == 0 )
      return;


    this.cleanModules();
    this.nextIndex( step );

    let i = this.var.mode;
    let j = this.array.shift[i];

    //set position and status for editable module
    this.array.module[i][j].setStatus( 2 );
    this.array.module[i][j].setOffset( this.array.edit[0] );

    console.log( this.array.shift[i], j );

    //set position and status for visible modules
    for( let l = 0; l < this.array.view[i].length; l++ ){
      if( l >= this.array.module[i].length - 1 )
        return;

      let index = this.array.id[i][l];
      this.array.module[i][index].setStatus( 1 );
      this.array.module[i][index].setOffset( this.array.view[i][l] );
    }


  }

  //drawing ship creating
  draw(){
    if( this.array.module.length == 0 )
      return;

    let i = this.var.mode;

    this.array.module[i].forEach( function( element ){
      element.draw();
    });
    /*for ( let j = 0; j < this.array.view[i].length; j++ )
      if( this.array.module[i].length > j )
        this.array.module[i][j].draw( this.array.view[i][j], this.var.mode );*/
  }
}
