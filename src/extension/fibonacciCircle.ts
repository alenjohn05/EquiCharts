import { OverlayTemplate, CircleAttrs, TextAttrs } from '../../core/dist';

const fibonacciCircle: OverlayTemplate = {
  name: 'fibonacciCircle',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates }) => {
    if (coordinates.length > 1) {
      const xDis = Math.abs(coordinates[0].x - coordinates[1].x);
      const yDis = Math.abs(coordinates[0].y - coordinates[1].y);
      const radius = Math.sqrt(xDis * xDis + yDis * yDis);
      const percents = [0.236, 0.382, 0.5, 0.618, 0.786, 1];
      const circles: CircleAttrs[] = [];
      const texts: TextAttrs[] = [];
      percents.forEach((percent) => {
        const r = radius * percent;
        circles.push({ ...coordinates[0], r });
        texts.push({
          x: coordinates[0].x,
          y: coordinates[0].y + r + 6,
          text: `${(percent * 100).toFixed(1)}%`,
        });
      });
      return [
        {
          type: 'circle',
          attrs: circles,
          styles: { style: 'stroke' },
        },
        {
          type: 'text',
          ignoreEvent: true,
          attrs: texts,
        },
      ];
    }
    return [];
  },
};

export default fibonacciCircle;
