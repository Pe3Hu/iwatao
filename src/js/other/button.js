class button {
  constructor ( index, layer, name, type, center ){
    this.index = index;
    this.layer = layer;
    this.name = name;
    this.type = type;
    this.center = center;
    this.color = color( colorMax / 2 );
    this.const = {
      a: cellSize,
      d: cellSize * 1,
      r: cellSize * 0.4
    };
    this.array = {
      vertex: []
    }
    this.description = null;
    this.onScreen = true;

    this.initVertexs();
  }

  initVertexs(){
    for( let i = 0; i < 12; i++ ){
      let x = this.center.x + this.const.r * Math.sin( Math.PI / 6 * ( 6 - i ) );
      let y = this.center.y + this.const.r * Math.cos( Math.PI / 6 * ( 6 - i ) );
      let vec = createVector( x, y );
      this.array.vertex.push( vec );
    }
  }

  setDescription( txt ){
    this.description = txt;
  }

  draw( layer ){
    if ( ( this.layer == layer || this.layer == 99 ) && this.onScreen ){
      let a = null;
      let b = null;
      let c = null;

      //draw layer change buttons
      if ( this.type > -1 && this.type < 2 ){
        switch ( this.type ) {
          case 0:
            fill( 'blue' );
            break;
          case 1:
            fill( 'green' );
            break;
        }
        rect(
          this.center.x - this.const.a / 2,
          this.center.y - this.const.a / 2,
          this.const.a, this.const.a
        );
      }

      //draw shift buttons
      if ( this.type > 2 && this.type < 7 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        a = ( this.type - 3 ) * 3 % this.array.vertex.length;
        b = ( a + 5 ) % this.array.vertex.length;
        c = ( a + 7 ) % this.array.vertex.length;

        fill( 'red' );
        triangle(
          this.array.vertex[a].x, this.array.vertex[a].y,
          this.array.vertex[b].x, this.array.vertex[b].y,
          this.array.vertex[c].x, this.array.vertex[c].y,
        );
      }

      //draw rotate buttons
      if ( this.type > 6 && this.type < 9 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        a = 8 - ( this.type - 7 ) * 4;
        b = ( a + 5 ) % this.array.vertex.length;
        c = ( a + 7 ) % this.array.vertex.length;

        fill( 'blue' );
        triangle(
          this.array.vertex[a].x, this.array.vertex[a].y,
          this.array.vertex[b].x, this.array.vertex[b].y,
          this.array.vertex[c].x, this.array.vertex[c].y,
        );
      }

      //draw scroll buttons
      if ( this.type > 8 && this.type < 11 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        a = ( ( this.type - 9 ) * 6 ) % this.array.vertex.length;
        b = ( a + 5 ) % this.array.vertex.length;
        c = ( a + 7 ) % this.array.vertex.length;

        fill( 'green' );
        triangle(
          this.array.vertex[a].x, this.array.vertex[a].y,
          this.array.vertex[b].x, this.array.vertex[b].y,
          this.array.vertex[c].x, this.array.vertex[c].y,
        );
      }

      //draw edit mode change buttons
      if ( this.type == 11 ){
        noStroke();
        fill('purple');
        rect(
          this.center.x - this.const.a / 2,
          this.center.y - this.const.a / 2,
          this.const.a, this.const.a
        );
      }
    }
  }
}
