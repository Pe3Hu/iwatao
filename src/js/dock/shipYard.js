//module growth process display
class shipYard{
  constructor(){
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
      choice: [],
      hull: [],
      view: [],
      edit: [],
      way: [ 'up', 'right', 'down', 'left' ]
    };
    this.var = {
      border: null,
      joint: 0,
      mode: 0
    };

    this.init();

  }

  initDots(){
    let vec;
    let offset;
    let index;
    let blockCount = 2;
    let blockSize = 0.5;
    let layerMenu = 2;
    let shiftButtons = 4.5;
    let offsetModule = 2.5;
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
      shoot = stop / cellSize - blockCount * blockSize / 2;
      undershoot.push( shoot / 2 );
      blockCount += 2;
      offset++;
    }

    for( let i = 0; i < this.const.n; i++ )
      for ( let j = 0; j < this.array.view[i].length; j++ )
        this.array.view[i][j].x += undershoot[i] * cellSize;

    this.array.edit.push( createVector( cellSize * 4.5, cellSize * 3 ));
    let x = ( canvasGrid.x - 4 ) / 2 + 0.5;
    let y = ( canvasGrid.y - 6.5 ) / 2 + 6;
    this.array.edit.push( createVector( cellSize * x, cellSize * y ));
  }

  initModules(){
    for ( let i = 0; i < this.const.n; i++ ){
      for ( let j = 0; j < this.array.view[i].length + 1; j++ )
        this.addModule();
      this.var.mode++;
    }
    this.var.mode = 2;
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

    this.tryAttach();

  }

  //
  addHull(){
    this.array.hull.push( new hull( this.array.hull.length, 0 ) );
  }

  //change the type of displayed modules
  switchMode( buttonID ){
    let buttonOffset = 47;
    this.var.mode = buttonID - buttonOffset;
  }

  //
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

  //bring the statuses of all the block to the default value
  cleanModules(){
    for( let i = 0; i < this.array.module.length; i++ )
      for( let j = 0; j < this.array.module[i].length; j++ )
        this.array.module[i][j].setStatus( 0 );
  }

  //insert the current shift at the beginning or at the end of the id array
  updateShift( step ){
    if( step > 0 ){
      this.array.id[this.var.mode].push( this.array.shift[this.var.mode] );
      this.array.shift[this.var.mode] = this.array.id[this.var.mode].shift();
    }
    if( step < 0 ){
      this.array.id[this.var.mode].unshift( this.array.shift[this.var.mode] );
      this.array.shift[this.var.mode] = this.array.id[this.var.mode].pop();
    }
  }

  //change the status and location of all modules
  updateModules( step ){
    if( this.array.module[this.var.mode] == 0 )
      return;

    this.cleanModules();
    this.updateShift( step );

    let i = this.var.mode;
    let j = this.array.shift[i];

    //set position and status for editable module
    this.array.module[i][j].setStatus( 2 );
    this.array.module[i][j].setOffset( this.array.edit[0] );

    //set position and status for visible modules
    for( let l = 0; l < this.array.view[i].length; l++ ){
      if( l >= this.array.module[i].length - 1 )
        return;

      let index = this.array.id[i][l];
      this.array.module[i][index].setStatus( 1 );
      this.array.module[i][index].setOffset( this.array.view[i][l] );
    }


  }

  tryAttach(){
    let index = 0;
    let m = this.array.shift[this.var.mode];
    let mod = this.array.module[this.var.mode][m];
    let parent = null;
    let child = null;
    this.array.joint = [];

    console.log( this.array.hull[0].array.gateway );

    for( let i = 0; i < this.array.way.length; i++ )
      for( let j = 0; j < this.array.hull[0].array.gateway[i].length; j++ ){
          parent = this.array.hull[0].array.gateway[i][j];
          let way = ( i + 2 ) % this.array.way.length;
          for( let l = 0; l < mod.array.gateway[way].length; l++ ){
              child = mod.array.gateway[way][l];
              this.array.joint.push( new joint( index, parent, child ) );
              index++;
          }
      }
    this.attachToHull( mod, this.array.joint[this.var.joint] );

  }

  attachToHull( module, joint ){
    this.array.hull[0].cleanGrid();

    let childVec = module.convertIndex( joint.child );
    let parentVec = this.array.hull[0].convertIndex( joint.parent );

    for(  let i = 0; i < module.array.block.length; i++ )
      for(  let j = 0; j < module.array.block[i].length; j++ ){
        let y = j + parentVec.y - childVec.y;
        let x = i + parentVec.x - childVec.x;
        let block = module.array.block[i][j];
        this.array.hull[0].array.grid[y][x].copy( block );
      }
  }

  shiftJoint( shift ){
    this.var.joint = ( this.var.joint + shift + this.array.joint.length ) % this.array.joint.length;
    console.log( this.var.joint, this.array.joint )

    let m = this.array.shift[this.var.mode];
    let mod = this.array.module[this.var.mode][m];
    this.attachToHull( mod, this.array.joint[this.var.joint] );
  }

  draw(){
    if( this.array.module.length == 0 )
      return;

    let i = this.var.mode;

    this.array.module[i].forEach( function( element ){
      element.draw();
    });

    this.array.hull[0].draw( this.array.edit[1] );
  }
}
