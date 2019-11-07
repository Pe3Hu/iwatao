//
class meeple {
  constructor ( index, center, cell, team ){
    this.index = index;
    this.center = center.copy();
    this.const = {
      period: 12,
      frame: 2,
      team: team,
      a: cellSize / 2,
      n: 6
    };
    this.const.r = this.const.a / ( Math.tan( Math.PI / 6 ) * 2 );
    this.array = {
      pointer: [],
      danger: [],
      vertex: [],
      dot: [],
      way: [],
      bar: []
    };
    this.var = {
      orientation: 1,
      clockwise: true,
      priority: 'sleep',//sleep spend fill convergence//'automaticAttack' specialAttack
      forward: true,
      action: 'waiting',
      status: 'free',//busy
      stage: null,
      timer: null,
      stop: null,
      cell: cell,
      color:{
        h: null,
        s: null,
        l: null
      },
      speed: {
        move: 0.5,
        rotate: 0.5
      },
      angle: 0,
      beat: 1 //tact
    }
    this.data = {
      'health': {
        current: 100,
        max : 100
      },
      'mana': {
        current: 0,
        max : 100
      }
    }
    this.var.stop = fr * this.var.speed.rotate;

    this.init();
  }

  initVertexs(){
    for( let i = 0; i < this.const.n; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / this.const.n * ( - i + this.const.n / 2 ) ) * this.const.a,
        Math.cos( Math.PI * 2 / this.const.n * ( - i + this.const.n / 2 ) ) * this.const.a );
      this.array.vertex.push( vec );
    }
  }

  initPointers(){
    for( let i = 0; i < this.const.n; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / this.const.n * ( 0.5 - i + this.const.n / 2 ) ) * this.const.a * 1.2,
        Math.cos( Math.PI * 2 / this.const.n * ( 0.5 - i + this.const.n / 2 ) ) * this.const.a * 1.2 );
      this.array.pointer.push( vec );
    }
  }

  initWays(){
    for( let i = 0; i < this.const.n; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / this.const.n * ( - 0.5 - i + this.const.n / 2 ) ) * this.const.r * 4,
        Math.cos( Math.PI * 2 / this.const.n * ( - 0.5 - i + this.const.n / 2 ) ) * this.const.r * 4);
      this.array.way.push( vec );
    }
  }

  initBars(){
    this.array.bar.push( new  bar( createVector(), 7, 'health' ) );
    this.array.bar.push( new  bar( createVector(), 8, 'mana' ) );
    this.array.bar[0].setPoints( this.data['health'] );
    this.array.bar[1].setPoints( this.data['mana'] );
  }

  initColor(){
    switch ( this.const.team ) {
      case 0:
        this.var.color.h = 120;
        this.var.color.s = colorMax;
        this.var.color.l = colorMax;
        break;
      case 1:
        this.var.color.h = 0;
        this.var.color.s = colorMax;
        this.var.color.l = 0;
        break;
    }
  }

  init(){
    this.initVertexs();
    this.initPointers();
    this.initWays();
    this.initBars();
    this.initColor();
  }

  setCell( cell ){
    this.var.cell = cell;
    this.array.dot = [];
  }

  setAction( action ){
    let vec;
    let origin;

    switch ( action ) {
      case 0:
        this.var.action = 'waiting';
        this.array.dot = [];
        break;
      case 1:
        this.var.action = 'moving';
        vec = this.array.way[this.var.orientation].copy();
        origin = this.array.way[this.var.orientation].copy();
        origin.normalize();
        origin.mult( this.const.r );
        vec.div( 2 );
        vec.add( this.center.copy() );
        vec.sub( origin );
        this.array.dot.push( vec.copy() );
        vec.add( origin );
        vec.add( origin );
        this.array.dot.push( vec.copy() );
        vec.add( origin );
        this.array.dot.push( vec.copy() );
        break;
      case 2:
        this.var.action = 'clockwiseRotating';
        this.var.clockwise = true;
        this.var.timer = 0;
        break;
      case 3:
        this.var.action = 'counterClockwiseRotating';
        this.var.clockwise = false;
        this.var.timer = 0;
        break;
      case 4:
        this.var.action = 'attacking';
        this.array.dot.push( this.center.copy() );
        vec = this.array.way[this.var.orientation].copy();
        origin = this.array.way[this.var.orientation].copy();
        origin.normalize();
        origin.mult( this.const.r );
        vec.div( 2 );
        vec.add( this.center.copy() );
        vec.sub( origin );
        this.array.dot.push( vec.copy() );
        break;
    }
  }

  setPriority( prior, meeples ){
    switch ( prior ) {
      case 0:
        this.var.priority = 'sleep';
        break;
      case 1:
        this.var.priority = 'convergence';
        this.selectTarget( meeples );
        break;
      case 2:
        this.var.priority = 'attack';
        this.setAction( 4 );
        break;
    }
  }

  addThreat( meeple ){
    this.array.danger.push( {
      target: meeple,
      value: 0,
    } );

  }

  sortThreats(){
    for( let i = 0; i < this.array.danger.length - 1; i++ ){
      let finish = true;
      for( let j = 0; i < this.array.danger.length - 1 - i; j++ )
        if ( this.array.danger[j].value > this.array.danger[j + 1].value ) {
            let temp = this.array.danger[j];
            this.array.danger[j] = this.array.danger[j + 1];
            this.array.danger[j + 1] = temp;
            finish = false;
        }

      if ( finish )
        break;
    }
  }

  selectTarget( meeples ){
    this.sortThreats();
    let index = this.array.danger[0].target;
    let cell = meeples[index].var.cell;
    this.var.target = cell;
    //return this.var.target;
  }

  draw(){
    noStroke();
    for( let i = 0; i < this.array.vertex.length; i++ ){
      let ii = ( i + 1 ) % this.array.vertex.length;
      fill( this.var.color.h, this.var.color.s, this.var.color.l );
      triangle( this.center.x, this.center.y,
                this.array.vertex[i].x  + this.center.x, this.array.vertex[i].y + this.center.y,
                this.array.vertex[ii].x + this.center.x, this.array.vertex[ii].y + this.center.y );
      if( i == this.var.orientation ){
        fill( this.var.color.h, this.var.color.s, this.var.color.l );
        triangle( this.array.pointer[ii].x  + this.center.x, this.array.pointer[ii].y + this.center.y,
                  this.array.vertex[i].x  + this.center.x, this.array.vertex[i].y + this.center.y,
                  this.array.vertex[ii].x + this.center.x, this.array.vertex[ii].y + this.center.y );
      }
     }

     for( let i = 0; i < this.array.bar.length; i++ )
        this.array.bar[i].draw( this.center );

     noFill();
  }
}
