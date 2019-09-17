//possible route
class trail{
  constructor ( begin, end, hue ){
    this.begin  = begin;
    this.end = end;
    this.const = {
      add: cellSize * 0.25
    };
    this.data = {
      hue: hue
    };
    this.vertex = {
      a: null,
      b: null,
      c: null,
      d: null
    };
    this.init();
  }

  //define the intersection points for the inscribed circles
  init(){
    this.vertex.a = this.begin.copy();
    this.vertex.b = this.begin.copy();
    this.vertex.c = this.end.copy();
    this.vertex.d = this.end.copy();
    this.vertex.e = this.begin.copy();
    this.vertex.f = this.begin.copy();
    this.vertex.g = this.end.copy();
    this.vertex.h = this.end.copy();

    this.vertex.a.x += this.const.add;
    this.vertex.b.x -= this.const.add;
    this.vertex.c.x += this.const.add;
    this.vertex.d.x -= this.const.add;
    this.vertex.e.y += this.const.add;
    this.vertex.f.y -= this.const.add;
    this.vertex.g.y += this.const.add;
    this.vertex.h.y -= this.const.add;
  }

  //drawing trail
  draw( offset ){
    stroke( this.data.hue, colorMax , colorMax * 0.5 );
    fill( this.data.hue, colorMax, colorMax * 0.5 );
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
