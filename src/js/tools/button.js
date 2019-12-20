class button {
  constructor ( index, layer, name, type, center ){
    this.layer = layer;
    this.name = name;
    this.type = type;
    this.center = center;
    this.color = color( colorButton );
    this.const = {
      index: index,
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
      if ( this.type > -1 && this.type < 19 ){
        noStroke();
        switch ( this.type ) {
          case 0:
            fill( 340, colorMax, colorMax * 0.5 );
            break;
          case 1:
            fill( 150, colorMax, colorMax * 0.5 );
            break;
          case 2:
            fill( 50, colorMax, colorMax * 0.5 );
            break;
          case 3:
            fill( 220, colorMax, colorMax * 0.5 );
            break;
          case 4:
            fill( 140, colorMax, colorMax * 0.3 );
            break;
          case 5:
            fill( 300, colorMax, colorMax * 0.5 );
            break;
          case 6:
            fill( 270, colorMax, colorMax * 0.5 );
            break;
          case 7:
            fill( 130, colorMax, colorMax * 0.5 );
            break;
          case 8:
            fill( 180, colorMax, colorMax * 0.5 );
            break;
          case 9:
            fill( 0, colorMax, colorMax * 0.5 );
            break;
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
            fill( 0, colorMax, colorMax * 0 );
            break;
        }
        rect(
          this.center.x - this.const.a / 2,
          this.center.y - this.const.a / 2,
          this.const.a, this.const.a
        );
      }

      //draw shift buttons
      if ( this.type > 19 && this.type < 24 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        d = ( this.type - 20 ) * 2;

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
      if ( this.type > 23 && this.type < 26 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        d = 5 - ( this.type - 24 ) * 2;

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
      if ( this.type > 25 && this.type < 28 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        d = ( this.type - 26 ) * 4;

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
      if ( this.type == 28 ){
        noStroke();
        fill('purple');
        rect(
          this.center.x - this.const.a / 2,
          this.center.y - this.const.a / 2,
          this.const.a, this.const.a
        );
      }

      if ( this.type == 29 ){
        noStroke();
        fill('blue');
        rect(
          this.center.x - this.const.a / 2,
          this.center.y - this.const.a / 2,
          this.const.a, this.const.a
        );
      }

      //draw module mode change buttons
      if ( this.type > 29 && this.type < 34 ){
        fill( colorMax * 0.75 );
        rect(
          this.center.x - this.const.a / 2,
          this.center.y - this.const.a / 2,
          this.const.a, this.const.a  );

        let txt = (this.type - 29 ) * 2;
        //draw text
        fill( 0 );
        text( txt, this.center.x, this.center.y + fontSize / 3 );
      }

      //draw module scroll buttons
      if ( this.type > 33 && this.type < 36 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        d = ( this.type - 34 ) * 4 + 2;

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
      if ( this.type == 36 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        fill('yellow');
        arc( this.center.x, this.center.y, cellSize, cellSize, 0, Math.PI / 3 );
        arc( this.center.x, this.center.y, cellSize, cellSize, Math.PI * 2 / 3, Math.PI );
        arc( this.center.x, this.center.y, cellSize, cellSize, Math.PI * 4 / 3, Math.PI * 5 / 3 );

        fill( this.color );
        ellipse( this.center.x, this.center.y, cellSize / 3, cellSize / 3 );

        fill('yellow');
        ellipse( this.center.x, this.center.y, cellSize / 6, cellSize / 6 );
      }

      //draw module rotate buttons
      if ( this.type > 36 && this.type < 39 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        d = 2 + ( this.type - 37.5 ) * 2;

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
      if ( this.type > 38 && this.type < 41 ){
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        d = 4 + ( this.type - 39.5 ) * 2;

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

      //draw lock button
      if ( this.type == 41 ){
        let a = 0.3;
        let b = 0.4;
        let c = 0.09;
        let d = 0.18;
        let offsetY = -0.19 * cellSize;
        let shackle = 0.125 * cellSize;
        let radius = 0.45;
        let gap = radius - 0.2;
        let keyhole = 0.15;
        noStroke();
        fill( this.color );
        ellipse( this.center.x, this.center.y, this.const.d, this.const.d );

        //draw shackle
        fill( 'yellow' );
        arc( this.center.x, this.center.y + offsetY, cellSize * radius, cellSize * radius, Math.PI, Math.PI * 2 );
        //ellipse( this.center.x, this.center.y + offsetY, cellSize * radius, cellSize * radius );

        fill( this.color );
        ellipse( this.center.x, this.center.y + offsetY, cellSize * gap , cellSize * gap );

        fill( 'yellow' );
        triangle( this.center.x + cellSize * gap / 2, this.center.y + offsetY,
          this.center.x + cellSize * radius / 2, this.center.y + offsetY,
          this.center.x + cellSize * radius / 2, this.center.y + shackle + offsetY );
        triangle( this.center.x + cellSize * gap / 2, this.center.y + offsetY,
          this.center.x + cellSize * gap / 2, this.center.y + shackle + offsetY,
          this.center.x + cellSize * radius / 2, this.center.y + shackle + offsetY );

        triangle( this.center.x - cellSize * gap / 2, this.center.y + offsetY,
          this.center.x - cellSize * radius / 2, this.center.y + offsetY,
          this.center.x - cellSize * radius / 2, this.center.y + shackle + offsetY );
        triangle( this.center.x - cellSize * gap / 2, this.center.y + offsetY,
          this.center.x - cellSize * gap / 2, this.center.y + shackle + offsetY,
          this.center.x - cellSize * radius / 2, this.center.y + shackle + offsetY );

        //draw case
        offsetY += shackle;
        triangle( this.center.x + cellSize * a, this.center.y + offsetY,
          this.center.x - cellSize * a, this.center.y + offsetY,
          this.center.x + cellSize * a, this.center.y + cellSize * b + offsetY );
        triangle( this.center.x - cellSize * a, this.center.y + cellSize * b + offsetY,
          this.center.x - cellSize * a, this.center.y + offsetY,
          this.center.x + cellSize * a, this.center.y + cellSize * b + offsetY );

        //draw keyhole
        offsetY += cellSize * keyhole;
        fill( this.color );
        ellipse( this.center.x, this.center.y + offsetY, cellSize * keyhole , cellSize * keyhole );
        triangle( this.center.x, this.center.y - cellSize * keyhole / 2 + offsetY,
          this.center.x - cellSize * c, this.center.y + cellSize * d + offsetY,
          this.center.x + cellSize * c, this.center.y + cellSize * d + offsetY );
      }

      //draw expand button
      if ( this.type == 42 ){
        noStroke();
        fill('yellow');
        rect(
          this.center.x - this.const.a / 2,
          this.center.y - this.const.a / 2,
          this.const.a, this.const.a
        );

      }

      //draw afflatus lock button
      if ( this.type == 43 ){
        noStroke();
        fill('red');
        rect(
          this.center.x - this.const.a / 2,
          this.center.y - this.const.a / 2,
          this.const.a / 2, this.const.a / 2
        );
      }
    }
  }
}
