//tool for interacting with combat participants
class battleCard {
  constructor ( count ){
    this.const = count;
    this.preparationTime = null;
    this.target = 'nearest';//nearest
  }

  //drawing battle card
  draw(){
    this.elements.forEach(function( element ) {
      element.draw();
    });
  }
}
