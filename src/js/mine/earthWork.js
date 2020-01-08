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
      amount: [],
      share: [],
      type: [],
      kind: []
    }

    this.init();
  }

  init(){
    this.var.center = createVector( cellSize * ( canvasGrid.x - 2 ) / 2, cellSize * 4 );
    this.initTables();
    this.initGallerys();
    this.initAnswer();

    //console.log(this.array.answer)
  }

  initTables(){
    this.table.type = [ 30, 20, 10 ];
    this.table.kind = [
      [ 10, 20, 30, 40 ],
      [ 10, 20, 30, 40, 50 ],
      [ 10, 20, 30, 40, 50, 60 ]
    ];
    this.table.amount = [];
    this.table.share = [];
    let totalShare = 0;

    /*for( let i = 0; i < this.table.type.length; i++ ){
      this.table.share.push( [] );
      for( let j = 0; j < this.table.kind[i].length; j++ ){
        let share = this.table.kind[i][j] * this.table.type[i];
        totalShare += share;
        this.table.share[i].push( totalShare );
      }
    }
    console.log( totalShare )*/

    for( let i = 0; i < this.table.kind.length; i++ ){
      this.table.amount.push( [] );
      for( let j = 0; j < this.table.kind[i].length; j++ )
        this.table.amount[i].push( 0 );
    }

    this.updateProbabilitys();

    //console.log(this.table.amount)
    //console.log(this.table.probability)
  }

  updateProbabilitys(){
    this.table.probability = [];
    for( let i = 0; i < this.table.kind.length; i++ ){
      this.table.probability.push( [] );
      let total = 0;
      for( let j = 0; j < this.table.kind[i].length; j++ )
        total += this.table.kind[i][j];

      let current = 0;
      for( let j = 0; j < this.table.kind[i].length; j++ ){
        current += this.table.kind[i][j];
        this.table.probability[i].push( current / total );
      }
    }
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
    this.array.gallery.push( new gallery( this.var.gallery, size, this ) );
    this.var.gallery++;
    this.var.occurrence += size;
    this.var.center.y += this.const.a;
  }

  draw(){
    for( let i = 0; i < this.array.gallery.length; i++ )
      this.array.gallery[i].draw();
  }
}
