import { OverlayTemplate, Coordinate } from '../../core/dist';

const abcd: OverlayTemplate = {
  name: 'abcd',
  totalStep: 5,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates }) => {
    let acLineCoordinates: Coordinate[] = [];
    let bdLineCoordinates: Coordinate[] = [];

    const tags = ['A', 'B', 'C', 'D'];
    const texts = coordinates.map((coordinate, i) => ({
      ...coordinate,
      baseline: 'bottom',
      text: `(${tags[i]})`,
    }));
    if (coordinates.length > 2) {
      acLineCoordinates = [coordinates[0], coordinates[2]];
      if (coordinates.length > 3) {
        bdLineCoordinates = [coordinates[1], coordinates[3]];
      }
    }
    return [
      {
        type: 'line',
        attrs: { coordinates },
      },
      {
        type: 'line',
        attrs: [
          { coordinates: acLineCoordinates },
          { coordinates: bdLineCoordinates },
        ],
        styles: { style: 'dashed' },
      },
      {
        type: 'text',
        ignoreEvent: true,
        attrs: texts,
      },
    ];
  },
};

export default abcd;
