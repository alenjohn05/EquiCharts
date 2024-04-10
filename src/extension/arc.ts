import { OverlayTemplate, utils } from '../../core/dist';

const arc: OverlayTemplate = {
  name: 'arc',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  styles: {
    arc: {
      color: 'rgba(22, 119, 255)',
    },
  },
  createPointFigures: ({ coordinates }) => {
    if (coordinates.length > 1) {
      const midX = (coordinates[0].x + coordinates[1].x) / 2;
      const midY = (coordinates[0].y + coordinates[1].y) / 2;
      const radius =
        Math.sqrt(
          Math.pow(coordinates[1].x - coordinates[0].x, 2) +
            Math.pow(coordinates[1].y - coordinates[0].y, 2),
        ) / 2;
      const startAngle = 0;
      const endAngle = Math.PI;
      return [
        {
          type: 'arc',
          attrs: {
            x: midX,
            y: midY,
            r: radius,
            startAngle: startAngle,
            endAngle: endAngle,
          },
          styles: { style: 'solid' },
        },
      ];
    }

    return [];
  },
};

export default arc;
