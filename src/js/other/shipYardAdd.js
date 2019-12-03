let gridE = modul.convertIndex( modul.array.gate[i][j].const.end );
gridE.x += parent.x - child.x;
gridE.y += parent.y - child.y;
let end = hull.convertGrid( gridE );

let begin = null;
if( modul.array.gate[i][j].const.begin != null ){
  let gridB = modul.convertIndex( modul.array.gate[i][j].const.begin );
  gridB.x += parent.x - child.x;
  gridB.y += parent.y - child.y;
  begin = hull.convertGrid( gridB );
}

let kind = modul.array.gate[i][j].var.kind;
let sequence = modul.array.gate[i][j].var.sequence;
index += hull.array.way[i];
if( modul.array.gate[i][j].const.index != joint.var.child.const.end ||
    ( joint.var.parent.const.begin != null &&
      joint.var.parent.const.begin != end ) )
  hull.array.gate[i].push( new gate( begin, end, kind, sequence, way ) );
