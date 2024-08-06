import { isFunction, isValid } from "./checkTypes";

export function throttle(
    func: (...args: any[]) => any,
    wait?: number,
  ): () => void {
    let previous = 0;
    return function () {
      const now = Date.now();
      if (now - previous > (wait ?? 20)) {
        func.apply(this, arguments);
        previous = now;
      }
    };
  }
  
  export function memoize<R1 = any, R2 = any> (func: (...args: any[]) => R1, resolver?: (...args: any[]) => R2): (...args: any[]) => R1 {
    if (!isFunction(func) || (isValid(resolver) && !isFunction(resolver))) {
      throw new TypeError('Expected a function')
    }
    const memoized = function (...args: any[]): any {
      const key = isFunction(resolver) ? resolver.apply(this, args) : args[0]
      const cache = memoized.cache
  
      if (cache.has(key)) {
        return cache.get(key)
      }
      const result = func.apply(this, args)
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      memoized.cache = cache.set(key, result) || cache
      return result
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    memoized.cache = new (memoize.Cache || Map)()
    return memoized
  }
  memoize.Cache = Map