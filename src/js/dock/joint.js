//indexes for establishing a connection between modules
class joint {
  constructor( index, parent, child, begin, end ){
    this.const = {
      index: index
    };
    this.var = {
      parent: parent,
      child: child,
      begin: begin,
      end: end
    }
  }
}
