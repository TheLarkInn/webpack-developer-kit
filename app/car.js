import { V8Engine } from './engine';

export class SportsCar {
  constructor(engine) {
    this.engine = engine;
  }

  toString() {
    return this.engine.toString() + ' Sports Car';
  }
}

console.log(
  new SportsCar(new V8Engine()).toString()
);

