//
class playGround{
  constructor (){
    this.const = {
      a: cellSize,
      n: 11,
      m: 33
    }
    this.array = {
      link: []
    };
    this.var = {

    }

    this.init();
  }

  init(){
    this.court = new court( createVector( cellSize * 1.5, cellSize * 1.5 ) );
    this.net = new net( createVector( cellSize * 5, cellSize * 11.5 ) );
  }

  draw(){
    this.court.draw();
    this.net.draw();
  }
}
