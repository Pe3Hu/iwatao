//indexes for establishing a connection between modules
class joint {
  constructor( index, parent, child ){
    this.index  = index;
    this.parent = parent;
    this.child = child;
  }
}

/*
rotate( buttonID ){
  let clockwise;
  let index = null;
  let obj;
  let x;
  let y;
  switch ( buttonID ) {
    case 34:
    case 35:
      index = this.array.layer[this.var.layer].var.firstShift;
      obj = this.array.layer[this.var.layer].array.tptpt[index];
      x = obj.const.pika.x;
      y = obj.const.pika.y / 2;
      break;
    case 36:
    case 37:
      index = this.array.layer[this.var.layer].var.secondShift;
      obj = this.array.layer[this.var.layer].array.tptpt[index];
      x = obj.const.pika.x;
      y = obj.const.pika.y / 2;
      break;
  }

  if ( ( buttonID % 2 ) == 1 )
    clockwise = true;
  else
    clockwise = false;

    if ( !clockwise ){
      for (let i = 0; i < y; i++)
        for (let j = i; j < x - i; j++){
          let temp;
          let value;
          let target;
          let current = createVector( i, j );
          let next = createVector( j, x - i  );
          temp = new pika();
          temp.clone( obj.array.pika[i][j] );
          value = obj.array.pika[next.x][next.y];
          target = obj.array.pika[current.x][current.y];

          target.clone( value );
          current = next.copy();
          next.set( x - i, x - j );
          target.clone( value );
          current = next.copy();
          next.set( x - j, i );
          target.clone( value );
          current = next.copy();
          target.clone( temp );
          }
    }
    else {
      for (let i = 0; i < y; i++)
        for (let j = i; j < x - i; j++){
          let temp;
          let value;
          let target;
          let current = createVector( i, j );
          let next = createVector( x - j, i );
          temp = new pika();
          temp.clone( obj.array.pika[i][j] );
          value = obj.array.pika[next.x][next.y];
          target = obj.array.pika[current.x][current.y];

          for( let l = 0; l < currents.length; l++ )
            if( l != currents.length - 1 ){
            value = obj.array.pika[nexts[l].x][nexts[l].y];
            target = obj.array.pika[currents[l].x][currents[l].y];
            target.clone( value );
          }
            else{
            target = obj.array.pika[currents[l].x][currents[l].y];
            target.clone( temp );
          }


          target.clone( value );
          current = next.copy();
          next.set( x - i, x - j );
          target.clone( value );
          current = next.copy();
          next.set( j, x - i  );
          target.clone( value );
          current = next.copy();
          target.clone( temp );
          }
        }

    this.updateButtons();
  }
    let nexts = [
      createVector( x - j, i ),
      createVector( x - i, x - j  ),
      createVector( j, x - i ) ];
    let currents = [
      createVector( i, j ),
      createVector( x - j, i ),
      createVector( x - i, x - j  ),
      createVector( j, x - i ) ];


let nexts = [
  createVector( j, x - i ),
  createVector( x - i, x - j ),
  createVector( x - j, i ) ];
let currents = [
  createVector( i, j ),
  createVector( j, x - i ),
  createVector( x - i, x - j ),
  createVector( x - j, i ) ];
  */
