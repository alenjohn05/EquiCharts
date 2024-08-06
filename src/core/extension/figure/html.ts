import type Coordinate from '../../common/Coordinate';
import { type HtmlStyle } from '../../common/Styles';
import { type FigureTemplate } from '../../component/Figure';

export interface HtmlAttrs {
  x: number;
  y: number;
  content: string;
  id: string;
}

function createHtmlElement(
  attrs: HtmlAttrs,
  styles: Partial<HtmlStyle>,
): HTMLElement {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.zIndex = '1000';
  container.style.left = `${attrs.x}px`;
  container.style.top = `${attrs.y}px`;
  container.innerHTML = attrs.content;
  container.id = attrs.id;

  if (styles.width != null && styles.width > 0)
    container.style.width = `${styles.width}px`;
  if (styles.height != null && styles.height > 0)
    container.style.height = `${styles.height}px`;
  if (styles.backgroundColor != null && styles.backgroundColor !== '')
    container.style.backgroundColor = styles.backgroundColor;
  if (styles.color != null && styles.color !== '')
    container.style.color = styles.color;
  if (styles.fontSize != null && styles.fontSize > 0)
    container.style.fontSize = `${styles.fontSize}px`;
  if (styles.fontFamily != null && styles.fontFamily !== '')
    container.style.fontFamily = styles.fontFamily;
  if (styles.border != null && styles.border !== '')
    container.style.border = styles.border;
  if (styles.padding != null && styles.padding > 0)
    container.style.padding = `${styles.padding}px`;
  if (styles.borderRadius != null && styles.borderRadius > 0)
    container.style.borderRadius = `${styles.borderRadius}px`;

  return container;
}

export function checkCoordinateOnHtml(
  coordinate: Coordinate,
  attrs: HtmlAttrs,
): boolean {
  const element = document.elementFromPoint(coordinate.x, coordinate.y);
  return element?.closest(`#${attrs.id}`) !== null;
}

export function drawHtml(
  ctx: CanvasRenderingContext2D,
  attrs: HtmlAttrs,
  styles: Partial<HtmlStyle>,
): void {
  const canvas = ctx.canvas;
  const wrapper = document.createElement('div');
  wrapper.style.position = 'absolute';
  wrapper.style.left = '0';
  wrapper.style.top = '0';
  wrapper.style.pointerEvents = 'none';

  const htmlElement = createHtmlElement(attrs, styles);
  wrapper.appendChild(htmlElement);

  if (canvas.parentNode != null) {
    canvas.parentNode.appendChild(wrapper);
  } else {
    console.warn('Canvas has no parent node to append HTML content');
  }
}

const html: FigureTemplate<HtmlAttrs, Partial<HtmlStyle>> = {
  name: 'html',
  checkEventOn: checkCoordinateOnHtml,
  draw: drawHtml,
};

export default html;
