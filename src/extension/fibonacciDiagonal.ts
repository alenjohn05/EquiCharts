import {
  OverlayTemplate,
  CircleAttrs,
  TextAttrs,
  LineAttrs,
  Coordinate,
} from '../../core/dist';
import { formatThousands } from './utils';

const fibonacciDiagonal: OverlayTemplate = {
  name: 'fibonacciDiagonal',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({
    coordinates,
    bounding,
    overlay,
    precision,
    thousandsSeparator,
  }) => {
    const points = overlay.points;
    if (coordinates.length > 0) {
      const lines: LineAttrs[] = [];
      const texts: TextAttrs[] = [];
      // const startX = 0
      // const endX = bounding.width
      const startX = coordinates[0].x;
      const endX = coordinates[coordinates.length - 1].x;
      if (
        coordinates.length > 1 &&
        points[0].value !== undefined &&
        points[1].value !== undefined
      ) {
        const percents = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0];
        const yDif = coordinates[0].y - coordinates[1].y;
        const valueDif = points[0].value - points[1].value;
        percents.forEach((percent) => {
          const y = coordinates[1].y + yDif * percent;
          const value = formatThousands(
            ((points[1].value ?? 0) + valueDif * percent).toFixed(
              precision.price,
            ),
            thousandsSeparator,
          );
          lines.push({
            coordinates: [
              { x: startX, y },
              { x: endX, y },
            ],
          });
          texts.push({
            x: startX,
            y,
            text: `${value} (${(percent * 100).toFixed(1)}%)`,
            baseline: 'bottom',
          });
        });
        lines.push({
          coordinates: [
            { x: lines[0].coordinates[0].x, y: lines[0].coordinates[0].y },
            {
              x: lines[percents.length - 1].coordinates[1].x,
              y: lines[percents.length - 1].coordinates[1].y,
            },
          ],
        });
      }
      return [
        {
          type: 'line',
          attrs: lines,
        },
        {
          type: 'text',
          isCheckEvent: false,
          attrs: texts,
        },
      ];
    }
    return [];
  },
  onRightClick: (event): boolean => {
    alert(`object ${event.overlay.name} was clicked`);
    return true;
  },
};

export default fibonacciDiagonal;
