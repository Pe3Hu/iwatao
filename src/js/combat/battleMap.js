//combat progress display
class battleMap {
  constructor ( center ){
    this.const = {
      sector: 12,
      ring: 6,
      r: cellSize,
      R: cellSize * Math.sqrt( 3 )
    };
    this.array = {
      vertex: [],
      triangle: []
    };
    this.center = center;
    this.sectorMarkup();
  }

  sectorMarkup(){
    for (let i = 0; i < this.const.ring ; i++){
      this.array.vertex.push([]);
      for (let j = 0; j < this.const.sector; j++){
        let vec = createVector(
          Math.cos( Math.PI / 6 * j ),
          Math.sin( Math.PI / 6 * j ));
        if ( j % 2 == 0 )
          vec.mult( this.const.r * ( i + 1 ) * 2 );
        else
          vec.mult( this.const.R * ( i + 1 ));

        vec.add( this.center );
        this.array.vertex[i].push( vec );
      }
    }
    /*
    for (let i = 0; i < this.const.ring; i++){
      this.array.triangle.push([]);
      for (let j = 0; j < this.const.sector; j++){
        let index = i * this.const.sector + j;
        let a = createVector();
        let b = createVector();
        let c = createVector();
        let color = color( 90, 360, 360 );
        this.array.triangle[i].push( new tile( index, a, b, c, color ) );
      }
    }
    */
  }

  drawCenter(){
    noStroke();
    fill( 0 );
    for (let i = 0; i < 6; i++){
      let b = createVector(
        this.const.r * Math.cos( Math.PI / 3 * i ),
        this.const.r * Math.sin( Math.PI / 3 * i ));
      let c = createVector(
        this.const.r * Math.cos( Math.PI / 3 * ( i + 1 )),
        this.const.r * Math.sin( Math.PI / 3 * ( i + 1 )));
      b.add( this.center );
      c.add( this.center );
      triangle( this.center.x, this.center.y, b.x, b.y, c.x, c.y );
    }
  }

  drawSectors(){
    for (let i = 0; i < this.const.ring - 1; i++)
      for (let j = 0; j < this.const.sector; j++){
        let a = this.array.vertex[i][j];
        let b = this.array.vertex[i + 1][j];
        let c = this.array.vertex[i + 1][( j + 1 ) % this.const.sector];
        let d = this.array.vertex[i][( j + 1 ) % this.const.sector];
        let h = 360 / this.const.sector * j;
        let s = 360;
        let l = 360;

        noStroke();
        fill( h, s, l );
        triangle( a.x, a.y, b.x, b.y, c.x, c.y );
        triangle( a.x, a.y, d.x, d.y, c.x, c.y );

        stroke( 0 );
        line( a.x, a.y, b.x, b.y );
        line( b.x, b.y, c.x, c.y );
        line( c.x, c.y, d.x, d.y );
        line( d.x, d.y, a.x, a.y );
      }
  }

  //drawing battle map
  draw(){
    this.drawSectors();
    //this.drawCenter();

  }
}
