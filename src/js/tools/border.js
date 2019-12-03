class border {
  constructor ( index, layer, name, offset, size ){
    this.const = {
      index: index
    };
    this.layer = layer;
    this.name = name;
    this.offset = offset;
    this.size = size;
    this.color = color( colorMax / 3 );
    this.onScreen = true;
  }

  draw( layer ){
    if ( ( this.layer == layer || this.layer == 99 ) && this.onScreen ){
      fill( this.color );
      rect( this.offset.x, this.offset.y, this.size.x, this.size.y );
    }
  }
}
