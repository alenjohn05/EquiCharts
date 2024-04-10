import { OverlayTemplate, PolygonAttrs, LineAttrs } from '../../core/dist';

const headAndShoulders: OverlayTemplate = {
  name: 'headAndShoulders',
  totalStep: 8,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  styles: {
    polygon: {
      color: 'rgba(22, 119, 255, 0.15)',
    },
  },
  createPointFigures: ({ coordinates }) => {
    const dashedLines: LineAttrs[] = [];
    const polygons: PolygonAttrs[] = [];
    const tags = [
      '1',
      'Left Shoulder',
      '2',
      'Head',
      '3',
      'Right Shoulder',
      '4',
    ];
    const texts = coordinates.map((coordinate, i) => ({
      ...coordinate,
      baseline: 'bottom',
      text: `${tags[i]}`,
    }));
    if (coordinates.length > 2) {
      dashedLines.push({ coordinates: [coordinates[0], coordinates[2]] });
      polygons.push({
        coordinates: [coordinates[0], coordinates[1], coordinates[2]],
      });
      if (coordinates.length > 4) {
        dashedLines.push({ coordinates: [coordinates[2], coordinates[4]] });
        polygons.push({
          coordinates: [coordinates[2], coordinates[3], coordinates[4]],
        });
        if (coordinates.length > 6) {
          dashedLines.push({ coordinates: [coordinates[4], coordinates[6]] });
          polygons.push({
            coordinates: [coordinates[4], coordinates[5], coordinates[6]],
          });
        }
      }
    }
    return [
      {
        type: 'line',
        attrs: { coordinates },
      },
      {
        type: 'line',
        attrs: dashedLines,
        styles: { style: 'dashed' },
      },
      {
        type: 'polygon',
        ignoreEvent: true,
        attrs: polygons,
      },
      {
        type: 'text',
        ignoreEvent: true,
        attrs: texts,
      },
    ];
  },
};

export default headAndShoulders;
