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
      gallery: [],
      answer: []
    };
    this.table = {
      probability: [],
      kind: []
    }

    this.init();
  }

  init(){
    this.var.center = createVector( cellSize * ( canvasGrid.x - 2 ) / 2, cellSize * 4 );
    this.initTables();
    this.initGallerys();
    this.initAnswer();

    console.log(this.array.answer)
  }

  initTables(){
    this.table.kind = [
      [ 0, 1, 2, 3 ],
      [ 0, 1, 2, 3, 4 ],
      [ 0, 1, 2, 3, 4, 5 ]
    ];
    this.table.probability = [];

    for( let i = 0; i < this.table.kind.length; i++ ){
      this.table.probability.push( [] );
      let total = 0;
      for( let j = 1; j < this.table.kind[i].length + 1; j++ )
        total += j;

      for( let j = 1; j < this.table.kind[i].length + 1; j++ )
        this.table.probability[i].push( j / total );
    }
    console.log(this.table.probability)
  }

  initGallerys(){
    for( let i = 0; i < this.const.n; i++ )
      this.addGallery();
  }

  initAnswer(){
    for( let i = 0; i < this.array.gallery.length; i++ )
      for( let j = 0; j < this.array.gallery[i].array.occurrence.length; j++ )
        this.array.answer.push( this.array.gallery[i].array.occurrence[j].const.index );
  }

  addGallery(){
    let min = 1;
    let max = 4;
    let size = Math.floor( Math.random() * ( max - min ) );
    size += min;
    size = this.var.gallery + 1;
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
