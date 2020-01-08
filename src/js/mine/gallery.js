//
class gallery{
  constructor( index, size, earthWork ){
    this.const = {
      index: index,
      size: size
    };
    this.var = {
    };
    this.array = {
      occurrence: []
    };
    this.earthWork = earthWork;

    this.init();
  }

  init(){
    this.initOccurrences();
    //console.log(   this.earthWork.table.kind, this.earthWork.table.type )
  }

  initOccurrences(){
    for( let i = 0; i < this.const.size; i++ ){
      let type = this.recognizeIndex( this.earthWork.table.type, 'share' );
      let kind = this.recognizeIndex( this.earthWork.table.probability[i], 'probability' );
      let center = this.earthWork.var.center.copy();
      //console.log(type,kind);
      center.x +=  ( i - this.const.size / 2 ) * this.earthWork.const.a;
      this.array.occurrence.push( new occurrence( this.earthWork.var.occurrence, type, kind, center, this.earthWork.const.a ) );
      this.earthWork.var.occurrence++;
      this.updateTables( type, kind );
    }
  }

  recognizeIndex( array, flag ){
    let rand = null;
    switch ( flag ) {
      case 'share':
        let totalShare = 0;
        for( let i = 0; i < array.length; i++ )
          totalShare += array[i];
        rand = Math.floor( totalShare * Math.random() );
        break;
      case 'probability':
        rand = Math.random();
        break;

    }
    let value = 0;
    let index = null;
    let j = 0;
    while( index == null && j < array.length ){
      value +=  array[j];
      if( rand <= value  )
        index = j;
      j++;
    }
    //console.log(index,rand,probability);
    return index;
  }

  updateTables( type, kind ){
    let lowerType = 3;
    let lowerKind = 7;
    let t = this.earthWork.table.type[type] - lowerType;
    let k = this.earthWork.table.kind[type][kind] -= lowerKind;
    if( t < 0 )
      t = 0;
    if( k < 0 )
      k = 0;
    this.earthWork.table.amount[type][kind]++;
    this.earthWork.table.type[type] = t;
    this.earthWork.table.kind[type][kind] = k;
    this.earthWork.updateProbabilitys();
  }

  draw(){
    for( let i = 0; i < this.array.occurrence.length; i++ )
      this.array.occurrence[i].draw();
  }
}
