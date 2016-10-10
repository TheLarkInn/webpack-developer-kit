
import {V6Engine, V8Engine, getVersion} from './engine';

import {SportsCar} from './car';

describe('Car - ',() => {
  it('should have a V8 Engine',() => {    
    let car = new SportsCar(new V8Engine());
    expect(car.toString()).toBe('V8 Sports Car')    
  })

  it('should have a V6 Engine',() => {    
    let car = new SportsCar(new V6Engine());
    expect(car.toString()).toBe('V6 Sports Car')    
  })
})