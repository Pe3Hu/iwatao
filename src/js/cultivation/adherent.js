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
      fulcrum: [],
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
    this.getAvailableFulcrums();
  }

  getAvailableFulcrums(){
    this.array.fulcrum = [ [], [], [] ];
    let array = this.data.foundation.array.fulcrum;

    for( let i = 0; i < array.length; i++ )
      for( let j = 0; j < array[i].length; j++ )
        if( array[i][j].var.available )
            if ( !array[i][j].var.woCouple )
              this.array.fulcrum[0].push( array[i][j].const.index );
            else if ( !array[i][j].var.woSupport  )
                  this.array.fulcrum[1].push( array[i][j].const.index );
                else
                  this.array.fulcrum[2].push( array[i][j].const.index );

  }

  //set the possible parameters for new afflatus
  initAfflatus(){
    let n = this.data.foundation.const.n / 2;
    for( let i = 1; i <= n; i++ )
      this.array.base.push( i );

    for( let i = 1; i <= this.const.n; i++ )
      this.array.ratio.push( i );


    for( let i = 0; i < this.const.n; i++ )
      this.array.turn.push( i );

    this.array.clockwise = [ true, false ];
  }

  addAfflatus(){
    let base, ratio, turn, clockwise, rand;
    base = this.array.base[0];
    rand = Math.floor( this.array.ratio.length * Math.random() );
    ratio = this.array.ratio[rand];
    if( ratio == 1 )
      base = this.array.base[1];
    rand = Math.floor( this.array.turn.length * Math.random() );
    turn = this.array.turn[rand];
    rand = Math.floor( this.array.clockwise.length * Math.random() );
    clockwise = this.array.clockwise[rand];
    this.array.afflatus.push( new afflatus( this.var.afflatus, base, ratio, turn, clockwise,
                                            this.data.foundation.const.n + 1, this.data.foundation.const.a ) );

    //dont show previous afflatus's
    for( let i = 0; i < this.array.afflatus.length; i++ )
      if( this.array.afflatus[i].var.status != 'selected' )
          this.array.afflatus[i].setStatus( 0 );

    this.array.afflatus[this.var.afflatus].setStatus( 1, this.data.foundation.const.showcase );
    this.var.afflatus++;
  }

  enumerationOfOptions(){
    let afflatus = this.array.afflatus[this.array.afflatus.length - 1];
    let small = afflatus.var.small / afflatus.const.a;
    let big = afflatus.var.big / afflatus.const.a;
    let width = null;
    let n = this.data.foundation.const.n + 1;

    switch ( afflatus.var.turn ) {
      case 0:
        if( afflatus.var.clockwise )
          width = small;
        else
          width = big;
        break;
      case 3:
        if( afflatus.var.clockwise )
          width = -big;
        else
          width = -small;
        break;
    };

    let options = [];
    for( let i = 0; i < this.array.fulcrum[0].length; i++ ){
      let begin = afflatus.convertIndex( this.array.fulcrum[0][i] );
      let end = begin.copy();
      end.x += width;
      let check = this.data.foundation.checkBorder( end );

      if( check ){
        if( width < 0 ){
          let temp = begin.copy();
          begin = end.copy();
          end = temp.copy();
        }

        let flag = true;
        for( let j = begin.x + 1; j <= end.x - 1; j++ )
          if( !this.data.foundation.array.fulcrum[begin.y][j].var.available )
            flag = false;

        //check begin and end
        if( !this.data.foundation.array.fulcrum[begin.y][begin.x].var.woSupport ||
            !this.data.foundation.array.fulcrum[end.y][end.x].var.woSupport )
          flag = false;

        if( flag )
          options.push( this.array.fulcrum[0][i] )
      }
    }

    return options;
  }

  graspAfflatus(){
    let afflatus = this.array.afflatus[this.array.afflatus.length - 1];
    let type = 'standart';

    switch ( type ) {
      //no requirements
      case 'standart':
        afflatus.alignСenterOfGravity();

        let options = this.enumerationOfOptions();
        if( options.length > 0 ){
          let rand = Math.floor( options.length * Math.random() );
          let fulcrum = options[rand];

          this.data.foundation.introduceAfflatus( afflatus, fulcrum );
          afflatus.setStatus( 2, fulcrum );
        }
        break;
    }
  }

  lockAfflatus(){
    this.graspAfflatus();
    this.addAfflatus();
  }

  draw(){
    this.data.foundation.draw( this.const.offset );

    for( let i = 0; i < this.array.afflatus.length; i++ )
      if( this.array.afflatus[i].status != 'await' )
        this.array.afflatus[i].draw( this.const.offset, this.data.foundation.array.fulcrum );
  }
}
