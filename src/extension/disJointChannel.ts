import {
  OverlayTemplate,
  Coordinate,
  PolygonAttrs,
  LineAttrs
} from "equicharts ";

let height = 0;

const disJointChannel: OverlayTemplate = {
  name: "disJointChannel",
  totalStep: 4,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  styles: {
    polygon: {
      color: "#FCB9002b"
    },
    line: {
      size: 2,
      color: "#FCB900"
    }
  },
  createPointFigures: ({ coordinates, bounding }) => {
    let mainLine: LineAttrs[] = [];
    const dashedLines: LineAttrs[] = [];
    const polygons: PolygonAttrs[] = [];
    let height = 0;
    if (coordinates.length >= 2) {
      height = Math.abs(coordinates[1].y - coordinates[0].y);
    }
    if (coordinates.length > 2) {
      mainLine = [
        {
          coordinates: [
            { x: coordinates[0].x, y: coordinates[0].y },
            { x: coordinates[1].x, y: coordinates[1].y }
          ]
        }
      ];
      dashedLines.push({
        coordinates: [
          { x: coordinates[1].x, y: coordinates[2].y },
          { x: coordinates[0].x, y: coordinates[2].y + height }
        ]
      });
    } else {
      mainLine = [{ coordinates: coordinates }];
    }
    return [
      {
        type: "line",
        ignoreEvent: false,
        attrs: mainLine
      },
      {
        type: "line",
        ignoreEvent: false,
        attrs: dashedLines
      }
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
    }
  }
};

export default disJointChannel;
