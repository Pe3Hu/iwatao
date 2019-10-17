//
class meeple {
  constructor ( index, center, cell ){
    this.index =  index;
    this.center = center.copy();
    this.const = {
      n: 6,
      a: cellSize / 2,
      period: 12,
      frame: 2
    };
    this.const.r = this.const.a / ( Math.tan( Math.PI / 6 ) * 2 );
    this.array = {
      vertex: [],
      dot: [],
      way: []
    };
    this.var = {
      orientation: 1,
      clockwise: true,
      status: 'wait',
      stage: null,
      timer: null,
      stop: null,
      cell: cell,
      speed: {
        move: 1,
        rotate: 1
      },
      angle: 0,
      beat: 1 //tact
    }
    this.priority = 'sleep';//sleep spend fill convergence//'automaticAttack' specialAttack

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

  initWays(){
    for( let i = 0; i < this.const.n; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / this.const.n * ( - 0.5 - i + this.const.n / 2 ) ) * this.const.r * 4,
        Math.cos( Math.PI * 2 / this.const.n * ( - 0.5 - i + this.const.n / 2 ) ) * this.const.r * 4);
      this.array.way.push( vec );
    }
  }

  init(){
    this.initVertexs();
    this.initWays();
  }

  setCell( cell ){
    this.var.cell = cell;
    this.array.dot = [];
  }

  setStatus( stat, clockwise ){
    let vec;
    let origin;
    switch ( stat ) {
      case 0:
        this.status = 'wait';
        break;
      case 1:
        this.status = 'move';
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
        this.status = 'rotate';
        if( clockwise != null )
          this.var.clockwise = clockwise;
        this.var.timer = 0;
        this.var.stop = fr * this.var.speed.rotate;
        break;
      case 3:
        this.status = 'attack';
        this.next = this.center.copy();
        vec = this.array.way[this.var.orientation].copy();
        vec.div( 2 );
        this.next.add( vec );
        break;
    }
  }

  setPriority( prior, target ){
    switch ( prior ) {
      case 0:
        this.priority = 'sleep';
        break;
      case 1:
        this.priority = 'convergence';
        break;
    }
  }

  draw(){
    noStroke();
    for( let i = 0; i < this.array.vertex.length; i++ ){
      fill( 270, colorMax, colorMax * 0.5 );
      if( i == this.var.orientation )
        fill( 270, colorMax, colorMax * 0.25 );
      let ii = ( i + 1 ) % this.array.vertex.length;
      triangle( this.center.x, this.center.y,
                this.array.vertex[i].x  + this.center.x, this.array.vertex[i].y + this.center.y,
                this.array.vertex[ii].x + this.center.x, this.array.vertex[ii].y + this.center.y );
     }
     noFill();
  }
}
