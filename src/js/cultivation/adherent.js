//
class adherent{
  constructor(){
    this.const = {
    };
    this.var = {
    };
    this.array = {
    };
    this.data = {
      foundation: new foundation()
    }

    this.init();
  }

  init(){
  }


  draw(){
    this.data.foundation.draw();
  }
}
