import { OverlayTemplate } from '../../core/dist';

const crossLine: OverlayTemplate = {
  name: 'crossLine',
  totalStep: 2,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates, bounding }) => {
    return [
      {
        type: 'line',
        attrs: {
          coordinates: [
            {
              x: 0,
              y: coordinates[0].y,
            },
            {
              x: bounding.width,
              y: coordinates[0].y,
            },
          ],
        },
      },
      {
        type: 'line',
        attrs: {
          coordinates: [
            {
              x: coordinates[0].x,
              y: 0,
            },
            {
              x: coordinates[0].x,
              y: bounding.height,
            },
          ],
        },
      },
    ];
  },
};

export default crossLine;
