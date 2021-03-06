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
      hull: [],
      view: [],
      edit: []
    };
    this.var = {
      border: null,
      joint: 0,
      hull: 0,
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

    this.var.mode = 0;
    let hull = this.array.hull[this.var.hull];
    hull.cleanGrid();
    this.tryAttach();
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
    this.addHull();
    this.initDistribution();
    this.initDots();
    this.initModules();
  }

  //change the type of displayed modules
  switchMode( buttonID ){
    let buttonOffset = 47;
    this.var.mode = buttonID - buttonOffset;

    this.tryAttach();
  }

  //
  addHull(){
    this.array.hull.push( new hull( this.array.hull.length, 0 ) );
  }

  //
  updateHull(){
    let shift = this.array.shift[this.var.mode];
    let modul = this.array.module[this.var.mode][shift];
    let hull = this.array.hull[this.var.hull];
    let joint = this.array.joint[this.var.joint];
    let parent = hull.convertIndex( joint.var.parent.const.index );
    let child = modul.convertIndex( joint.var.child.const.index );

    //update joint in locked module
    modul.setJoint( joint );

    hull.array.module.push( modul );
    this.array.module[this.var.mode].splice( shift, 1 );

    //update values in shift and id arrays
    for( let i = 0; i < this.array.id[this.var.mode].length; i++ )
      if( this.array.id[this.var.mode][i] >= this.array.shift[this.var.mode] )
        this.array.id[this.var.mode][i]--;

    this.array.shift[this.var.mode] = this.array.id[this.var.mode].shift();

    for( let i = 0; i < hull.array.gate.length; i++ ){
      let index = hull.array.gate[i].indexOf( joint.var.parent );
      let way = ( i + 2 ) % hull.array.gate.length;
      //remove used gateway
      if( index != -1 )
        hull.array.gate[i].splice( index, 1 );

      //adding new options in gateway array
      for( let j = 0; j < modul.array.gate[i].length; j++ ){
          let grid = modul.convertIndex( modul.array.gate[i][j].const.index );
          grid.x += parent.x - child.x;
          grid.y += parent.y - child.y;

          let kind = modul.array.gate[i][j].var.kind;
          let sequence = modul.array.gate[i][j].var.sequence;
          let id = hull.convertGrid( grid );
          id += hull.array.way[i];
          let exitGrid = hull.convertIndex( id );
          //if( modul.array.gate[i][j].const.index != joint.var.child.const.index )
          if( hull.array.grid[exitGrid.y][exitGrid.x].var.status != 'selected' )
            hull.array.gate[i].push( new gate( id, kind, sequence, way ) );
      }
    }
  }

  //connect the module to the hull if it is possible
  attachToHull( module, joint ){
    let hull = this.array.hull[this.var.hull];
    let childVec = module.convertIndex( joint.var.child.const.index );
    let parentVec = hull.convertIndex( joint.var.parent.const.index );

    //console.log( '!', module.const.type, joint.var.parent, joint.var.child )

    hull.cleanGrid();

    for( let i = 0; i < module.array.block.length; i++ )
      for( let j = 0; j < module.array.block[i].length; j++ ){
        let x = j + parentVec.x - childVec.x;
        let y = i + parentVec.y - childVec.y;
        let block = module.array.block[i][j];
        hull.array.grid[y][x].copy( block, 0 );
      }

  }

  //formation of an array of possible joints
  tryAttach(){
    if( this.array.module[this.var.mode].length == 0 )
      return;

    let index = 0;
    let shift = this.array.shift[this.var.mode];
    let modul = this.array.module[this.var.mode][shift];
    let hull = this.array.hull[this.var.hull];
    let parent = null;
    let child = null;
    this.array.joint = [];

    for( let i = 0; i < hull.array.way.length; i++ )
      for( let j = 0; j < hull.array.gate[i].length; j++ ){
          parent = hull.array.gate[i][j];
          let way = ( i + 2 ) % hull.array.way.length;
          for( let l = 0; l < modul.array.gate[way].length; l++ ){
              child = modul.array.gate[way][l];
              this.checkFreeSpace( index, parent, child );
              index++;
          }
      }

    if( this.array.joint.length > 0 && this.var.joint != undefined )
      this.attachToHull( modul, this.array.joint[this.var.joint] );
  }

  //gate kind match check and check for the existence of a free place
  checkFreeSpace( index, parent, child ){
    let shift = this.array.shift[this.var.mode];
    let modul = this.array.module[this.var.mode][shift];
    let hull = this.array.hull[this.var.hull];
    let cVec = modul.convertIndex( child.const.index );
    let pVec = hull.convertIndex( parent.const.index );
    let cBlock = modul.array.block[cVec.y][cVec.x];
    let pBlock = hull.array.grid[pVec.y][pVec.x];
    let join;

    let begin = parent.const.index;
    let end = parent.const.index;
    switch ( parent.var.way ) {
      case 0:
        end += hull.const.n;
        break;
      case 1:
        end -= 1;
        break;
      case 2:
        end -= hull.const.n;
        break;
      case 3:
        end += 1;
        break;
    }

    //merger opportunity
    if( pBlock.var.sequence == cBlock.var.sequence )
      join = new joint( index, parent, child, begin, end );
    else
      return;

    let childVec = modul.convertIndex( join.var.child.const.index );
    let parentVec = hull.convertIndex( join.var.parent.const.index );

    for( let i = 0; i < modul.array.block.length; i++ )
      for( let j = 0; j < modul.array.block[i].length; j++ ){
        let x = j + parentVec.x - childVec.x;
        let y = i + parentVec.y - childVec.y;
        /*let block = mod.array.block[i][j];
        let index = hull.array.grid[y][x].const.index;
        let partition = mod.array.block[i][j].var.partition;*/

        //place to merge
        if( hull.array.grid[y][x].var.status == 'selected' )
          return;
      }

      for( let i = 0; i < hull.array.gate.length; i++ )
        for( let j = 0; j < hull.array.gate[i].length; j++ ){
          let index = hull.array.gate[i][j].const.index;
          let vec = hull.convertIndex( index );

          let x = vec.x - parentVec.x + childVec.x;
          let y = vec.y - parentVec.y + childVec.y;
          if( x >= 0 && x < modul.const.block.x &&
              y >= 0 && y < modul.const.block.y ){
                let block = modul.array.block[y][x];

                //ban on connecting wall and door
                if( block.var.interior != 'door' )
                  return;
              }
        }

    this.array.joint.push( join );
  }

  //
  addModule(){
    let i = this.var.mode;
    let index = this.array.module[i].length;
    let l = this.array.option[i].length;
    let rand = Math.floor( Math.random() * l );
    let grade = this.array.option[i][rand];
    if( this.var.mode == 2 )
      grade = 10;
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

  //
  rotateModule( buttonID ){
    let index = null;
    let clockwise;
    let obj;
    let x;
    let y;

    index = this.array.shift[this.var.mode];
    obj = this.array.module[this.var.mode][index];
    x = obj.const.block.x - 1;
    y = obj.const.block.y / 2;

    if ( buttonID % 2 == 1 )
      clockwise = true;
    else
      clockwise = false;

    for (let i = 0; i < y; i++)
      for (let j = i; j < x - i; j++){
        let temp;
        let value;
        let target;
        let nexts = [
          createVector( x - j, i ),
          createVector( x - i, x - j  ),
          createVector( j, x - i ) ];
        let currents = [
          createVector( i, j ),
          createVector( x - j, i ),
          createVector( x - i, x - j  ),
          createVector( j, x - i ) ];
        if( clockwise ){
          nexts = [
            createVector( j, x - i ),
            createVector( x - i, x - j ),
            createVector( x - j, i ) ];
          currents = [
            createVector( i, j ),
            createVector( j, x - i ),
            createVector( x - i, x - j ),
            createVector( x - j, i ) ];
        }

        temp = new block();
        temp.copy( obj.array.block[i][j], 1 );

        for( let l = 0; l < nexts.length; l++ ){
          value = obj.array.block[nexts[l].x][nexts[l].y];
          target = obj.array.block[currents[l].x][currents[l].y];
          target.copy( value, 1 );
        }

        target = obj.array.block[currents[3].x][currents[3].y];
        target.copy( temp, 1 );
      }

    obj.updateGateway();

    let hull = this.array.hull[this.var.hull];
    hull.cleanGrid();
    this.tryAttach();
  }

  //
  lockModule(){
    if( this.array.module[this.var.mode].length == 0 )
      return;

    if( this.array.joint[this.var.joint] == undefined )
      return;

    let hull = this.array.hull[this.var.hull];

    for( let i = 0; i < hull.array.grid.length; i++ )
      for( let j = 0; j < hull.array.grid[i].length; j++ )
        if( hull.array.grid[i][j].var.status == 'proposed' )
          hull.array.grid[i][j].setStatus( 2 );

    this.updateHull();
    this.updateModules();
    this.tryAttach();

    console.log( hull.array.gate )
  }

  //bring the statuses of all the block to the default value
  cleanModules(){
    for( let i = 0; i < this.array.module.length; i++ )
      for( let j = 0; j < this.array.module[i].length; j++ )
        this.array.module[i][j].setStatus( 0 );
  }

  //change the status and location of all modules
  updateModules( step ){
    if( this.array.module[this.var.mode] == 0 )
      return;

    this.updateShift( step );
    this.cleanModules();

    let i = this.var.mode;
    let j = this.array.shift[i];

    if( this.array.hull[this.var.hull].array.module.length > 0 )
      console.log( 'mode', i, 'shift', j, '=', this.array.shift[i], '+', this.var.joint )

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

    this.tryAttach();
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

    let hull = this.array.hull[this.var.hull];
    hull.cleanGrid();
    this.tryAttach();
  }

  //
  shiftJoint( shift ){
    if( this.array.joint.length < 2 )
      return;

    let hull = this.array.hull[this.var.hull];
    hull.cleanGrid();

    this.var.joint = ( this.var.joint + shift + this.array.joint.length ) % this.array.joint.length;
    this.tryAttach();
  }

  draw(){
    if( this.array.module.length == 0 )
      return;

    let i = this.var.mode;

    this.array.module[i].forEach( function( element ){
      element.draw();
    });

    this.array.hull[this.var.hull].draw( this.array.edit[1] );
  }
}
