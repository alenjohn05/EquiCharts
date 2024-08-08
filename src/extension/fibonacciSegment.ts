
import { OverlayTemplate, LineAttrs, TextAttrs } from 'equicharts';

const fibonacciSegment: OverlayTemplate = {
  name: 'fibonacciSegment',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates, overlay, precision }) => {
    const lines: LineAttrs[] = [];
    const texts: TextAttrs[] = [];
    if (coordinates.length > 1) {
      const textX =
        coordinates[1].x > coordinates[0].x
          ? coordinates[0].x
          : coordinates[1].x;
      const percents = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0];
      const yDif = coordinates[0].y - coordinates[1].y;
      const points = overlay.points;
      // @ts-expect-error
      const valueDif = points[0].value - points[1].value;
      percents.forEach((percent) => {
        const y = coordinates[1].y + yDif * percent;
        // @ts-expect-error
        const price = (points[1].value + valueDif * percent).toFixed(
          precision.price,
        );
        lines.push({
          coordinates: [
            { x: coordinates[0].x, y },
            { x: coordinates[1].x, y },
          ],
        });
        texts.push({
          x: textX,
          y,
          text: `${price} (${(percent * 100).toFixed(1)}%)`,
          baseline: 'bottom',
        });
      });
    }
    return [
      {
        type: 'line',
        attrs: lines,
      },
      {
        type: 'text',
        ignoreEvent: true,
        attrs: texts,
      },
    ];
  },
};

export default fibonacciSegment;
