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
      r: cellSize * 0.4,
      n: 5,
      m: 8
    };
    this.array = {
      vertex: []
    }
    this.description = null;
    this.onScreen = true;

    this.initVertexs();
  }

  initVertexs(){
    /*for( let i = 0; i < 12; i++ ){
      let x = this.center.x + this.const.r * Math.sin( Math.PI / 6 * ( 6 - i ) );
      let y = this.center.y + this.const.r * Math.cos( Math.PI / 6 * ( 6 - i ) );
      let vec = createVector( x, y );
      this.array.vertex.push( vec );
    }*/
    for( let i = 0; i < this.const.m; i ++ ){
      this.array.vertex.push([]);
      for( let j = 0; j < this.const.n; j ++ ){
        let angle = Math.PI * 2 / this.const.n *  j - Math.PI - Math.PI/4 * i;
        let r = this.const.a / 4;
        if ( j == 0 )
          r *= 2;
        let x = this.center.x + Math.sin( angle ) * r;
        let y = this.center.y + Math.cos( angle ) * r;
        let vec = createVector( x, y );
        this.array.vertex[i].push( vec.copy() );
      }
    }

  }

  setDescription( txt ){
    this.description = txt;
  }

  draw( layer ){
    if ( ( this.layer == layer || this.layer == 99 ) && this.onScreen ){
      let d = null;

      //draw layer change buttons
      if ( this.type > -1 && this.type < 5 ){
        noStroke();
        switch ( this.type ) {
          case 0:
            fill( 340, colorMax * 1, colorMax * 0.5 );
            break;
          case 1:
            fill( 150, colorMax * 1, colorMax * 0.5 );
            break;
          case 2:
            fill( 50, colorMax * 1, colorMax * 0.5 );
            break;
          case 3:
            fill( 220, colorMax * 1, colorMax * 0.5 );
            break;
          case 4:
            fill( 300, colorMax * 1, colorMax * 0.5 );
            break;
        }
        rect(
          this.center.x - this.const.a / 2,
          this.center.y - this.const.a / 2,
          this.const.a, this.const.a
        );
      }

      //draw shift buttons
      if ( this.type > 9 && this.type < 14 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        d = ( this.type - 10 ) * 2;

        fill( 'red' );
        triangle( this.array.vertex[d][0].x, this.array.vertex[d][0].y,
          this.array.vertex[d][1].x, this.array.vertex[d][1].y,
          this.array.vertex[d][2].x, this.array.vertex[d][2].y );
        triangle( this.array.vertex[d][0].x, this.array.vertex[d][0].y,
          this.array.vertex[d][3].x, this.array.vertex[d][3].y,
          this.array.vertex[d][2].x, this.array.vertex[d][2].y );
        triangle( this.array.vertex[d][0].x, this.array.vertex[d][0].y,
          this.array.vertex[d][3].x, this.array.vertex[d][3].y,
          this.array.vertex[d][4].x, this.array.vertex[d][4].y );
      }

      //draw rotate buttons
      if ( this.type > 13 && this.type < 16 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        d = 5 - ( this.type - 14 ) * 2;

        fill( 'blue' );
        triangle( this.array.vertex[d][0].x, this.array.vertex[d][0].y,
          this.array.vertex[d][1].x, this.array.vertex[d][1].y,
          this.array.vertex[d][2].x, this.array.vertex[d][2].y );
        triangle( this.array.vertex[d][0].x, this.array.vertex[d][0].y,
          this.array.vertex[d][3].x, this.array.vertex[d][3].y,
          this.array.vertex[d][2].x, this.array.vertex[d][2].y );
        triangle( this.array.vertex[d][0].x, this.array.vertex[d][0].y,
          this.array.vertex[d][3].x, this.array.vertex[d][3].y,
          this.array.vertex[d][4].x, this.array.vertex[d][4].y );
      }

      //draw scroll buttons
      if ( this.type > 15 && this.type < 18 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );


        d = ( this.type - 16 ) * 4;

        fill( 'green' );
        triangle( this.array.vertex[d][0].x, this.array.vertex[d][0].y,
          this.array.vertex[d][1].x, this.array.vertex[d][1].y,
          this.array.vertex[d][2].x, this.array.vertex[d][2].y );
        triangle( this.array.vertex[d][0].x, this.array.vertex[d][0].y,
          this.array.vertex[d][3].x, this.array.vertex[d][3].y,
          this.array.vertex[d][2].x, this.array.vertex[d][2].y );
        triangle( this.array.vertex[d][0].x, this.array.vertex[d][0].y,
          this.array.vertex[d][3].x, this.array.vertex[d][3].y,
          this.array.vertex[d][4].x, this.array.vertex[d][4].y );
      }

      //draw edit mode change buttons
      if ( this.type == 18 ){
        noStroke();
        fill('purple');
        rect(
          this.center.x - this.const.a / 2,
          this.center.y - this.const.a / 2,
          this.const.a, this.const.a
        );
      }

      if ( this.type == 19 ){
        noStroke();
        fill('blue');
        rect(
          this.center.x - this.const.a / 2,
          this.center.y - this.const.a / 2,
          this.const.a, this.const.a
        );
      }
    }
  }
}
