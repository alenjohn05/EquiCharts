import { OverlayTemplate, Coordinate } from '../../core/dist';

const elliotTripleComboWaves: OverlayTemplate = {
  name: 'elliotTripleComboWaves',
  totalStep: 6,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates }) => {
    let acLineCoordinates: Coordinate[] = [];
    let bdLineCoordinates: Coordinate[] = [];

    const tags = ['(0)', '(W)', '(X)', '(Y)', '(Z)'];
    const texts = coordinates.map((coordinate, i) => ({
      ...coordinate,
      baseline: 'bottom',
      text: `(${tags[i]})`,
    }));
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

export default elliotTripleComboWaves;
