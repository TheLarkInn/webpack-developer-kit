import { V6Engine, V8Engine, getVersion } from './engine';

describe('Engine - ',() => {
  it('should have a v6 engine', () => {
    let v6 = new V6Engine();
    expect(v6.toString()).toBe('V6');
  });

  it('should have a v8 engine', () => {
    let v8 = new V8Engine();
    expect(v8.toString()).toBe('V8');
  });

  it('should get version', () => {
    expect(getVersion()).toBe('1.0');
  });
});
