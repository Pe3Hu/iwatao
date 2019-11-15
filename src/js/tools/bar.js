//information scale
class bar{
    constructor ( center, type, resource ){
      this.center = center;
      this.const = {
        a: null,
        b: null
      };
      this.array = {
        vertex: [],
        filled: []
      };
      this.var = {
        ratio: null,
        percent: null
      };
      this.data = {
        type:{
          num: type,
          name: null
        },
        arrow: null,
        resource: resource
      };
      this.points = {
        current: 0,
        max: 100
      };

      this.init();
      this.randPoints();
    }

    init(){
      this.initConsts();
      this.initVertexs();
      this.initPaints();
      this.updatePoints( this.points.current );
    }

    initConsts(){
      switch ( this.data.type.num ){
        case 0:
          this.data.type.name = 'horizonRectangle';
          this.data.arrow = 'linear';
          this.const.a = cellSize * 4,
          this.const.b = cellSize / 6;
          break;
        case 1:
          this.data.type.name = 'verticalRectsangle';
          this.data.arrow = 'linear';
          this.const.b = cellSize * 3,
          this.const.a = cellSize * 0.125;
          break;
        case 2:
          this.data.type.name = 'upperTriangle';
          this.data.arrow = 'linear';
          this.const.a = cellSize * 2.5;
          break;
        case 3:
          this.data.type.name = 'lowerTriangle';
          this.data.arrow = 'linear';
          this.const.a = cellSize * 2.5;
          break;
        case 4:
          this.data.type.name = 'leftOctagon';
          this.data.arrow = 'linear';
          this.const.a = cellSize * 4;
          break;
        case 5:
          this.data.type.name = 'rightOctagon';
          this.data.arrow = 'linear';
          this.const.a = cellSize * 4;
          break;
        case 6:
          this.data.type.name = 'decagon';
          this.data.arrow = 'circular';
          this.const.a = cellSize * 6;
          break;
        case 7:
          this.data.type.name = 'leftTrapeze';
          this.data.arrow = 'linear';
          this.const.a = cellSize / 2;
          break;
        case 8:
          this.data.type.name = 'rightTrapeze';
          this.data.arrow = 'linear';
          this.const.a = cellSize / 2;
          break;

      }
    }

    initVertexs(){
      let vec = null;
      let offset = null;

      switch ( this.data.type.num ){
        case 0:
          vec = createVector( -this.const.a, -this.const.b );
          vec.add( this.center );
          this.array.vertex.push( vec.copy() );
          vec = createVector( this.const.a, -this.const.b );
          vec.add( this.center );
          this.array.vertex.push( vec.copy() );
          vec = createVector( this.const.a, this.const.b );
          vec.add( this.center );
          this.array.vertex.push( vec.copy() );
          vec = createVector( -this.const.a, this.const.b );
          vec.add( this.center );
          this.array.vertex.push( vec.copy() );
          break;
        case 1:
          break;
        case 2:
          for ( let i = 0; i < 3; i++ ){
            vec = createVector(
              Math.sin( Math.PI * 2 / 4 * ( 3 - i ) ) * this.const.a,
              Math.cos( Math.PI * 2 / 4 * ( 3 - i ) ) * this.const.a );
            vec.add( this.center );
            this.array.vertex.push( vec );
          }
          break;
        case 3:
          for ( let i = 0; i < 3; i++ ){
            vec = createVector(
                Math.sin( Math.PI * 2 / 4 * ( i - 1 ) ) * this.const.a,
                Math.cos( Math.PI * 2 / 4 * ( i - 1) ) * this.const.a );
            vec.add( this.center );
            this.array.vertex.push( vec );
          }
          break;
        case 4:
          for ( let i = 0; i < 3; i++ ){
            vec = createVector(
              Math.sin( Math.PI * 2 / 8 * ( 4 + i ) ) * this.const.a,
              Math.cos( Math.PI * 2 / 8 * ( 4 + i ) ) * this.const.a );
            vec.add( this.center );
            this.array.vertex.push( vec );
          }
          break;
        case 5:
          for ( let i = 0; i < 3; i++ ){
            vec = createVector(
              Math.sin( Math.PI * 2 / 8 * ( 4 - i ) ) * this.const.a,
              Math.cos( Math.PI * 2 / 8 * ( 4 - i ) ) * this.const.a );
            vec.add( this.center );
            this.array.vertex.push( vec );
          }
          break;
        case 7:
          offset = createVector( Math.sin( Math.PI * 5 / 3 ) * this.const.a / 2,
                                 Math.cos( Math.PI * 5 / 3 ) * this.const.a / 2  );
          vec = createVector( 0, -this.const.a );
          vec.add( this.center );
          this.array.vertex.push( vec.copy() );
          vec.add( offset );
          this.array.vertex.push( vec.copy() );

          offset = createVector( Math.sin( Math.PI * 4 / 3 ) * this.const.a / 2,
                                 Math.cos( Math.PI * 4 / 3 ) * this.const.a / 2  );
          vec = createVector( 0, this.const.a );
          vec.add( this.center );
          vec.add( offset );
          this.array.vertex.push( vec.copy() );
          vec = createVector( 0, this.const.a );
          vec.add( this.center );
          this.array.vertex.push( vec.copy() );
          break;
        case 8:
          offset = createVector( Math.sin( Math.PI / 3 ) * this.const.a / 2,
                                 Math.cos( Math.PI / 3 ) * this.const.a / 2  );
          vec = createVector( 0, -this.const.a );
          vec.add( this.center );
          this.array.vertex.push( vec.copy() );
          vec.add( offset );
          this.array.vertex.push( vec.copy() );

          offset = createVector( Math.sin( Math.PI * 2 / 3 ) * this.const.a / 2,
                                 Math.cos( Math.PI * 2 / 3 ) * this.const.a / 2  );
          vec = createVector( 0, this.const.a );
          vec.add( this.center );
          vec.add( offset );
          this.array.vertex.push( vec.copy() );
          vec = createVector( 0, this.const.a );
          vec.add( this.center );
          this.array.vertex.push( vec.copy() );
          break;
      }
    }

    //set color for fill
    initPaints(){
      switch ( this.data.resource ) {
        case 'health':
          this.empty = color( 0, colorMax, colorMax * 0.75 );
          this.filled = color( 0, colorMax, colorMax * 0.5 );
          break;
        case 'mana':
          this.empty = color( 200, colorMax, colorMax * 0.75 );
          this.filled = color( 200, colorMax, colorMax * 0.5 );
          break;
        case 'stamina':
          this.empty = color( 150, colorMax, colorMax * 0.75 );
          this.filled = color( 150, colorMax, colorMax * 0.5 );
          break;
        case 'experience':
          this.empty = color( 50, colorMax, colorMax * 0.75 );
          this.filled = color( 50, colorMax, colorMax * 0.5 );
          break;
        case 'composure':
          this.empty = color( 270, colorMax, colorMax * 0.75 );
          this.filled = color( 270, colorMax, colorMax * 0.5 );
          break;
        case 'rage':
          this.empty = color( 30, colorMax, colorMax * 0.75 );
          this.filled = color( 30, colorMax, colorMax * 0.5 );
          break;
      }
    }

    setPoints( data ){
      this.points.current = data.current;
      this.points.max = data.max;
      this.updatePoints( data.current );
    }
    //after change current points value
    updatePoints( points ){
      if( points == 0 )
        return;
      if( points < 0 )
        points = 0;
      this.points.current = points;
      this.var.ratio  = this.points.current / this.points.max;
      this.array.filled = [];
      let k = 1 + Math.sqrt( 2 );
      let t = this.const.a * Math.sqrt( ( k - 1 ) / k ) * 2;
      let vec = null;
      let addVec = null;

      switch (this.data.type.num ) {
        case 0:
          vec = createVector( -this.const.a, -this.const.b );
          vec.add( this.center );
          this.array.filled.push( vec );
          vec = createVector( this.const.a * ( 2 * this.var.ratio  - 1 ), -this.const.b );
          vec.add( this.center );
          this.array.filled.push( vec );
          vec = createVector( this.const.a * ( 2 * this.var.ratio  - 1 ), this.const.b );
          vec.add( this.center );
          this.array.filled.push( vec );
          vec = createVector( -this.const.a, this.const.b );
          vec.add( this.center );
          this.array.filled.push( vec );
          break;
        case 2:
          vec = createVector( -this.const.a, 0 );
          vec.add( this.center );
          this.array.filled.push( vec );
          if( this.var.ratio <= 0.5 ){
            vec = createVector( 2 * this.const.a * ( this.var.ratio - 0.5 ), 0 );
            vec.add( this.center );
            this.array.filled.push( vec );
            vec = this.array.filled[0].copy();
            addVec = createVector( this.const.a, -this.const.a );
            addVec.mult( this.var.ratio * 2 );
            vec.add( addVec );
            this.array.filled.push( vec );
          }
          else {
            vec = createVector( 0, -this.const.a );
            vec.add( this.center );
            this.array.filled.push( vec );
            vec = this.center.copy();
            this.array.filled.push( vec );
            vec = this.array.filled[1].copy();
            addVec = createVector( this.const.a, this.const.a );
            addVec.mult( ( this.var.ratio - 0.5 ) * 2 );
            vec.add( addVec );
            this.array.filled.push( vec );
            vec = createVector( 2 * this.const.a * ( this.var.ratio - 0.5 ), 0 );
            vec.add( this.center );
            this.array.filled.push( vec );
          }
          break;
        case 3:
          vec = createVector( -this.const.a, 0 );
          vec.add( this.center );
          this.array.filled.push( vec );
          if( this.var.ratio <= 0.5 ){
            vec = createVector( 2 * this.const.a * ( this.var.ratio - 0.5 ), 0 );
            vec.add( this.center );
            this.array.filled.push( vec );
            vec = this.array.filled[0].copy();
            addVec = createVector( this.const.a, this.const.a );
            addVec.mult( this.var.ratio * 2 );
            vec.add( addVec );
            this.array.filled.push( vec );
          }
          else {
            vec = createVector( 0, this.const.a );
            vec.add( this.center );
            this.array.filled.push( vec );
            vec = this.center.copy();
            this.array.filled.push( vec );
            vec = this.array.filled[1].copy();
            addVec = createVector( this.const.a, -this.const.a );
            addVec.mult( ( this.var.ratio - 0.5 ) * 2 );
            vec.add( addVec );
            this.array.filled.push( vec );
            vec = createVector( 2 * this.const.a * ( this.var.ratio - 0.5 ), 0 );
            vec.add( this.center );
            this.array.filled.push( vec );
          }
          break;
        case 4:
          if( this.var.ratio > 0.5 ){
            this.array.filled.push( this.array.vertex[0].copy() );
            this.array.filled.push( this.array.vertex[1].copy() );
            vec = this.array.vertex[1].copy();
            let angle = Math.PI * 3 * 5 / 8 ;

            addVec = createVector(
                Math.sin( angle ) * t * ( this.var.ratio - 0.5 ),
                Math.cos( angle ) * t * ( this.var.ratio - 0.5 ) );
            vec.add( addVec );
            this.array.filled.push( vec );
          }
          else{
            vec = this.array.vertex[0].copy();
            let angle = Math.PI * 3 * 7 / 8 ;
            addVec = createVector(
                Math.sin( angle ) * t * ( -this.var.ratio ),
                Math.cos( angle ) * t * ( -this.var.ratio ) );
            vec.add( addVec );
            this.array.filled.push( vec );
            this.array.filled.push( this.array.vertex[0].copy() );
          }
          break;
        case 5:
          if( this.var.ratio > 0.5 ){
            this.array.filled.push( this.array.vertex[0].copy() );
            this.array.filled.push( this.array.vertex[1].copy() );
            vec = this.array.vertex[1].copy();
            let angle = -Math.PI * 3 * 5 / 8 ;

            addVec = createVector(
                Math.sin( angle ) * t * ( this.var.ratio - 0.5 ),
                Math.cos( angle ) * t * ( this.var.ratio - 0.5 ) );
            vec.add( addVec );
            this.array.filled.push( vec );
          }
          else{
            vec = this.array.vertex[0].copy();
            let angle = -Math.PI * 3 * 7 / 8 ;
            addVec = createVector(
                Math.sin( angle ) * t * ( -this.var.ratio ),
                Math.cos( angle ) * t * ( -this.var.ratio ) );
            vec.add( addVec );
            this.array.filled.push( vec );
            this.array.filled.push( this.array.vertex[0].copy() );
          }
          break;
        case 7:
        case 8:
          if( this.var.ratio < 0.125 ){
            this.array.filled.push( this.array.vertex[3].copy() );
            this.array.filled.push( this.array.vertex[3].copy() );
            this.array.filled.push( this.array.vertex[3].copy() );

            let scale = this.var.ratio * this.const.a * 2;
            addVec = createVector( 0, -scale );
            this.array.filled[1].add( addVec );

            scale = this.var.ratio / 0.125 * this.const.a / 2;
            let angel = Math.PI * 4 / 3;
            if( this.data.type.num == 8 )
              angel = Math.PI * 2 / 3;
            addVec = createVector( Math.sin( angel ) * scale, Math.cos( angel ) * scale );
            this.array.filled[2].add( addVec );
          }
          else
            if( this.var.ratio < 0.875 ){
              this.array.filled.push( this.array.vertex[2].copy() );
              this.array.filled.push( this.array.vertex[3].copy() );
              this.array.filled.push( this.array.vertex[2].copy() );
              this.array.filled.push( this.array.vertex[3].copy() );

              let scale = this.var.ratio * this.const.a * 2;
              addVec = createVector( 0, -scale );
              this.array.filled[1].add( addVec );

              scale = ( this.var.ratio -  0.125 ) / 0.75 * this.const.a * 1.5;
              addVec = createVector( 0, -scale );
              this.array.filled[2].add( addVec );
            }
            else{
              this.array.filled.push( this.array.vertex[1].copy() );
              this.array.filled.push( this.array.vertex[3].copy() );
              this.array.filled.push( this.array.vertex[2].copy() );
              this.array.filled.push( this.array.vertex[3].copy() );
              this.array.filled.push( this.array.vertex[0].copy() );

              let scale = this.var.ratio * this.const.a * 2;
              addVec = createVector( 0, -scale );
              this.array.filled[3].add( addVec );

              scale = ( 1 - ( this.var.ratio -  0.875 ) / 0.125 ) * this.const.a / 2;
              let angel = Math.PI * 5 / 3;
              if( this.data.type.num == 8 )
                angel = Math.PI / 3;
              addVec = createVector( Math.sin( angel ) * scale, Math.cos( angel ) * scale );
              this.array.filled[4].add( addVec );
            }
          break;
      }
    }

    randPoints(){
      let rand = Math.floor( 15 + Math.random() * 85 );
      this.updatePoints( rand );
    }

    draw( offset ){
      if( offset == undefined )
        offset = createVector();

      this.drawEmtpy( offset );
      this.drawFilled( offset );
    }

    drawEmtpy( offset ){
      fill( this.empty );
      switch ( this.data.type.num ){
        case 0:
          noStroke();
          triangle( this.array.vertex[0].x + offset.x, this.array.vertex[0].y + offset.y,
                    this.array.vertex[1].x + offset.x, this.array.vertex[1].y + offset.y,
                    this.array.vertex[2].x + offset.x, this.array.vertex[2].y + offset.y );
          triangle( this.array.vertex[0].x + offset.x, this.array.vertex[0].y + offset.y,
                    this.array.vertex[3].x + offset.x, this.array.vertex[3].y + offset.y,
                    this.array.vertex[2].x + offset.x, this.array.vertex[2].y + offset.y );
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 7:
        case 8:
          noStroke();
          for ( let i = 0; i < this.array.vertex.length - 1; i++ )
            triangle( this.center.x + offset.x, this.center.y + offset.y,
                      this.array.vertex[i].x + offset.x, this.array.vertex[i].y + offset.y,
                      this.array.vertex[i + 1].x + offset.x, this.array.vertex[i + 1].y + offset.y );
          break;
      }
    }

    drawFilled( offset ){

      noStroke();
      fill( this.filled );
      switch ( this.data.type.num ) {
        case 0:
          triangle( this.array.filled[0].x + offset.x, this.array.filled[0].y + offset.y,
                    this.array.filled[1].x + offset.x, this.array.filled[1].y + offset.y,
                    this.array.filled[2].x + offset.x, this.array.filled[2].y + offset.y );
          triangle( this.array.filled[0].x + offset.x, this.array.filled[0].y + offset.y,
                    this.array.filled[3].x + offset.x, this.array.filled[3].y + offset.y,
                    this.array.filled[2].x + offset.x, this.array.filled[2].y + offset.y );
          break;
        case 2:
        case 3:
          triangle( this.array.filled[0].x + offset.x, this.array.filled[0].y + offset.y,
                    this.array.filled[1].x + offset.x, this.array.filled[1].y + offset.y,
                    this.array.filled[2].x + offset.x, this.array.filled[2].y + offset.y );
          if( this.var.ratio > 0.5 ){
            triangle( this.array.filled[3].x + offset.x, this.array.filled[3].y + offset.y,
                      this.array.filled[1].x + offset.x, this.array.filled[1].y + offset.y,
                      this.array.filled[2].x + offset.x, this.array.filled[2].y + offset.y );
            triangle( this.array.filled[3].x + offset.x, this.array.filled[3].y + offset.y,
                      this.array.filled[4].x + offset.x, this.array.filled[4].y + offset.y,
                      this.array.filled[2].x + offset.x, this.array.filled[2].y + offset.y );
          }
          break;
        case 4:
        case 5:
          triangle( this.center.x + offset.x, this.center.y + offset.y,
                    this.array.filled[0].x + offset.x, this.array.filled[0].y + offset.y,
                    this.array.filled[1].x + offset.x, this.array.filled[1].y + offset.y );
          if( this.var.ratio > 0.8 )
          triangle( this.center.x + offset.x, this.center.y + offset.y,
                    this.array.filled[1].x + offset.x, this.array.filled[1].y + offset.y,
                    this.array.filled[2].x + offset.x, this.array.filled[2].y + offset.y );
          break;
        case 7:
        case 8:
          triangle( this.array.filled[2].x + offset.x, this.array.filled[2].y + offset.y,
                    this.array.filled[1].x + offset.x, this.array.filled[1].y + offset.y,
                    this.array.filled[0].x + offset.x, this.array.filled[0].y + offset.y );
          if( this.var.ratio > 0.125 )
            triangle( this.array.filled[3].x + offset.x, this.array.filled[3].y + offset.y,
                      this.array.filled[1].x + offset.x, this.array.filled[1].y + offset.y,
                      this.array.filled[0].x + offset.x, this.array.filled[0].y + offset.y );
          if( this.var.ratio > 0.875 )
            triangle( this.array.filled[4].x + offset.x, this.array.filled[4].y + offset.y,
                      this.array.filled[3].x + offset.x, this.array.filled[3].y + offset.y,
                      this.array.filled[0].x + offset.x, this.array.filled[0].y + offset.y );
          break;
      }
    }

}
