//playing field displayed on screen
class board {
  constructor ( offset ){
    this.offset = offset;
    this.const = {
      edge: {
        x: 4,
        y: 6
      },
      pika: {
        x: 8,
        y: 8
      },
      grid: {
        x: null,
        y: null
      },
      a: cellSize
    }
    this.var = {
      layer: 9,
      buttonID: 0,
      borderID: 0
    }
    this.array = {
      layer: [],
      button: [],
      border: []
    }

    this.init();
  }

  init(){
    this.initGrid();
    this.initWorkshop();
    this.initBorders();
    this.initButtons();
  }

  initGrid(){
    this.const.grid.x = Math.floor( canvasSize.x / cellSize );
    this.const.grid.y = Math.floor( canvasSize.y / cellSize );
  }

  initWorkshop(){
    //this.array.layer.push( new battleMap( offset ));
    this.array.layer.push( new jewelryHouse() );
    this.array.layer.push( new greenHouse() );
    this.array.layer.push( new gamingHouse());
    this.array.layer.push( new playGround() );
    this.array.layer.push( new fogOfWar() );
    this.array.layer.push( new shipYard() );
    this.array.layer.push( new whirlPool() );
    this.array.layer.push( new battleGround() );
    this.array.layer.push( new forgottenLand() );
    this.array.layer.push( new matrialArt() );
    this.array.layer.push( new earthWork() );
  }

  initBorders(){
    let craftView = this.array.layer[0].array.view.length * 9;
    let gardenView = this.array.layer[1].array.view.length * 8;
    let layer = 99;
    let name = 'layerMenu';
    let offset = createVector( cellSize * ( canvasGrid.x - 2.5 ), cellSize * 0.5 );
    let size = createVector( cellSize * 2, cellSize * 10 );
    this.addBorder( layer, name, offset, size );

    layer = 0;
    name = 'craftView';
    offset = createVector( cellSize * 0.5, cellSize * 0.5 );
    size = createVector( cellSize * craftView, cellSize * 9 );
    this.addBorder( layer, name, offset, size );

    name = 'craftSoloEdit';
    offset = createVector( cellSize * ( craftView / 2 - 5 ), cellSize * 10.5 );
    size = createVector( cellSize * 11, cellSize * 11 );
    this.addBorder( layer, name, offset, size );

    name = 'craftFirstEdit';
    offset = createVector( cellSize * ( craftView / 2 - 11 ), cellSize * 10.5 );
    size = createVector( cellSize * 11, cellSize * 11 );
    this.addBorder( layer, name, offset, size );

    name = 'craftSecondEdit';
    offset = createVector( cellSize * ( craftView / 2 + 1 ), cellSize * 10.5 );
    size = createVector( cellSize * 11, cellSize * 11 );
    this.addBorder( layer, name, offset, size );

    layer = 1;
    name = 'gardenView';
    offset = createVector( cellSize * 0.5, cellSize * 0.5 );
    size = createVector( cellSize * gardenView, cellSize * 6.5 );
    this.addBorder( layer, name, offset, size );

    name = 'gardenSoloEdit';
    offset = createVector( cellSize * ( gardenView / 2 - 3.5 ), cellSize * 8 );
    size = createVector( cellSize * 8, cellSize * 7.5 );
    this.addBorder( layer, name, offset, size );

    layer = 2;
    name = 'casinoView';
    offset = createVector( cellSize * 0.5, cellSize * 0.5 );
    size = createVector( cellSize * 11, cellSize * 7 );
    this.addBorder( layer, name, offset, size );

    layer = 3;
    name = 'sportCourt';
    offset = createVector( cellSize * 0.5, cellSize * 0.5 );
    size = createVector( cellSize * 17, cellSize * 10 );
    this.addBorder( layer, name, offset, size );

    layer = 4;
    name = 'huntGrounds';
    offset = createVector( cellSize * 0.5, cellSize * 0.5 );
    size = createVector( cellSize * 24, cellSize * 6 );
    this.addBorder( layer, name, offset, size );

    layer = 5;
    name = 'shipHull';
    offset = createVector( cellSize * 0.5, cellSize * 6 );
    size = createVector( cellSize * ( canvasGrid.x - 4 ), cellSize * ( canvasGrid.y - 6.5 ) );
    this.addBorder( layer, name, offset, size );

    name = 'shipChallenger';
    offset = createVector( cellSize * 0.5, cellSize * 0.5 );
    size = createVector( cellSize * 6.5, cellSize * 5 );
    this.addBorder( layer, name, offset, size );

    name = 'shipView';
    offset = createVector( cellSize * 7.5, cellSize * 0.5 );
    size = createVector( cellSize * ( canvasGrid.x - 11 ), cellSize * 5 );
    this.addBorder( layer, name, offset, size );

    this.updateBorders();
  }

  addBorder( layer, name, offset, size ){
    this.array.border.push( new border( this.var.borderID, layer, name, offset, size ));
    this.var.borderID++;
  }

  cleanBorders(){
    for ( let i = 0; i < this.array.border.length; i++ )
      if( this.array.border[i].layer != 99 )
        this.array.border[i].onScreen = false;
  }

  updateBorders(){
    let offsetID = null;
    this.cleanBorders();

    switch ( this.var.layer ) {
      case 0:
        offsetID = 1;
        this.array.border[offsetID].onScreen = true;

        switch ( this.array.layer[this.var.layer].var.mode ) {
          case 'solo':
            this.array.border[offsetID + 1].onScreen = true;
            break;
          case 'duo':
            this.array.border[offsetID + 2].onScreen = true;
            this.array.border[offsetID + 3].onScreen = true;
            break;
        }
        break;
      case 1:
        offsetID = 5;
        this.array.border[offsetID].onScreen = true;
        this.array.border[offsetID + 1].onScreen = true;
        break;
      case 2:
        offsetID = 7;
        this.array.border[offsetID].onScreen = true;
        break;
      case 3:
        offsetID = 8;
        this.array.border[offsetID].onScreen = true;
        break;
      case 4:
        offsetID = 9;
        switch ( this.array.layer[this.var.layer].var.mode ){
          case 'search':
            this.array.border[offsetID].onScreen = true;
            break;
          case 'fight':
            //this.array.border[offsetID + 1].onScreen = true;
            break;
        }
        break;
      case 5:
        offsetID = 10;
        this.array.border[offsetID].onScreen = true;
        this.array.border[offsetID + 1].onScreen = true;
        this.array.border[offsetID + 2].onScreen = true;
        break;
    }
  }

  initButtons(){
    let craftView = this.array.layer[0].array.view.length * 9;
    let gardenView = this.array.layer[1].array.view.length * 7.5;
    let layer;
    let name;
    let type;
    let vec;

    //set layer change buttons
    layer = 99;
    name = 'switchToCraft';
    type = 0;
    vec = createVector( cellSize * ( canvasGrid.x - 1.5 ), cellSize * 1.5 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'switchToGarden';
    type++;
    vec.y += cellSize;
    this.addButton( layer, name, type, vec.copy() );

    name = 'switchToCasino';
    type++;
    vec.y += cellSize;
    this.addButton( layer, name, type, vec.copy() );

    name = 'switchToSport';
    type++;
    vec.y += cellSize;
    this.addButton( layer, name, type, vec.copy() );

    name = 'switchToHunt';
    type++;
    vec.y += cellSize;
    this.addButton( layer, name, type, vec.copy() );

    name = 'switchToVortex';
    type++;
    vec.y += cellSize;
    this.addButton( layer, name, type, vec.copy() );

    name = 'switchToField';
    type++;
    vec.y += cellSize;
    this.addButton( layer, name, type, vec.copy() );

    name = 'switchToLand';
    type++;
    vec.y += cellSize;
    this.addButton( layer, name, type, vec.copy() );
    type++;
    vec.y += cellSize;
    this.addButton( layer, name, type, vec.copy() );
    type++;
    vec.y += cellSize;
    this.addButton( layer, name, type, vec.copy() );

    layer = 0;
    vec = createVector( cellSize * ( craftView / 2 - 3.5 ), cellSize * 12 );

    //set the row / column shift buttons
    for ( let i = 0; i < this.const.edge.x; i++ ){
      name = 'shift';
      type = i + 10;
      let borderVec = createVector();
      let stepVec = createVector();

      switch ( i ) {
        case 0:
          name += 'Up';
          borderVec = createVector( this.const.a * 0.5, this. const.a * -0.5 );
          stepVec = createVector( this.const.a , 0 );
          break;
        case 1:
          name += 'Right';
          borderVec = createVector( this.const.a * 2, this. const.a * 1 );
          stepVec = createVector( 0, this.const.a );
          break;
        case 2:
          name += 'Down';
          borderVec = createVector( this.const.a * -1, this. const.a * 2 );
          stepVec = createVector( -this.const.a, 0 );
          break;
        case 3:
          name += 'Left';
          borderVec = createVector( this.const.a * -2, this. const.a * -1 );
          stepVec = createVector( 0, -this.const.a );
          break;
      }
      vec.add( borderVec );
      for ( let i = 0; i < this.const.edge.y; i++ ){
        vec.add( stepVec );
        this.addButton( layer, name, type, vec.copy() );
      }
    }

    //set rotate buttons
    name = 'firstRotateCounterclockwise';
    type++;
    vec = createVector(  cellSize * ( craftView / 2 - 9.5 ), cellSize * 12 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'firstRotateClockwise';
    type++;
    vec = createVector(  cellSize * ( craftView / 2 - 1.5 ), cellSize * 12 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'secondRotateCounterclockwise';
    type--;
    vec = createVector( cellSize * ( craftView / 2 + 2.5 ), cellSize * 12 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'secondRotateClockwise';
    type++;
    vec = createVector( cellSize * ( craftView / 2 + 10.5 ), cellSize * 12 );
    this.addButton( layer, name, type, vec.copy() );

    //set scroll buttons
    name = 'soloScrollForward';
    type++;
    vec = createVector( cellSize * ( craftView / 2 - 6 ), cellSize * 15 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'soloScrollBack';
    type++;
    vec = createVector( cellSize * ( craftView / 2 - 6 ), cellSize * 16 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'firstScrollForward';
    type--;
    vec = createVector( cellSize * ( craftView / 2 - 12 ), cellSize * 15.5 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'firstScrollBack';
    type++;
    vec = createVector( cellSize * ( craftView / 2 - 12 ), cellSize * 16.5 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'secondScrollForward';
    type--;
    vec = createVector( cellSize * ( craftView / 2 + 13 ), cellSize * 15.5 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'secondScrollBack';
    type++;
    vec = createVector( cellSize * ( craftView / 2 + 13 ), cellSize * 16.5 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'switchCraftMode';
    type++;
    vec = createVector( cellSize * ( craftView - 0.5 ), cellSize * 10.5 );
    this.addButton( layer, name, type, vec.copy() );

    layer = 1;
    name = 'switchGardenMode';
    vec = createVector( cellSize * ( craftView - 0.5 ), cellSize * 10.5 );
    this.addButton( layer, name, type, vec.copy() );

    layer = 2;
    name = 'spinBandit';
    type++;
    vec = createVector( cellSize * 12.5, cellSize * 1.5 );
    this.addButton( layer, name, type, vec.copy() );

    layer = 5;
    name = 'firstModuleMode';
    type++;
    vec = createVector( cellSize * ( canvasGrid.x - 4.5 ), cellSize * 1.5 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'secondModuleMode';
    type++;
    vec.y += cellSize;
    this.addButton( layer, name, type, vec.copy() );

    name = 'thirdModuleMode';
    type++;
    vec.y += cellSize;
    this.addButton( layer, name, type, vec.copy() );

    name = 'fourthModuleMode';
    type++;
    vec.y += cellSize;
    this.addButton( layer, name, type, vec.copy() );

    name = 'moduleScrollForward';
    type++;
    vec = createVector( cellSize * ( canvasGrid.x - 6 ), cellSize * 3 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'moduleScrollBack';
    type++;
    vec = createVector( cellSize * 1.5, cellSize * 3 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'generateModule';
    type++;
    vec = createVector( cellSize * ( canvasGrid.x - 6 ), cellSize * 4.5 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'moduleRotateClockwise';
    type++;
    vec = createVector( cellSize * 1.5, cellSize * 1.5 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'moduleRotateCounterclockwise';
    type++;
    vec = createVector( cellSize * 1.5, cellSize * 4.5 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'jointScrollForward';
    type++;
    vec = createVector( cellSize * ( 0.5 + ( canvasGrid.x - 4 ) / 2 + 9 ), cellSize * 7 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'jointScrollBack';
    type++;
    vec = createVector( cellSize * ( 0.5 + ( canvasGrid.x - 4 ) / 2 - 9 ), cellSize * 7 );
    this.addButton( layer, name, type, vec.copy() );

    name = 'lockModule';
    type++;
    vec = createVector( cellSize * 3, cellSize * 7 );//( canvasGrid.x - 6 )
    this.addButton( layer, name, type, vec.copy() );

    layer = 8;
    name = 'expandHorizon';
    type++;
    vec = createVector( cellSize, cellSize );
    this.addButton( layer, name, type, vec.copy() );

    for ( let i = 0; i < this.array.button.length; i++ )
      if( this.array.button[i].layer == 99 )
        this.array.button[i].onScreen = true;

    this.updateButtons();
  }

  addButton( layer, name, type, center ){
    this.array.button.push( new button( this.var.buttonID, layer, name, type, center ));
    this.var.buttonID++;
  }

  cleanButtons(){
    for ( let i = 10; i < this.array.button.length; i++ )
        this.array.button[i].onScreen = false;
  }

  updateButtons(){
    this.cleanButtons();

    let offsetID = null;
    let count = null;

    switch ( this.var.layer ) {
      case 0:
        //edit mode button
        offsetID = 44;
        this.array.button[offsetID].onScreen = true;

        switch ( this.array.layer[this.var.layer].var.mode ) {
          case 'solo':
            offsetID = 10;
            count = 24;
            //change visiable status for shift buttons
            for( let i = offsetID; i < offsetID + count; i++ )
              this.detectShift( i );

            offsetID = 38;
            count = 2;
            //change visiable status for scroll buttons
            for( let i = offsetID; i < offsetID + count; i++ )
              this.array.button[i].onScreen = true;

            break;
          case 'duo':
            offsetID = 34;
            count = 4;
            //change visiable status for rotate buttons
            for( let i = offsetID; i < offsetID + count; i++ )
              this.array.button[i].onScreen = true;

            offsetID = 40;
            count = 4;
            //change visiable status for scroll buttons
            for( let i = offsetID; i < offsetID + count; i++ )
              this.array.button[i].onScreen = true;
          }
          break;
      case 1:
        //edit mode button
        offsetID = 45;
        this.array.button[offsetID].onScreen = true;
        break;
      case 2:
        //bandit spin button
        offsetID = 46;
        this.array.button[offsetID].onScreen = true;
        break;
      case 5:
        //module edit buttons
        offsetID = 47;
        count = 12;
       for( let i = offsetID; i < offsetID + count; i++ )
         this.array.button[i].onScreen = true;
        break;
      case 8:
        //expand horiznot
        offsetID = 59;
        this.array.button[offsetID].onScreen = true;
        break;
      }
  }

  update(){
    this.updateButtons();
    this.updateBorders();
  }

  buttonClickCheck(){
    let x = mouseX;// - this.offset.x;
    let y = mouseY;// - this.offset.y;
    let vec = createVector( x, y );
    let minDist = infinity;
    let buttonID = null;

    for( let i = 0; i < this.array.button.length; i++ )
      if ( vec.dist( this.array.button[i].center ) < minDist ){
        minDist = vec.dist( this.array.button[i].center );
        buttonID = i;
      }
    if ( minDist > cellSize / 2 || !this.array.button[buttonID].onScreen )
        return;

    //change board layer
    if( buttonID >= 0 && buttonID < 10 )
      this.switchLayer( buttonID );

    //checking the ability to move the row and column
    if( buttonID >= 10 && buttonID < 34 )
      this.shift( buttonID );

    //rotate tptpts
    if( buttonID >= 34 && buttonID < 38 )
      this.rotateTptpt( buttonID );

    //scroll tptpts
    if( buttonID >= 38 && buttonID < 44 )
      this.scroll( buttonID, 0 );

    //change edit mode
    if( buttonID >= 44 && buttonID < 46 )
      this.array.layer[this.var.layer].switchMode();


    if( buttonID == 46 )
      this.array.layer[this.var.layer].bandit.spin();

    //change modules mode
    if( buttonID >= 47 && buttonID < 51 )
        this.array.layer[this.var.layer].switchMode( buttonID );

    //scroll module
    if( buttonID >= 51 && buttonID < 53 )
      this.scroll( buttonID, 1 );

    //generate new module
    if( buttonID == 53 )
      this.array.layer[this.var.layer].addModule();

    //rotate edited module
    if( buttonID >= 54 && buttonID < 56 )
      this.array.layer[this.var.layer].rotateModule( buttonID );

    //scroll joint
    if( buttonID >= 56 && buttonID < 58 )
      this.array.layer[this.var.layer].shiftJoint( ( buttonID - 56.5 ) * 2 );

    //lock selected module
    if( buttonID == 58 )
      this.array.layer[this.var.layer].lockModule();

    //expand horiznot
    if( buttonID == 59 )
      this.array.layer[this.var.layer].allHorizon();

    this.update();
  }

  plantClickCheck(){
    if( this.var.layer != 1 )
      return;

    let editedID = this.array.layer[this.var.layer].var.firstShift;
    let editedPlant = this.array.layer[this.var.layer].array.plant[editedID];
    editedPlant.check();
  }

  click(){
    this.buttonClickCheck();
    this.plantClickCheck();
  }

  switchLayer( buttonID ){
    let buttonOffset = 0;
    this.var.layer = buttonID - buttonOffset;
  }

  detectShift( buttonID ){
    let j = Math.floor( ( buttonID - 10 ) / this.const.edge.y );
    let i = ( buttonID - 10 ) % this.const.edge.y;
    let x = null;
    let y = null;
    let editedID = this.array.layer[this.var.layer].var.firstShift;
    let editedTptpt = this.array.layer[this.var.layer].array.tptpt[editedID];
    let flag = false;//

    switch ( j ) {
      case 0:
        y = 0;
        x = i + 1;
        break;
      case 1:
        y = i + 1;
        x = 7;
        break;
      case 2:
        y = 7;
        x = 6 - i;
        break;
        break;
      case 3:
        y = 6 - i;
        x = 0;
        break;
    }

    if( x == 7 &&
    ( editedTptpt.array.pika[y][x].status == 'forgotten' ) &&
    ( editedTptpt.array.pika[y][0].status == 'selected' ))
      flag = true;//this.shift( 'row', y, true );
    if( x == 0 &&
    ( editedTptpt.array.pika[y][x].status == 'forgotten' ) &&
    ( editedTptpt.array.pika[y][7].status == 'selected' ))
      flag = true;//this.shift( 'row', y, false );
    if( y == 7 &&
    ( editedTptpt.array.pika[y][x].status == 'forgotten' ) &&
    ( editedTptpt.array.pika[0][x].status == 'selected' ))
      flag = true;//this.shift( 'col', x, true );
    if( y == 0 &&
    ( editedTptpt.array.pika[y][x].status == 'forgotten' ) &&
    ( editedTptpt.array.pika[7][x].status == 'selected' ))
      flag = true;//this.shift( 'col', x, false );
    this.array.button[buttonID].onScreen = flag;
  }

  shift( buttonID ){
    let type = Math.floor( ( buttonID - 10 ) / this.const.edge.y );
    let num = ( buttonID - 10 ) % this.const.edge.y + 1;
    let editedID = this.array.layer[this.var.layer].var.firstShift;
    let editedTptpt = this.array.layer[this.var.layer].array.tptpt[editedID];

    switch ( type ) {
      //shift col up
      case 0:
        editedTptpt.array.pika[0][num].setStatus( 2 );
        for (let i = 0; i < this.const.pika.y - 1; i++)
          editedTptpt.array.pika[i][num].setType( editedTptpt.array.pika[i + 1][num].aspect.num );
        editedTptpt.array.pika[this.const.pika.y - 1][num].setType( 9 );
        break;
      //shift row left
      case 1:
        editedTptpt.array.pika[num][this.const.pika.x - 1].setStatus( 2 );
        for (let j = this.const.pika.x - 1; j > 0; j--)
          editedTptpt.array.pika[num][j].setType( editedTptpt.array.pika[num][j - 1].aspect.num );
        editedTptpt.array.pika[num][0].setType( 9 );
        break;
      //shift col down
      case 2:
        num = this.const.pika.y - num - 1;
        editedTptpt.array.pika[this.const.pika.y - 1][num].setStatus( 2 );
        for (let i = this.const.pika.y - 1; i > 0; i--)
          editedTptpt.array.pika[i][num].setType( editedTptpt.array.pika[i - 1][num].aspect.num );
        editedTptpt.array.pika[0][num].setType( 9 );
        break;
      //shift row right
      case 3:
        num = this.const.pika.x - num - 1;
        editedTptpt.array.pika[num][0].setStatus( 2 );
        for (let j = 0; j < this.const.pika.x - 1; j++)
          editedTptpt.array.pika[num][j].setType( editedTptpt.array.pika[num][j + 1].aspect.num );
        editedTptpt.array.pika[num][this.const.pika.x - 1].setType( 9 );
        break;
    }

    this.updateButtons();
  }

  rotateTptpt( buttonID ){
    let clockwise;
    let index = null;
    let x;
    let y;
    switch ( buttonID ) {
      case 34:
      case 35:
        index = this.array.layer[this.var.layer].var.firstShift;
        break;
      case 36:
      case 37:
        index = this.array.layer[this.var.layer].var.secondShift;
        break;
    }

    let editedTptpt = this.array.layer[this.var.layer].array.tptpt[index];
    if ( ( buttonID % 2 ) == 1 )
      clockwise = true;
    else
      clockwise = false;

    if ( !clockwise ){
      for (let i = 0; i < editedTptpt.const.pika.y / 2; i++)
        for (let j = i; j < editedTptpt.const.pika.x - i - 1; j++){
          let temp = new pika();
          temp.clone( editedTptpt.array.pika[i][j] );
          let current = createVector( i, j );
          let next = createVector( j, 7 - i  );
          editedTptpt.array.pika[current.x][current.y].clone( editedTptpt.array.pika[next.x][next.y] );
          current = next.copy();
          next.set( 7 - i, 7 - j );
          editedTptpt.array.pika[current.x][current.y].clone( editedTptpt.array.pika[next.x][next.y] );
          current = next.copy();
          next.set( 7 - j, i );
          editedTptpt.array.pika[current.x][current.y].clone( editedTptpt.array.pika[next.x][next.y] );
          current = next.copy();
          editedTptpt.array.pika[current.x][current.y].clone( temp );
          }
    }
    else {
      for (let i = 0; i < editedTptpt.const.pika.y / 2; i++)
        for (let j = i; j < editedTptpt.const.pika.x - i - 1; j++){
          let temp = new pika();
          temp.clone( editedTptpt.array.pika[i][j] );
          let current = createVector( i, j );
          let next = createVector( 7 - j, i );
          editedTptpt.array.pika[current.x][current.y].clone( editedTptpt.array.pika[next.x][next.y] );
          current = next.copy();
          next.set( 7 - i, 7 - j );
          editedTptpt.array.pika[current.x][current.y].clone( editedTptpt.array.pika[next.x][next.y] );
          current = next.copy();
          next.set( j, 7 - i  );
          editedTptpt.array.pika[current.x][current.y].clone( editedTptpt.array.pika[next.x][next.y] );
          current = next.copy();
          editedTptpt.array.pika[current.x][current.y].clone( temp );
          }
        }

      this.updateButtons();
    }

  rotateModule( buttonID ){

  }

  scroll( buttonID, type ){
    let step = null;
    let target = Math.floor( ( buttonID - 38 ) / 2 );

    switch ( type ) {
      case 0:
        if ( ( buttonID % 2 ) == 1 )
          step = 1;
        else
          step = -1;

        this.array.layer[this.var.layer].updateTptpts( step, target );
        break;
      case 1:
        if ( ( buttonID % 2 ) == 0 )
          step = 1;
        else
          step = -1;

        this.array.layer[this.var.layer].updateModules( step );
        break;
    }
  }

  //drawing game frame
  draw(){
    //draw borders
    for( let i = 0; i < this.array.border.length; i++ )
      this.array.border[i].draw( this.var.layer );

    //draw layer
    this.array.layer[this.var.layer].draw();

    //draw buttons
    for( let i = 0; i < this.array.button.length; i++ )
      this.array.button[i].draw( this.var.layer );
/*
    //draw grid
    if( this.var.layer != 5 ){
      for( let i = 0; i < this.const.grid.x; i++ )
        for( let j = 0; j < this.const.grid.x; j++ ){
          let x = i * cellSize;
          let y = j * cellSize;
          stroke('grey');
          noFill();
          rect(x, y, cellSize, cellSize);
        }

      for( let i = 0; i < 3; i++ )
        for( let j = 0; j < 3; j++ ){
          let x = i * cellSize * 10;
          let y = j * cellSize * 10;
          stroke('white');
          noFill();
          rect(x, y, cellSize * 10, cellSize * 10);
        }
        noStroke();
    }*/
  }
}
