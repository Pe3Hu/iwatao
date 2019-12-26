//
class earthWork{
  constructor(){
    this.const = {
      a: cellSize * 2,
      n: 3
    };
    this.var = {
      center: null,
      occurrence: 0,
      gallery: 0
    };
    this.array = {
      gallery: []
    };

    this.init();
  }

  init(){
    this.var.center = createVector( cellSize * ( canvasGrid.x - 2 ) / 2, cellSize * 4 );
    this.initGallerys();

    console.log(this.array.gallery)
  }

  initGallerys(){
    for( let i = 0; i < this.const.n; i++ )
      this.addGallery();
  }

  addGallery(){
    let min = 1;
    let max = 4;
    let size = Math.floor( Math.random() * ( max - min ) );
    size += min;
    this.array.gallery.push( new gallery( this.var.gallery, size, this.var.center.copy(), this.var.occurrence, this.const.a ) );
    this.var.gallery++;
    this.var.occurrence += size;
    this.var.center.y += this.const.a;
  }

  draw(){
    for( let i = 0; i < this.array.gallery.length; i++ )
        this.array.gallery[i].draw();
  }
}
