//
class adherent{
  constructor(){
    this.const = {
      n: 4,
      offset: createVector( cellSize * 1, cellSize * 1 ),
    };
    this.var = {
      afflatus: 0
    };
    this.array = {
      clockwise: [],
      afflatus: [],
      ratio: [],
      base: [],
      turn: []

    };
    this.data = {
      foundation: null
    }

    this.init();
  }

  init(){
    this.initFoundation();
    this.initAfflatus();
    this.addAfflatus();
  }

  //set new foundation
  initFoundation(){
    this.data.foundation = new foundation();
  }

  //set the possible parameters for new afflatus
  initAfflatus(){
    let n = this.data.foundation.const.n / 2;
    for( let i = 1; i <= n; i++ )
      this.array.base.push( i * this.data.foundation.const.a );

    for( let i = 1; i <= this.const.n; i++ )
      this.array.ratio.push( i );


    for( let i = 0; i < this.const.n; i++ )
      this.array.turn.push( i );

    this.array.clockwise = [ true, false ];
  }

  addAfflatus(){
    //remove the previous option
    if( this.var.afflatus > 0 )
      this.array.afflatus[this.var.afflatus].setStatus( 0 );

    let base, ratio, turn, clockwise;
    let rand = Math.floor( this.array.base.length * Math.random() );
    base = this.array.base[rand];
    rand = Math.floor( this.array.ratio.length * Math.random() );
    ratio = this.array.ratio[rand];
    rand = Math.floor( this.array.turn.length * Math.random() );
    turn = this.array.turn[rand];
    rand = Math.floor( this.array.clockwise.length * Math.random() );
    clockwise = this.array.clockwise[rand];
    this.array.afflatus.push( new afflatus( this.var.afflatus, base, ratio, turn, clockwise, this.data.foundation.const.n + 1 ) );

    this.array.afflatus[this.var.afflatus].setStatus( 1, this.data.foundation.const.showcase );
    console.log(  this.array.afflatus[this.var.afflatus])

    this.var.afflatus++;
  }

  draw(){
    this.data.foundation.draw( this.const.offset );

    for( let i = 0; i < this.array.afflatus.length; i++ )
    if( this.array.afflatus[i].status != 'await' )
      this.array.afflatus[i].draw( this.const.offset, this.data.foundation.array.fulcrum );
  }
}
