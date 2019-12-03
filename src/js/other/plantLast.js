//character development material
class plant {
  constructor ( index, center, orientation ){
    this.center = center;
    this.orientation = orientation;
    this.const = {
      index:  index,
      ring: 3,
      parts: 3,
      a: cellSize,
      r: cellSize * Math.sqrt( 3 ) / 6,
      R: cellSize * Math.sqrt( 3 ) / 3
    };
    this.array = {
      delta: [[]],
      axis: [],
      option: [],
      trace: []
    };
    this.var = {
      index: 0,
      near: 0,
      far: 1
    }
    this.axis = {
      a: null,
      b: null,
      c: null
    }

    this.initAxis();

    this.initPrimaryDelta();

    //init everyone else deltas
    for (let i = 1; i < this.const.ring; i++)
      this.initNewRing( i );

    this.initNeighbors();

    //this.addRandDeltas( 4 );
    //this.addDelta( index );
  }

  //set motion vectors along the axis
  initAxis(){
    this.axis.a = createVector(
      Math.sin( Math.PI * 2 / 3 ) * this.const.R,
      Math.cos( Math.PI * 2 / 3 ) * this.const.R );
    this.axis.b = createVector(
      Math.sin( Math.PI * 6 / 3 ) * this.const.R,
      Math.cos( Math.PI * 6 / 3 ) * this.const.R );
    this.axis.c = createVector(
      Math.sin( Math.PI * 4 / 3 ) * this.const.R,
      Math.cos( Math.PI * 4 / 3 ) * this.const.R );
    this.array.axis.push( [ this.axis.a, this.axis.b, this.axis.c ] );
  }

  //set a reference point
  initPrimaryDelta(){
    this.array.delta[0].push( new delta( this.var.index, this.orientation, this.center ));
    this.array.delta[0][0].setStatus( 2 );
    this.var.index++;
  }

  initNewRing( i ){
    this.array.delta.push([]);

    for (let p = 0; p < this.const.parts; p++)
      this.initRingPart( i, p );

    if( i % 2 ==  0 )
      this.var.near++;
    else
      this.var.far++;
    }

  //set one of the three symmetrical parts of the ring
  initRingPart( i, p ){
    if ( this.orientation )
      this.initTrueDelta( i, p );
    else
      this.initFalseDelta( i, p );
  }

  //set oriented up deltas
  initTrueDelta( i, p ){
    let orientation = this.orientation;
    if (( this.var.near + this.var.far ) % 2 )
      orientation = !this.orientation;
    let vec1 = this.center.copy();
    let wayID = p * 2;
    this.offsetTo( wayID, i, this.orientation, vec1 );

    //far delta
    for (let j = 0; j < this.var.far; j++){
      let wayID2 = p * 2 + 2;
      if ( j != 0 )
        this.offsetTo( wayID2, 2 , orientation, vec1 );
      this.array.delta[i].push( new delta( this.var.index, orientation, vec1.copy() ));
      this.var.index++;
    }

    //near delta
    for (let j = 0; j < this.var.near; j++){
      let wayID2 = p * 2 + 3;
      this.offsetTo( wayID2, 2, orientation, vec1 );
      this.array.delta[i].push( new delta( this.var.index, orientation, vec1.copy() ));
      this.var.index++;
    }
  }

  //set oriented down deltas
  initFalseDelta( i, p ){
    let orientation = this.orientation;
    if (( this.var.near + this.var.far ) % 2 )
      orientation = !this.orientation;
    let vec1 = this.center.copy();
    let wayID = p * 2 + 1;
    this.offsetTo( wayID, i, this.orientation, vec1 );

    //far delta
    for (let j = 0; j < this.var.far; j++){
      let wayID2 = p * 2 + 3;
      if ( j != 0 )
        this.offsetTo( wayID2, 2 , orientation, vec1 );
      this.array.delta[i].push( new delta( this.var.index, orientation, vec1.copy() ));
      this.var.index++;
    }

    //near delta
    for (let j = 0; j < this.var.near; j++){
      let wayID2 = p * 2 + 4;
      this.offsetTo( wayID2, 2, orientation, vec1 );
      this.array.delta[i].push( new delta( this.var.index, orientation, vec1.copy() ));
      this.var.index++;
    }
  }

  //shift the given vector by the selected axis
  offsetTo( wayID, steps, orientation, vec ){
    let ways = [ 'NNE', 'E', 'SSE', 'SSW', 'W', 'NNW' ];
    let id = wayID % 6;
    let scalFirst = Math.floor( steps / 2 );
    let scalSecond = Math.floor( steps / 2 );
    let first = null;
    let second = null;
    if ( orientation )
      scalFirst += steps % 2;
    else
      scalSecond += steps % 2;
      switch ( ways[id] ) {
        case 'NNE':
          first = this.axis.a.copy();
          second = this.axis.b.copy();
          first.mult( scalFirst );
          second.mult( -1 * scalSecond );
          vec.add( first );
          vec.add( second );
          break;
        case 'E':
          first = this.axis.a.copy();
          second = this.axis.c.copy();
          first.mult( scalFirst );
          second.mult( -1 * scalSecond );
          vec.add( first );
          vec.add( second );
          break;
        case 'SSE':
          first = this.axis.b.copy();
          second = this.axis.c.copy();
          first.mult( scalFirst );
          second.mult( -1 * scalSecond );
          vec.add( first );
          vec.add( second );
          break;
        case 'SSW':
          first = this.axis.b.copy();
          second = this.axis.a.copy();
          first.mult( scalFirst );
          second.mult( -1 * scalSecond );
          vec.add( first );
          vec.add( second );
          break;
        case 'W':
          first = this.axis.c.copy();
          second = this.axis.a.copy();
          first.mult( scalFirst );
          second.mult( -1 * scalSecond );
          vec.add( first );
          vec.add( second );
          break;
        case 'NNW':
          first = this.axis.c.copy();
          second = this.axis.b.copy();
          first.mult( scalFirst );
          second.mult( -1 * scalSecond );
          vec.add( first );
          vec.add( second );
          break;
    }
  }

  //pick up each delta neighbor
  initNeighbors(){
    for (let i = 0; i < this.array.delta.length - 1; i++)
      for (let j = 0; j < this.array.delta[i].length; j++)
        this.bruteForceNeighbor( i, j );

    //set primary neighbor
    let aID = this.contactByIndex( 0 ).neighbor.a;
    let bID = this.contactByIndex( 0 ).neighbor.b;
    let cID = this.contactByIndex( 0 ).neighbor.c;
    let a = this.contactByIndex( aID );
    let b = this.contactByIndex( bID );
    let c = this.contactByIndex( cID );
    this.array.option.push({
      index: a.index,
      axis: 'a',
      orientation: a.orientation.flag
    });
    this.array.option.push({
      index: b.index,
      axis: 'b',
      orientation: b.orientation.flag
    });
    this.array.option.push({
      index: c.index,
      axis: 'c',
      orientation: c.orientation.flag
    });

    this.updateOptions();
  }

  bruteForceNeighbor( i, j ){
    let a = this.array.delta[i][j].center.copy();
    let b = this.array.delta[i][j].center.copy();
    let c = this.array.delta[i][j].center.copy();
    let maxDist = 0.1;
    let wayID = 0;
    let orientation = this.orientation;

    if ( i  % 2 )
      orientation = !this.orientation;
    if ( !orientation )
      wayID = 3;
    this.offsetTo( wayID, 1, orientation, a );
    wayID += 2;
    this.offsetTo( wayID, 1, orientation, b );
    wayID += 2;
    this.offsetTo( wayID , 1, orientation, c );

    for (let l = 0; l < this.array.delta[i + 1].length; l++){
      //check axis a
      if( this.array.delta[i + 1][l].center.dist( a ) < maxDist ){
        this.array.delta[i + 1][l].neighbor.a = this.array.delta[i][j].index;
        this.array.delta[i][j].neighbor.a = this.array.delta[i + 1][l].index;
      }
      //check axis b
      if( this.array.delta[i + 1][l].center.dist( b ) < maxDist ){
        this.array.delta[i + 1][l].neighbor.b = this.array.delta[i][j].index;
        this.array.delta[i][j].neighbor.b = this.array.delta[i + 1][l].index;
      }
      //check axis c
      if( this.array.delta[i + 1][l].center.dist( c ) < maxDist ){
        this.array.delta[i + 1][l].neighbor.c = this.array.delta[i][j].index;
        this.array.delta[i][j].neighbor.c = this.array.delta[i + 1][l].index;
      }
    }
  }

  //analog way to access an array of deltas
  contactByIndex( index ){
    let minRing = 0;
    let maxRing = Math.ceil( index / 3 );
    let ringSelection = 0;
    while ( minRing < maxRing ){
      ringSelection++;
      minRing = ringSelection * ( ringSelection + 1 ) / 2;
    }
    minRing = ringSelection * ( ringSelection - 1 ) / 2;
    let i = ringSelection;
    let j = index - 1 - minRing  * 3;
    if ( index == 0 )
      j = 0;
    return this.array.delta[i][j];
  }

  //refresh array of options
  updateOptions(){
    for( let i = 0; i < this.array.option.length; i++ ){
      let index = this.array.option[i].index;
      let delta = this.contactByIndex( index );
      if( delta.status == 'forgotten' )
        delta.status = 'proposed';
    }
  }

  //randomly add new deltas to plant
  addRandDeltas( steps ){
    let counter = steps;
    while ( counter > 0 ){
      let randID = Math.floor( Math.random() * this.array.option.length );
      this.addDelta( randID );
      counter--;
    }
  }

  //add new delta to plant
  addDelta( index ){
    let delta = this.contactByIndex( this.array.option[index].index );
    delta.setStatus( 2 );
    this.array.trace.push({
      index: this.array.option[index].index,
      axis: this.array.option[index].axis,
      orientation: this.array.option[index].orientation
    });
    this.array.option.splice( index, 1 );

    //add unseletced neighbors to array
    let a = this.contactByIndex( delta.neighbor.a );
    let b = this.contactByIndex( delta.neighbor.b );
    let c = this.contactByIndex( delta.neighbor.c );

    if ( typeof a !== 'undefined' && a.status != 'selected' )
      this.array.option.push( {
        index: a.index,
        axis: 'a',
        orientation: a.orientation.flag
       });
    if ( typeof b !== 'undefined' && b.status != 'selected' )
      this.array.option.push( {
        index: b.index,
        axis: 'b',
        orientation: b.orientation.flag
      });
    if ( typeof c !== 'undefined' && c.status != 'selected' )
      this.array.option.push( {
        index: c.index,
        axis: 'c',
        orientation: c.orientation.flag
      });

    this.updateOptions();
  }

  draw(){
    for (let i = 0; i < this.array.delta.length; i++)
      for (let j = 0; j < this.array.delta[i].length; j++)
        this.array.delta[i][j].draw();

    /*stroke(colorMax);
    line( this.center.x + this.axis.d.x, this.center.y + this.axis.d.y,
      this.center.x, this.center.y   );
    line( this.center.x + this.axis.e.x, this.center.y + this.axis.e.y,
      this.center.x, this.center.y   );
    line( this.center.x + this.axis.f.x, this.center.y + this.axis.f.y,
      this.center.x, this.center.y   );*/

  }

  check(){
    let mouseVec = createVector( mouseX, mouseY );
    let minDist = createVector( 0, 0 ).dist( mouseVec );
    let minIndex = null;

    //enumeration of possible options
    for (let i = 0; i < this.array.option.length; i++){
      let index = this.array.option[i].index;
      let delta = this.contactByIndex( index );
      let dist = mouseVec.dist( delta.center );
      if( dist < minDist && dist < this.const.r ){
        minIndex = i;
        minDist = dist;
      }
    }

    if( minIndex != null )
      this.addDelta( minIndex );
  }
}
