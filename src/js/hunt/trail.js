//possible route
class trail{
  constructor ( begin, end, way ){
    this.begin  = begin;
    this.end = end;
    this.data ={
      way: null
    };
    this.vertex = {
      a: null,
      b: null,
      c: null,
      d: null
    };

    this.init();
  }

  init(){
    this.vertex.a = this.begin.copy();
    this.vertex.b = this.begin.copy();
    this.vertex.c = this.end.copy();
    this.vertex.d = this.end.copy();
    this.vertex.e = this.begin.copy();
    this.vertex.f = this.begin.copy();
    this.vertex.g = this.end.copy();
    this.vertex.h = this.end.copy();

    this.vertex.a.x += cellSize * 0.5;
    this.vertex.b.x -= cellSize * 0.5;
    this.vertex.c.x += cellSize * 0.5;
    this.vertex.d.x -= cellSize * 0.5;
    this.vertex.e.y += cellSize * 0.5;
    this.vertex.f.y -= cellSize * 0.5;
    this.vertex.g.y += cellSize * 0.5;
    this.vertex.h.y -= cellSize * 0.5;
  }

  //drawing trail
  draw( offset ){
    stroke( 0, 0, colorMax * 0.4 );
    fill( 0, 0, colorMax * 0.4 );
    triangle( offset.x + this.vertex.a.x, offset.y + this.vertex.a.y,
      offset.x + this.vertex.b.x, offset.y + this.vertex.b.y,
      offset.x + this.vertex.c.x, offset.y + this.vertex.c.y );
    triangle( offset.x + this.vertex.d.x, offset.y + this.vertex.d.y,
      offset.x + this.vertex.b.x, offset.y + this.vertex.b.y,
      offset.x + this.vertex.c.x, offset.y + this.vertex.c.y );
    triangle( offset.x + this.vertex.e.x, offset.y + this.vertex.e.y,
      offset.x + this.vertex.f.x, offset.y + this.vertex.f.y,
      offset.x + this.vertex.g.x, offset.y + this.vertex.g.y );
    triangle( offset.x + this.vertex.h.x, offset.y + this.vertex.h.y,
      offset.x + this.vertex.f.x, offset.y + this.vertex.f.y,
      offset.x + this.vertex.g.x, offset.y + this.vertex.g.y );
  }
}
