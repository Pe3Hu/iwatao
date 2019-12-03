//the basic element of which consists module
class block {
  constructor( index, center, scale ){
    this.const = {
      index: index,
      scale: scale,
      size: createVector( cellSize * scale, cellSize * scale ),
      color: {
        background: color( 0, 0, colorMax * 4 / 5 ),
        partition: color( colorMax * 0.5, colorMax * 0.25, colorMax * 0.25 ),
        gateway: color( colorMax * 5 / 6, colorMax, colorMax * 0.5 ),
        gateway2: color( colorMax * 2 / 6, colorMax, colorMax * 0.5 ),
        focus: color( colorMax / 7, colorMax, colorMax * 0.6 )
      }
    };
    this.var = {
      center: center,
      kind: null,
      sequence: null,
      partition: null,
      interior: 'floor',
      content: 'empty',
      status: 'forgotten',
    }
  }

  //determine the display method
  setStatus( stat ){
    switch ( stat ) {
      //do not show
      case 0:
        this.var.status = 'forgotten';
        break;
      //show as an option
      case 1:
        this.var.status = 'proposed';
        break;
      //show as result
      case 2:
        this.var.status = 'selected';
        break;
      //show as place to insert
      case 3:
        this.var.status = 'expectant';
        break;
    }
  }

  setGate( kind, sequence ){
    this.var.kind = kind;
    this.var.sequence = sequence;
    this.var.interior = 'door';
    if( kind == null )
      this.var.interior = 'floor';
    else if ( sequence == undefined )
      console.log( '!' );
  }

  setPartition( partition ){
    this.var.partition = partition;
    this.var.interior = 'wall';
    if( this.var.partition == null )
      this.var.interior = 'floor';
    this.setStatus( 2 );
  }

  setContent( content ){
    this.var.content = content;
  }

  setVisible( visible ){
    this.visible = visible;
  }

  copy( block, type ){
    //this.visible = block.visible;
    this.var.content = block.var.content;
    this.var.interior = block.var.interior;
    this.var.kind = block.var.kind;
    this.var.sequence = block.var.sequence;
    this.setStatus( 1 );

    if( type == 0 )
      this.var.partition = block.var.partition;
  }

  free(){
    return ( this.var.status == 'selected' || this.var.status == 'forgotten' )
  }

  //drawing block
  draw( offset ){
    //if( this.var.status == 'forgotten' )
    //  return;
    fill( this.const.color.background );

    if( this.var.interior == 'door' ){
      if( this.var.status == 'expectant' )
        fill( this.const.color.gateway2 );
      if( this.var.status == 'selected' || this.var.status == 'proposed' )
        fill( this.const.color.gateway );
    }
    if( this.var.content == 1 )
      fill( this.const.color.focus );
    rect(
      offset.x + this.var.center.x - this.const.size.x / 2,
      offset.y + this.var.center.y - this.const.size.y / 2,
      this.const.size.x, this.const.size.y );

    fill( this.const.color.partition );
    if( this.var.interior == 'wall' )
      switch ( this.var.partition ) {
        case 0:
          rect(
            offset.x + this.var.center.x - this.const.size.x / 2,
            offset.y + this.var.center.y - this.const.size.y / 2,
            this.const.size.x, this.const.size.y / 4);
          break;
        case 1:
          rect(
            offset.x + this.var.center.x + this.const.size.x / 4,
            offset.y + this.var.center.y - this.const.size.y / 2,
            this.const.size.x / 4, this.const.size.y );
          break;
        case 2:
          rect(
            offset.x + this.var.center.x - this.const.size.x / 2,
            offset.y + this.var.center.y + this.const.size.y / 4,
            this.const.size.x, this.const.size.y / 4);
          break;
        case 3:
          rect(
            offset.x + this.var.center.x - this.const.size.x / 2,
            offset.y + this.var.center.y - this.const.size.y / 2,
            this.const.size.x / 4, this.const.size.y );
          break;
        case 4:
          rect(
            offset.x + this.var.center.x - this.const.size.x / 2,
            offset.y + this.var.center.y - this.const.size.y / 2,
            this.const.size.x, this.const.size.y / 4);
          rect(
            offset.x + this.var.center.x + this.const.size.x / 4,
            offset.y + this.var.center.y - this.const.size.y / 2,
            this.const.size.x / 4, this.const.size.y );
          break;
        case 5:
          rect(
            offset.x + this.var.center.x + this.const.size.x / 4,
            offset.y + this.var.center.y - this.const.size.y / 2,
            this.const.size.x / 4, this.const.size.y );
          rect(
            offset.x + this.var.center.x - this.const.size.x / 2,
            offset.y + this.var.center.y + this.const.size.y / 4,
            this.const.size.x, this.const.size.y / 4);
          break;
        case 6:
          rect(
            offset.x + this.var.center.x - this.const.size.x / 2,
            offset.y + this.var.center.y + this.const.size.y / 4,
            this.const.size.x, this.const.size.y / 4);
          rect(
            offset.x + this.var.center.x - this.const.size.x / 2,
            offset.y + this.var.center.y - this.const.size.y / 2,
            this.const.size.x / 4, this.const.size.y );
          break;
        case 7:
          rect(
            offset.x + this.var.center.x - this.const.size.x / 2,
            offset.y + this.var.center.y - this.const.size.y / 2,
            this.const.size.x / 4, this.const.size.y );
          rect(
            offset.x + this.var.center.x - this.const.size.x / 2,
            offset.y + this.var.center.y - this.const.size.y / 2,
            this.const.size.x, this.const.size.y / 4);
          break;
      }

    //draw text
    textSize( fontSize * this.const.scale * 0.7 );
    fill( 0 );
    //if( this.var.interior != 'floor' )
    text( this.const.index, offset.x + this.var.center.x, offset.y + this.var.center.y + fontSize / 6 );
    textSize( fontSize );
  }
}
