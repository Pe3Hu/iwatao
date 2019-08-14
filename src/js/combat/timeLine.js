//action order display
class timeLine {
  constructor ( count ){
    this.const = count;
    this.lines = [];
  }

  //drawing time line
  draw(){
    this.elements.forEach(function( element ) {
      element.draw();
    });
  }
}
