import { isValid } from "./checkTypes";

let measurementContext: CanvasRenderingContext2D;
/**
 * Get pixel ratio
 * @param canvas
 * @returns {number}
 */
export function getPixelRatio(canvas: HTMLCanvasElement): number {
  return canvas.ownerDocument?.defaultView?.devicePixelRatio ?? 1;
}

export function createFont(
  fontSize?: number,
  fontWeight?: string | number,
  fontFamily?: string,
): string {
  return `${fontWeight ?? 'normal'} ${fontSize ?? 12}px ${fontFamily ?? '"Roboto", sans-serif'}`;
}

/**
 * Measure the width of text
 * @param text
 * @returns {number}
 */
export function calculateTextWidth(
  text: string,
  fontSize?: number,
  fontWeight?: string | number,
  fontFamily?: string,
): number {
  if (!isValid(measurementContext)) {
    const canvasElement = document.createElement('canvas');
    const devicePixelRatio = getPixelRatio(canvasElement);
    measurementContext = canvasElement.getContext('2d')!;
    measurementContext.scale(devicePixelRatio, devicePixelRatio);
  }
  measurementContext.font = createFont(fontSize, fontWeight, fontFamily);
  return Math.round(measurementContext.measureText(text).width);
}
