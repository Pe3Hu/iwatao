//
class meeple {
  constructor ( index, current, center ){
    this.index =  index;
    this.current = current;
    this.center = center.copy();
    this.next = null;
    this.previous = this.center.copy();
    this.const = {
      n: 6,
      a: cellSize / 2,
      period: 12,
      frame: 2
    };
    this.const.r = this.const.a / ( Math.tan( Math.PI / 6 ) * 2 );
    this.array = {
      vertex: [],
      way: []
    };
    this.var = {
      orientation: 2,
      clockwise: true,
      status: 'wait',
      speed: {
        move: 1,
        rotate: 1
      },
      stop: null,
      timer: null,
      beat: 1 //tact
    }

    this.init();
  }

  initVertexs(){
    for( let i = 0; i < this.const.n; i++ ){
      let vec = createVector(
        Math.sin( Math.PI * 2 / this.const.n * ( - i + this.const.n / 2 ) ) * this.const.r,
        Math.cos( Math.PI * 2 / this.const.n * ( - i + this.const.n / 2 ) ) * this.const.r );
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

  setStatus( stat, current, clockwise ){
    let vec;
    switch ( stat ) {
      case 0:
        this.status = 'wait';
        break;
      case 1:
        this.status = 'move';
        this.next = this.center.copy();
        if( current != null )
          this.current = current;
        vec = this.array.way[this.var.orientation].copy();
        this.next.add( vec );
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

  move(){
    let step = this.array.way[this.var.orientation].copy();
    step.div( this.var.speed.move * fr );
    let d = this.center.dist( this.next );
    if( d > cellSize / fr )
      this.center.add( step );
    else{
      this.status = 'wait';
    }
  }

  attack(){

  }

  rotate(){
    let angle = Math.PI / 3 / fr / this.var.speed.rotate;
    if( !this.var.clockwise )
      angle *= -1;
    if( this.var.timer < this.var.stop ){
      for( let i = 0; i < this.array.vertex.length; i++ ){
        this.array.vertex[i].rotate( angle )
      }
    }
    else {
      this.setStatus( 0 );
    }

    this.var.timer++;

    console.log( this.var.timer, this.var.stop, frameCount );
  }

  update(){
    switch ( this.status ) {
      case 'move':
        this.move();
        break;
      case 'rotate':
        this.rotate();
        break;
      case 'attack':
        this.attack();
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
