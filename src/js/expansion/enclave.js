//the basic element of land
class enclave {
  constructor ( index, capital ){
    this.const = {
      index: index,
      n: 6,
    };
    this.array = {
      plot: [ capital ]
    };
    this.var = {
      capital: capital
    }

    this.init();
  }
}
