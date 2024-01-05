import { PolygonAttrs, LineAttrs, OverlayTemplate } from 'equicharts';

const faltTopBottom: OverlayTemplate = {
  name: 'faltTopBottom',
  totalStep: 4,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: false,
  styles: {
    polygon: {
      color: '#FCB9002b',
    },
    line: {
      size: 2,
      color: '#FCB900',
    },
  },
  createPointFigures: ({ coordinates, overlay }) => {
    let mainLine: LineAttrs[] = [];
    const dashedLines: LineAttrs[] = [];
    const polygons: PolygonAttrs[] = [];

    if (coordinates.length > 2) {
      mainLine = [
        {
          coordinates: [
            { x: coordinates[0].x, y: coordinates[2].y },
            { x: coordinates[1].x, y: coordinates[2].y },
          ],
        },
      ];
      polygons.push({
        coordinates: [
          coordinates[0],
          coordinates[1],
          { x: coordinates[1].x, y: coordinates[2].y },
          { x: coordinates[0].x, y: coordinates[2].y },
        ],
      });
      dashedLines.push({ coordinates: [coordinates[0], coordinates[1]] });
    } else {
      mainLine = [{ coordinates: coordinates }];
    }
    return [
      {
        type: 'line',
        attrs: mainLine,
        size: 2,
      },
      {
        type: 'polygon',
        ignoreEvent: true,
        attrs: polygons,
      },
      {
        type: 'line',
        attrs: dashedLines,
        size: 2,
      },
    ];
  },
  performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
    switch (currentStep) {
      case 3:
        points[1].timestamp = performPoint.timestamp;
        points[1].dataIndex = performPoint.dataIndex;
        break;
    }
  },
  performEventPressedMove: ({ points, performPointIndex, performPoint }) => {
    switch (performPointIndex) {
      case 1:
        points[2].timestamp = performPoint.timestamp;
        points[2].dataIndex = performPoint.dataIndex;
        break;
      case 2:
        points[1].timestamp = performPoint.timestamp;
        points[1].dataIndex = performPoint.dataIndex;
        break;
      case 3:
        points[1].timestamp = performPoint.timestamp;
        break;
    }
  },
};

export default faltTopBottom;
