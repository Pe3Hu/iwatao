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

    for( let i = 0; i < 400; i++)
      this.lockAfflatus();
  }

  //set new foundation
  initFoundation(){
    this.data.foundation = new foundation();
    this.getAvailableFulcrums();
  }

  getAvailableFulcrums(){
    this.array.fulcrum = [ [], [], [], [] ];
    let array = this.data.foundation.array.fulcrum;

    for( let i = 0; i < array.length; i++ )
      for( let j = 0; j < array[i].length; j++ )
        if( array[i][j].var.available ){
          switch ( array[i][j].var.kind ) {
            case 0:
              this.array.fulcrum[0].push( array[i][j].const.index );
              this.array.fulcrum[1].push( array[i][j].const.index );
              break;
            case 1:
            case 2:
              this.array.fulcrum[0].push( array[i][j].const.index );
              break;
            case 3:
            case 4:
              this.array.fulcrum[1].push( array[i][j].const.index );
              break;
            case 5:
              this.array.fulcrum[2].push( array[i][j].const.index );
              break;
            case 6:
              this.array.fulcrum[3].push( array[i][j].const.index );
              break;
            case 7:
              this.array.fulcrum[2].push( array[i][j].const.index );
              this.array.fulcrum[3].push( array[i][j].const.index );
              break;
          }
        }
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

  checkSharpAngle(){
    let afflatus = this.array.afflatus[this.array.afflatus.length - 1];
    let options = [];
    let fulcrumIndex = null;
    let angle = null;

    switch ( afflatus.var.turn ) {
      case 1:
        fulcrumIndex = 2;
        angle = 0;
        break;
      case 2:
        fulcrumIndex = 3;
        angle = 1;
        break;
    }
    console.log( 'turn', afflatus.var.turn, '1 :', afflatus.var.ratio, 'base', afflatus.var.base, afflatus.var.clockwise );
    console.log( this.array.fulcrum[fulcrumIndex] )
    for( let i = 0; i < this.array.fulcrum[fulcrumIndex].length; i++ ){
      let index = this.array.fulcrum[fulcrumIndex][i];
      let grid = afflatus.convertIndex( index );
      let fulcrum = this.data.foundation.array.fulcrum[grid.y][grid.x];
      let base = fulcrum.array.base[angle];
      let ratio = fulcrum.array.ratio[angle];
      let clockwise = fulcrum.array.clockwise[angle];

      if( afflatus.var.ratio == ratio &&
          afflatus.var.clockwise == clockwise ){
            console.log( afflatus.var.ratio, ratio, afflatus.var.base, base )
          options.push( this.array.fulcrum[fulcrumIndex][i] );
          }
    }
    return options;
  }

  enumerationOfOptions(){
    let afflatus = this.array.afflatus[this.array.afflatus.length - 1];
    let small = afflatus.var.small / afflatus.const.a;
    let big = afflatus.var.big / afflatus.const.a;
    let width = null;
    let fulcrumIndex = null;
    let n = this.data.foundation.const.n + 1;
    let options = [];

    switch ( afflatus.var.turn ) {
      case 0:
        fulcrumIndex = 0;
        if( afflatus.var.clockwise )
          width = small;
        else
          width = big;
        break;
      case 3:
        fulcrumIndex = 1;
        if( afflatus.var.clockwise )
          width = -big;
        else
          width = -small;
        break;
      case 1:
      case 2:
       return this.checkSharpAngle();
       break;
    };

    console.log( this.array.fulcrum[fulcrumIndex] )
    for( let i = 0; i < this.array.fulcrum[fulcrumIndex].length; i++ ){
      let begin = afflatus.convertIndex( this.array.fulcrum[fulcrumIndex][i] );
      let end = begin.copy();
      end.x += width;
      let check = this.data.foundation.checkBorder( end );

      if( check ){
        if( width < 0 ){
          let temp = begin.copy();
          begin = end.copy();
          end = temp.copy();
        }

        let flag = this.data.foundation.array.fulcrum[begin.y][begin.x].var.available;
        for( let j = begin.x + 1; j <= end.x - 1; j++ )
          if( this.data.foundation.array.fulcrum[begin.y][j].var.kind != 0 )
            flag = false;

        //check begin and end
        //crossing check
        switch ( afflatus.var.turn ) {
          case 0:
            switch ( this.data.foundation.array.fulcrum[begin.y][begin.x].var.kind ) {
              case 3:
              case 4:
              case 5:
              case 6:
              case 7:
                flag = false;
              break;
            }
            switch ( this.data.foundation.array.fulcrum[end.y][end.x].var.kind ) {
              case 1:
              case 2:
              case 5:
              case 6:
              case 7:
                flag = false;
              break;
            }
            break;
          case 3:
            switch ( this.data.foundation.array.fulcrum[begin.y][begin.x].var.kind ) {
              case 3:
              case 4:
              case 5:
              case 6:
              case 7:
                flag = false;
              break;
            }
            switch ( this.data.foundation.array.fulcrum[end.y][end.x].var.kind ) {
              case 1:
              case 2:
              case 5:
              case 6:
              case 7:
                flag = false;
              break;
            }
            break;
        };

        if( flag )
          options.push( this.array.fulcrum[fulcrumIndex][i] )
      }
    }
    //console.log( 'o',options )
    return options;
  }

  graspAfflatus(){
    let afflatus = this.array.afflatus[this.array.afflatus.length - 1];
    let type = 'standart';

    switch ( type ) {
      //no requirements
      case 'standart':
        //afflatus.alignСenterOfGravity();

        let options = this.enumerationOfOptions();
        if( options.length > 0 ){
          let rand = Math.floor( options.length * Math.random() );
          let fulcrum = options[rand];
          //console.log('rand', fulcrum)
          fulcrum = this.data.foundation.introduceAfflatus( afflatus, fulcrum );
          console.log('fix', fulcrum)
          afflatus.setStatus( 2, fulcrum );
          this.getAvailableFulcrums();
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
