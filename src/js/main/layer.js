//highlighted layer for a specific aspect of the game
class layer {
  constructor ( index, name ){
    this.const = {
      index: index,
      name: name
    };
    this.elements = [];
  }

  //add new element to interface
  addElem( elem ){
    this.elements.push( elem );
  }

  //drawing layer
  draw(){
    this.elements.forEach(function( element ) {
      element.draw();
    });
  }
}
