class button {
  constructor ( index, layer, name, type, center ){
    this.index = index;
    this.layer = layer;
    this.name = name;
    this.type = type;
    this.center = center;
    this.color = color( colorButton );
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


  draw( layer ){
    if ( ( this.layer == layer || this.layer == 99 ) && this.onScreen ){
      let d = null;

      //draw layer change buttons
      if ( this.type > -1 && this.type < 6 ){
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
            fill( 140, colorMax * 1, colorMax * 0.3 );
            break;
          case 5:
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

      //draw tptpt scroll buttons
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

      //draw module mode change buttons
      if ( this.type > 19 && this.type < 24 ){
        fill( colorMax * 0.75 );
        rect(
          this.center.x - this.const.a / 2,
          this.center.y - this.const.a / 2,
          this.const.a, this.const.a  );

        let txt = (this.type - 19 ) * 2;
        //draw text
        fill( 0 );
        text( txt, this.center.x, this.center.y + fontSize / 3 );
      }

      //draw module scroll buttons
      if ( this.type > 23 && this.type < 26 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        d = ( this.type - 24 ) * 4 + 2;

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

      //draw generate module button
      if ( this.type == 26 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        fill('yellow');
        arc( this.center.x, this.center.y, cellSize, cellSize, 0, Math.PI / 3 );
        arc( this.center.x, this.center.y, cellSize, cellSize, Math.PI * 2 / 3, Math.PI );
        arc( this.center.x, this.center.y, cellSize, cellSize, Math.PI * 4 / 3, Math.PI * 5 / 3 );

        fill( this.color );
        ellipse( this.center.x, this.center.y, cellSize / 4, cellSize / 4 );

        fill('yellow');
        ellipse( this.center.x, this.center.y, cellSize / 6, cellSize / 6 );
      }

      //draw module rotate buttons
      if ( this.type > 26 && this.type < 29 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        d = 2 + ( this.type - 27.5 ) * 2;

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

      //draw joint shift buttons
      if ( this.type > 28 && this.type < 31 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        d = 4 + ( this.type - 29.5 ) * 2;

        fill( 'purple' );
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
    }
  }
}
