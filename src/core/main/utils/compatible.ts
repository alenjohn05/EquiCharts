import { isFunction } from "./checkTypes";


export const DEFAULT_REQUEST_ID = -1;

export function requestAnimationFrame(fn: (params: any) => any): number {
  if (isFunction(window.requestAnimationFrame)) {
    return window.requestAnimationFrame(fn);
  }
  return window.setTimeout(fn, 20);
}

export function cancelAnimationFrame(id: number): void {
  if (isFunction(window.cancelAnimationFrame)) {
    window.cancelAnimationFrame(id);
  } else {
    window.clearTimeout(id);
  }
}

export function requestIdleCallback(fn: IdleRequestCallback): number {
  if (isFunction(window.requestIdleCallback)) {
    return window.requestIdleCallback(fn);
  }
  const startTime = performance.now();
  return window.setTimeout(function () {
    fn({
      didTimeout: false,
      timeRemaining() {
        return Math.max(0, 50 - (performance.now() - startTime));
      },
    });
  }, 1);
}

export function cancelIdleCallback(id: number): void {
  if (isFunction(window.cancelIdleCallback)) {
    window.cancelIdleCallback(id);
  } else {
    window.clearTimeout(id);
  }
}
