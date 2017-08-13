# Observables Notes

https://plnkr.co/edit/bpl3vje178GsFIIMU7m5?p=preview


## add this to the service

/*
  this provides a number property that can be emitted using the emitConfig method
  
*/

  public configObservable = new Subject<number>();

  emitConfig(val) {
    this.configObservable.next(val);
  }
  
