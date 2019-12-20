//display of gear reducers
class whirlPool {
  constructor ( offset ){
    this.offset = offset;
    this.const = {
      a: cellSize,
      l: 0,
      clutch: null
    }
    this.array = {
      gear: [],
      dot: [],
      concat: [],
      shift: []
    };
    this.var = {
      parent: null,
      child: null,
      orientation: null,
      index: 0,
      center: createVector()
    }

    this.init();

    //this.rotateGears();
  }

  initClutchs(){
    this.const.clutch = {
      3: {
        6: [ 6, 9, 10, 0, 1, 5 ],
        5: [ 5, 7, 9, 0, 2, 4 ],
        4: [ 4, 6, 7, 0, 1, 2 ],
        3: [ 3, 4, 5, 0, 1, 2 ]
      },
      4: {
        6: [ 6, 8, 9, 10, 0, 2, 3, 4 ],
        5: [ 5, 6, 8, 9, 0, 1, 3, 4 ],
        4: [ 4, 5, 6, 7, 0, 1, 2, 3 ],
        3: [ 3, 4, 4, 5, 0, 1, 1, 2 ]
      },
      5: {
        6: [ 6, 7, 8, 9, 10, 0, 1, 2, 3, 4 ],
        5: [ 5, 6, 7, 8, 9, 0, 1, 2, 3, 4 ],
        4: [ 4, 5, 5, 6, 7, 0, 1, 1, 2, 3 ],
        3: [ 3, 4, 4, 5, 5, 0, 1, 1, 2, 2 ]
      },
      6: {
        6: [ 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5 ],
        5: [ 5, 6, 7, 8, 9, 9, 0, 1, 2, 3, 4, 4 ],
        4: [ 4, 5, 5, 6, 7, 7, 0, 1, 1, 2, 3, 3 ],
        3: [ 3, 4, 4, 5, 5, 5, 0, 1, 1, 2, 2, 2 ]
      }
    }
  }

  initShifts(){
    let min = 3;
    let max = 7;
    for ( let i = min; i < max; i++ ){
      this.array.shift.push([]);
      for ( let j = 0; j < i * 2; j++ ){
        let angle = Math.PI / i *  j - Math.PI / 2;
        let r = this.const.a / Math.tan( Math.PI / i / 2 ) / 2 ;
        r += this.const.a / 2;
        let center = createVector( Math.cos( angle ), Math.sin( angle ));
        center.mult( r );
        this.array.shift[i - min].push( center.copy() );
      }
    }
  }

  initGears(){
    //this.array.dot.push( createVector( 4 * cellSize, 4 * cellSize ) );
    this.var.center = createVector( 4 * cellSize, 4 * cellSize );
    this.var.parent = 6;
    this.var.orientation = 0;

    //set first gear
    this.array.dot.push( this.var.center.copy() );
    this.array.gear.push( new gear( this.var.index, this.var.orientation, this.array.dot[this.var.index], this.var.parent ));
    this.var.index++;

    this.addGear( 5, 4 );
    this.addGear( 4, 1 );
    this.addGear( 6, 2 );
    this.addGear( 3, 4 );
    this.addGear( 5, 2 );
    this.addGear( 4, 2 );
    this.addGear( 3, 1 );
    this.addGear( 6, 2 );
    this.addGear( 5, 7 );
    this.addGear( 4, 4 );
    this.addGear( 3, 5 );
    this.addGear( 5, 3 );
    this.addGear( 4, 8 );
    this.addGear( 4, 0 );
    this.addGear( 6, 6 );
    this.addGear( 5, 7 );
    this.addGear( 4, 8 );
    this.addGear( 3, 5 );
    this.addGear( 6, 5 );
    this.addGear( 4, 10 );
    this.addGear( 3, 1 );
    this.addGear( 4, 1 );
    this.addGear( 5, 2 );
    this.addGear( 3, 0 );
  }

  shiftVector( vec, gear, dir, flag ){
    let type = gear - 3;
    let cout = 1;
    if ( !flag )
      cout = -1;
    vec.x += cout * this.array.shift[type][dir].x;
    vec.y += cout * this.array.shift[type][dir].y;
  }

  addGear( type, parentDir ){
    this.var.child = type;
    let childDir = this.const.clutch[this.var.parent][this.var.child][parentDir];
    let orientation = ( childDir % 2 + parentDir % 2 + this.var.orientation + 1) % 2;

    //console.log( type, parentDir, childDir, ' | ', parentDir % 2, this.var.orientation, orientation );
    this.shiftVector( this.var.center, this.var.parent, parentDir, true );
    this.shiftVector( this.var.center, this.var.child, childDir, false );
    this.array.dot.push( this.var.center.copy() );
    this.array.gear.push( new gear( this.var.index, orientation, this.array.dot[this.var.index], this.var.child ));

    this.var.parent = this.var.child;
    this.var.index++;
    this.var.orientation  = orientation;
  }

  init(){
    this.initClutchs();
    this.initShifts();
    this.initGears();
  }

  rotateGears(){
    for( let i = 0; i < this.array.gear.length; i++ )
      this.array.gear[i].rotate();
  }

  updateGears(){
    for( let i = 0; i < this.array.gear.length; i++ )
      this.array.gear[i].update();
  }

  //drawing greenhouse
  draw(){
    this.array.gear.forEach( function( element ){
      element.draw();
    });
  }
}
