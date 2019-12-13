//
class matrialArt{
  constructor(){
    this.const = {
    };
    this.var = {
      adherent: 0,
      chosen: 0
    };
    this.array = {
      adherent: []
    };

    this.init();
  }

  init(){
    this.initAdherents();
  }

  initAdherents(){
    this.addAdherent();
  }

  addAdherent(){
    this.array.adherent.push( new adherent( this.var.adherent ) );
    this.var.adherent++;
  }

  draw(){
    //for( let i = 0; i < this.array.adherent.length; i++ )
    this.array.adherent[this.var.chosen].draw();
  }
}
