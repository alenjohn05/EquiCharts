import { OverlayTemplate, LineAttrs, TextAttrs } from '../../core/dist';

import { getRayLine } from './utils';

const fibonacciSpeedResistanceFan: OverlayTemplate = {
  name: 'fibonacciSpeedResistanceFan',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates, bounding }) => {
    const lines1: LineAttrs[] = [];
    let lines2: LineAttrs[] = [];
    const texts: TextAttrs[] = [];
    if (coordinates.length > 1) {
      const xOffset = coordinates[1].x > coordinates[0].x ? -38 : 4;
      const yOffset = coordinates[1].y > coordinates[0].y ? -2 : 20;
      const xDistance = coordinates[1].x - coordinates[0].x;
      const yDistance = coordinates[1].y - coordinates[0].y;
      const percents = [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0];
      percents.forEach((percent) => {
        const x = coordinates[1].x - xDistance * percent;
        const y = coordinates[1].y - yDistance * percent;
        lines1.push({
          coordinates: [
            { x, y: coordinates[0].y },
            { x, y: coordinates[1].y },
          ],
        });
        lines1.push({
          coordinates: [
            { x: coordinates[0].x, y },
            { x: coordinates[1].x, y },
          ],
        });
        lines2 = lines2.concat(
          getRayLine([coordinates[0], { x, y: coordinates[1].y }], bounding),
        );
        lines2 = lines2.concat(
          getRayLine([coordinates[0], { x: coordinates[1].x, y }], bounding),
        );
        texts.unshift({
          x: coordinates[0].x + xOffset,
          y: y + 10,
          text: `${percent.toFixed(3)}`,
        });
        texts.unshift({
          x: x - 18,
          y: coordinates[0].y + yOffset,
          text: `${percent.toFixed(3)}`,
        });
      });
    }
    return [
      {
        type: 'line',
        attrs: lines1,
      },
      {
        type: 'line',
        attrs: lines2,
      },
      {
        type: 'text',
        ignoreEvent: true,
        attrs: texts,
      },
    ];
  },
};

export default fibonacciSpeedResistanceFan;
