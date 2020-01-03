//
class newWorld{
  constructor(){
    this.const = {
    };
    this.var = {
    };
    this.array = {
    };

    this.init();
  }

  init(){
    let center = createVector( 100, 100 );
    this.var.mosaic = new mosaic( 1,center );
  }


  draw(){
    this.var.mosaic.draw();
  }
}
