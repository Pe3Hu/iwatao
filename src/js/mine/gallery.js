//
class gallery{
  constructor( index, size, center, occurrence, a ){
    this.const = {
      index: index,
      size: size,
      a: a
    };
    this.var = {
      center: center.copy(),
      occurrence: occurrence
    };
    this.array = {
      occurrence: []
    };

    this.init();
  }

  init(){
    this.initOccurrences();
    console.log(this.array.occurrence)
  }

  initOccurrences(){
    for( let i = 0; i < this.const.size; i++ ){
      let type = Math.floor( Math.random() * 3 );
      let center = this.var.center.copy();
      center.x +=  ( i - this.const.size / 2 ) * this.const.a;
      this.array.occurrence.push( new occurrence( this.var.occurrence, type, center, this.const.a ) );
      this.var.occurrence++;
    }
  }

  draw(){
      for( let i = 0; i < this.array.occurrence.length; i++ )
          this.array.occurrence[i].draw();
  }
}
