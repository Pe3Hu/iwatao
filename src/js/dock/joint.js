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
          let next = createVector( j, x - 1 - i  );
          temp = new pika();
          temp.clone( obj.array.pika[i][j] );
          value = obj.array.pika[next.x][next.y];
          target = obj.array.pika[current.x][current.y];

          target.clone( value );
          current = next.copy();
          next.set( x - 1 - i, x - 1 - j );
          target.clone( value );
          current = next.copy();
          next.set( x - 1 - j, i );
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
          let next = createVector( x - 1 - j, i );
          temp = new pika();
          temp.clone( obj.array.pika[i][j] );
          value = obj.array.pika[next.x][next.y];
          target = obj.array.pika[current.x][current.y];

          target.clone( value );
          current = next.copy();
          next.set( x - 1 - i, x - 1 - j );
          target.clone( value );
          current = next.copy();
          next.set( j, x - 1 - i  );
          target.clone( value );
          current = next.copy();
          target.clone( temp );
          }
        }

    this.updateButtons();
  }
  */
