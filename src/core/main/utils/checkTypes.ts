export function merge(target: any, source: any): void {
  if (!isObject(target) || !isObject(source)) {
    return;
  }
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetProp = target[key];
      const sourceProp = source[key];
      if (isObject(sourceProp) && isObject(targetProp)) {
        merge(targetProp, sourceProp);
      } else {
        if (isValid(sourceProp)) {
          target[key] = clone(sourceProp);
        }
      }
    }
  }
}

export function clone<T>(target: T): T {
  if (!isObject(target)) {
    return target;
  }

  let copy: any = isArray(target) ? [] : {};
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      const value = target[key];
      copy[key] = isObject(value) ? clone(value) : value;
    }
  }
  return copy as T;
}

export function isArray<T = any>(value: any): value is T[] {
  return Array.isArray(value);
}

export function isFunction<T = (...args: any) => any>(value: any): value is T {
  return typeof value === 'function';
}

export function isObject(value: any): value is object {
  return value !== null && typeof value === 'object';
}

export function isNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isValid<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}
