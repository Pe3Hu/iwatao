//dot
class fulcrum{
  constructor( index, center ){
    this.const = {
      index: index
    };
    this.var = {
      available: false,
      center: center,
      color: null,
      kind: null
    };
    this.array = {
      eighthPart: [],
      //right left angles
      clockwise: [ null, null ],
      height: [ null, null ],
      ratio: [ null, null ],
      base: [ null, null ]
    };

    this.init();
  }

  init(){
    this.updateKind();
  }

  setStatus( status ){
    switch ( status ) {
      //show unavailable
      case 0:
        this.var.available = false;
        this.array.eighthPart = [];
        this.updateKind();
        break;
      //show basic
      case 1:
        this.var.available = null;
        this.array.eighthPart = [];
        this.updateKind();
        break;
      //show all access
      case 2:
        this.var.available = true;
        this.array.eighthPart = [ 0, 1, 6, 7 ];
        this.updateKind();
        break;
      //add some access
      case 3:
        this.var.available = true;
        break;
    }
  }

  setHeight( angle, height ){
    this.array.height[angle] = height;
  }

  setAngle( fulcrum, angle, afflatus ){
    this.array.base[angle] = fulcrum.array.base[angle];
    this.array.ratio[angle] = fulcrum.array.ratio[angle];
    this.array.height[angle] = fulcrum.array.height[angle] - afflatus.var.height;
    this.array.clockwise[angle] = fulcrum.array.clockwise[angle];
    //console.log( fulcrum.array.height[angle], afflatus.var.height )
  }

  addParts( type, afflatus ){
    let add;
    switch ( type ) {
      case 0:
        add = [ 0, 1 ];
        break;
      case 1:
        add = [ 6, 7 ];
        break;
      case 2:
        add = [ 0, 1, 7 ];
        break;
      case 3:
        add = [ 0, 6, 7 ];
        break;
      case 4:
        add = [ 0, 1, 6, 7 ];
        break;
    };

    for( let i = 0; i < add.length; i++ ){
      let flag = true;
      for( let j = 0; j < this.array.eighthPart.length; j++ )
        if( add[i] == this.array.eighthPart[j] )
          flag = false;

      if( flag )
        this.array.eighthPart.push( add[i] );
    }

    this.updateKind();
  }

  kickParts( type, afflatus ){
    let kick = [];
    switch ( type ) {
      case 0:
        kick = [ 0, 1 ];
        break;
      case 1:
        kick = [ 6, 7 ];
        break;
      case 2:
        kick = [ 1 ];
        this.array.base[0] = afflatus.var.base;
        this.array.ratio[0] = afflatus.var.ratio;
        this.array.height[0] = afflatus.var.height;
        this.array.clockwise[0] = afflatus.var.clockwise;
        break;
      case 3:
        kick = [ 6 ];
        this.array.base[1] = afflatus.var.base;
        this.array.ratio[1] = afflatus.var.ratio;
        this.array.height[1] = afflatus.var.height;
        this.array.clockwise[1] = afflatus.var.clockwise;
        break;
      case 4:
        kick = [ 0 ];
        break;
      case 5:
        kick = [ 7 ];
        break;
      case 6:
        kick = [ 0, 1, 6, 7 ];
        break;
    };

    for( let i = 0; i < kick.length; i++ )
      for( let j = this.array.eighthPart.length - 1; j >= 0; j-- )
        if( kick[i] == this.array.eighthPart[j] )
          this.array.eighthPart.splice( j, 1 );

    if( this.array.eighthPart.length == 0 )
      this.var.available = false;

    this.updateKind();
  }

  updateKind(){
    let type = 0;
    for( let i = 0; i < this.array.eighthPart.length; i++ )
      switch ( this.array.eighthPart[i] ) {
        case 0:
          type += 1000;
          break;
        case 1:
          type += 100;
          break;
        case 6:
          type += 10;
          break;
        case 7:
          type += 1;
          break;
      };

    switch ( type ) {
      case 1111:
        this.var.kind = 0;
        this.var.color = color( 0, 0, colorMax );
        break;
      case 1101:
        this.var.kind = 1;
        this.var.color = color( 300, colorMax, colorMax * 0.5 );
        break;
      case 1100:
        this.var.kind = 2;
        this.var.color = color( 360, colorMax, colorMax * 0.5 );
        break;
      case 1011:
        this.var.kind = 3;
        this.var.color = color( 270, colorMax, colorMax * 0.5 );
        break;
      case 11:
        this.var.kind = 4;
        this.var.color = color( 240, colorMax, colorMax * 0.5 );
        break;
      case 1000:
        this.var.kind = 5;
        this.var.color = color( 45, colorMax, colorMax * 0.5 );
        break;
      case 1:
        this.var.kind = 6;
        this.var.color = color( 180, colorMax, colorMax * 0.5 );
        break;
      case 1001:
        this.var.kind = 7;
        this.var.color = color( 60, colorMax, colorMax * 0.5 );
        break;
      case 0:
        this.var.kind = 8;
        this.var.color = color( colorMax * 2 / 3  );
        break;
    };
  }

  //drawing fulcrum
  draw( offset ){
    stroke( this.var.color );
    if( this.var.available )
      ellipse( offset.x + this.var.center.x,
              offset.y + this.var.center.y, cellSize, cellSize );

    stroke( 0 );
    fill( 0 );
    let txt = this.const.index;
    text( txt, offset.x + this.var.center.x,
              offset.y + this.var.center.y + fontSize );
    noFill();
  }
}
