//indexes for establishing a connection between modules
class joint {
  constructor( index, parent, child ){
    this.const = {
      index: index
    };
    this.parent = parent;
    this.child = child;
  }
}
