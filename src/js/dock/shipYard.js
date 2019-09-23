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
      edit: [],
      way: [ 'up', 'right', 'down', 'left' ]
    };
    this.var = {
      gate: {
        way: null,
        index: null,
        kind: null
      },
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

    this.var.mode = 2;
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

  updateHull(){
    let m = this.array.shift[this.var.mode];
    let mod = this.array.module[this.var.mode][m];
    let hull = this.array.hull[this.var.hull];
    let joint = this.array.joint[this.var.joint];
    let parent = hull.convertIndex( joint.parent );
    let child = mod.convertIndex( joint.child );

    //update joint in locked module
    mod.setJoint( joint );

    hull.array.module.push( mod );
    this.array.module[this.var.mode].splice( m, 1 );

    //update values in shift and id arrays
    this.array.shift[this.var.mode] = this.array.id[this.var.mode].shift();
    for( let i = 0; i < this.array.id[this.var.mode].length; i++ )
      if( this.array.id[this.var.mode][i] > this.array.shift[this.var.mode] )
      this.array.id[this.var.mode][i]--;

    for( let i = 0; i < hull.array.gateway.length; i++ ){
      let index = hull.array.gateway[i].indexOf( joint.parent );
      //remove used gateway
      if( index != -1 )
        hull.array.gateway[i].splice( index, 1 );

      for( let j = 0; j < mod.array.gateway[i].length; j++ )
        //adding new options in gateway array
        if( mod.array.gateway[i][j] != joint.child ){
          let grid = mod.convertIndex( mod.array.gateway[i][j] );
          grid.x += parent.x - child.x;
          grid.y += parent.y - child.y;

          let kind = hull.array.grid[grid.y][grid.x].gateKind;
          let index = hull.convertGrid( grid );
          index += hull.array.way[i];
          hull.array.gateway[i].push( index );

          let couple = hull.convertIndex( index );
          hull.array.grid[couple.y][couple.x].setKind( kind );
          hull.array.grid[couple.y][couple.x].setStatus( 3 );

          if( hull.array.module.length > 0 )
            console.log( index, kind,
              grid.x, grid.y, hull.array.grid[grid.y][grid.x].gateKind, hull.array.grid[grid.y][grid.x].status,
              couple.x, couple.y, hull.array.grid[couple.y][couple.x].gateKind, hull.array.grid[couple.y][couple.x].status )
      }
    }

    for( let i = 0; i < hull.array.grid.length; i++ )
      for( let j = 0; j < hull.array.grid[i].length; j++ )
        if( hull.array.grid[i][j].status == 'expectant' )
          console.log( 'expectant', hull.array.grid[i][j].index, hull.array.grid[i][j].gateKind )




    for( let i = 0; i < hull.array.grid.length; i++ )
      for( let j = 0; j < hull.array.grid[i].length; j++ )
        if( hull.array.grid[i][j].status == 'selected' )
          console.log( 'select', hull.array.grid[i][j].index, hull.array.grid[i][j].content, hull.array.grid[i][j].interior )

    console.log( joint.parent, hull.array.gateway )
  }

  //connect the module to the hull if it is possible
  attachToHull( module, joint ){
    let hull = this.array.hull[this.var.hull];
    let childVec = module.convertIndex( joint.child );
    let parentVec = hull.convertIndex( joint.parent );

    hull.cleanGrid();

    for( let i = 0; i < module.array.block.length; i++ )
      for( let j = 0; j < module.array.block[i].length; j++ ){
        let x = j + parentVec.x - childVec.x;
        let y = i + parentVec.y - childVec.y;
        let block = module.array.block[i][j];
        hull.array.grid[y][x].copy( block, 0 );
      }

      if( module.status == 'edit' && module.const.type == 3 )
        for( let i = 0; i < hull.array.grid.length; i++ )
          for( let j = 0; j < hull.array.grid[i].length; j++ )
            if( hull.array.grid[i][j].status == 'proposed' )
              if( hull.array.grid[i][j].gateKind != null )
                console.log( 'attach', hull.array.grid[i][j].index, hull.array.grid[i][j].gateKind )

  }

  //formation of an array of possible joints
  tryAttach(){
    if( this.array.module[this.var.mode].length == 0 )
      return;

    let index = 0;
    let m = this.array.shift[this.var.mode];
    let mod = this.array.module[this.var.mode][m];
    let hull = this.array.hull[this.var.hull];
    let parent = null;
    let child = null;
    this.array.joint = [];

    for( let i = 0; i < this.array.way.length; i++ )
      for( let j = 0; j < hull.array.gateway[i].length; j++ ){
          parent = this.array.hull[this.var.hull].array.gateway[i][j];
          let way = ( i + 2 ) % this.array.way.length;
          for( let l = 0; l < mod.array.gateway[way].length; l++ ){
              child = mod.array.gateway[way][l];
              this.checkFreeSpace( index, parent, child, i );
              index++;
          }
      }

    if( hull.array.module.length > 0 )
      console.log( hull.array.gateway, this.array.joint )

    if( this.array.joint.length > 0 && this.var.joint != undefined )
      this.attachToHull( mod, this.array.joint[this.var.joint] );
  }

  //gate kind match check and check for the existence of a free place
  checkFreeSpace( index, parent, child, way ){
    let m = this.array.shift[this.var.mode];
    let mod = this.array.module[this.var.mode][m];
    let hull = this.array.hull[this.var.hull];
    let cVec = mod.convertIndex( child );
    let pVec = hull.convertIndex( parent );
    let cBlock = mod.array.block[cVec.x][cVec.y];
    let pBlock = hull.array.grid[pVec.x][pVec.y];
    let join;

    if( hull.array.module.length > 0 ){
        console.log( parent, pVec.x, pVec.y, pBlock.gateKind, hull.array.grid[pVec.x][pVec.y].index )
        console.log( child, cVec.x, cVec.y, cBlock.gateKind,  mod.array.block[cVec.x][cVec.y].index )
    }
    if( pBlock.gateKind == cBlock.gateKind )
      join = new joint( index, parent, child, way );
    else
      return;

    let childVec = mod.convertIndex( join.child );
    let parentVec = hull.convertIndex( join.parent );

    for( let i = 0; i < mod.array.block.length; i++ )
      for( let j = 0; j < mod.array.block[i].length; j++ ){
        let x = j + parentVec.x - childVec.x;
        let y = i + parentVec.y - childVec.y;
        let block = mod.array.block[i][j];

        if( hull.array.grid[y][x].status == 'selected' )
          return;
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
      hull.cleanGrid()
      this.tryAttach()
  }

  lockModule(){
    if( this.array.module[this.var.mode].length == 0 )
      return;

    let hull = this.array.hull[this.var.hull];

    for( let i = 0; i < hull.array.grid.length; i++ )
      for( let j = 0; j < hull.array.grid[i].length; j++ ){
        if( hull.array.grid[i][j].status == 'proposed' )
          hull.array.grid[i][j].setStatus( 2 );
          if( hull.array.grid[i][j].gateKind != null )
            console.log( 'lock', hull.array.grid[i][j].index, hull.array.grid[i][j].gateKind )
      }

    this.updateHull();
    this.updateModules();
    this.tryAttach();

    console.log( this.array.joint[this.var.joint] )
    console.log( hull.array.module, this.array.shift[this.var.mode], this.array.id[this.var.mode] )

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

    this.cleanModules();
    this.updateShift( step );

    let i = this.var.mode;
    let j = this.array.shift[i];

    if( this.array.hull[this.var.hull].array.module.length > 0 )
      console.log( i, j, this.array.shift[i], '+', this.var.joint )

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
    hull.cleanGrid()
    this.tryAttach()
  }

  shiftJoint( shift ){
    if( this.array.joint.length < 2 )
      return;

    this.var.joint = ( this.var.joint + shift + this.array.joint.length ) % this.array.joint.length;
    //console.log( this.var.joint, this.array.joint )

    let m = this.array.shift[this.var.mode];
    let mod = this.array.module[this.var.mode][m];
    let joint = this.array.joint[this.var.joint];
    let hull = this.array.hull[this.var.hull];
    this.attachToHull( mod, joint );
    if( hull.array.module.length > 0 )
      console.log( joint )
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
