//the basic element of land
class enclave {
  constructor ( index, capital, color ){
    this.const = {
      index: index,
      n: 6,
    };
    this.array = {
      plot: [ capital ],
      horiznot: [
        [], [], [], [], [], []
      ]
    };
    this.var = {
      capital: capital
    };

    this.init();
  }

  init(){

  }
}
