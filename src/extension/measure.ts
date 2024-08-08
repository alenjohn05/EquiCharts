import { utils, type OverlayTemplate, type OverlayFigure } from 'equicharts';

const measure: OverlayTemplate = {
  name: 'measure',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  styles: {
    backgroundColor: 'rgba(22, 119, 255, 0.25)',
    tipBackgroundColor: '#1677FF',
    lineColor: '#1677FF',
  },
  createPointFigures: ({ coordinates, overlay, bounding }) => {
    if (coordinates.length > 1) {
      const newPrice = overlay.points[1]?.value;
      const oldPrice = overlay.points[0]?.value;
      let percentage = 0;
      let differencePrice = 0;
      if (oldPrice !== undefined && newPrice !== undefined) {
        percentage = ((newPrice - oldPrice) / oldPrice) * 100;
        differencePrice = newPrice - oldPrice;
      }
      const leftToRight = coordinates[0]?.x < coordinates[1]?.x;
      const topToBottom = coordinates[0]?.y < coordinates[1]?.y;
      const centerCoordinate = {
        x: Math.round((coordinates[0].x + coordinates[1].x) / 2),
        y: Math.round((coordinates[0].y + coordinates[1].y) / 2),
      };
      const backgroundColor = overlay.styles?.backgroundColor;
      const tipBackgroundColor = overlay.styles?.tipBackgroundColor;
      const lineColor = overlay.styles?.lineColor;
      const texts = [
        `${differencePrice.toFixed(2)} (${percentage.toFixed(2)}%)`,
      ];
      const figures: OverlayFigure[] = [
        {
          type: 'polygon',
          attrs: {
            coordinates: [
              coordinates[0],
              { x: coordinates[1].x, y: coordinates[0].y },
              coordinates[1],
              { x: coordinates[0].x, y: coordinates[1].y },
            ],
          },
          styles: {
            color: backgroundColor,
          },
        },
        {
          type: 'line',
          attrs: {
            coordinates: [
              { x: coordinates[0].x, y: centerCoordinate.y },
              { x: coordinates[1].x, y: centerCoordinate.y },
            ],
          },
          styles: {
            color: lineColor,
          },
        },
        {
          type: 'line',
          attrs: {
            coordinates: [
              { x: centerCoordinate.x, y: coordinates[0].y },
              { x: centerCoordinate.x, y: coordinates[1].y },
            ],
          },
          styles: {
            color: lineColor,
          },
        },
      ];

      if (leftToRight) {
        figures.push({
          type: 'line',
          attrs: {
            coordinates: [
              { x: coordinates[1].x - 6, y: centerCoordinate.y - 4 },
              { x: coordinates[1].x, y: centerCoordinate.y },
              { x: coordinates[1].x - 6, y: centerCoordinate.y + 4 },
            ],
          },
        });
      } else {
        figures.push({
          type: 'line',
          attrs: {
            coordinates: [
              { x: coordinates[1].x + 6, y: centerCoordinate.y - 4 },
              { x: coordinates[1].x, y: centerCoordinate.y },
              { x: coordinates[1].x + 6, y: centerCoordinate.y + 4 },
            ],
          },
        });
      }

      if (topToBottom) {
        figures.push({
          type: 'line',
          attrs: {
            coordinates: [
              { x: centerCoordinate.x - 4, y: coordinates[1].y - 6 },
              { x: centerCoordinate.x, y: coordinates[1].y },
              { x: centerCoordinate.x + 4, y: coordinates[1].y - 6 },
            ],
          },
          styles: {
            color: lineColor,
          },
        });
      } else {
        figures.push({
          type: 'line',
          attrs: {
            coordinates: [
              { x: centerCoordinate.x - 4, y: coordinates[1].y + 6 },
              { x: centerCoordinate.x, y: coordinates[1].y },
              { x: centerCoordinate.x + 4, y: coordinates[1].y + 6 },
            ],
          },
          styles: {
            color: lineColor,
          },
        });
      }
      const length = texts.length;
      if (length > 0) {
        const tipGap = 8;
        const textGap = 4;
        const horizontalPadding = 12;
        const verticalPadding = 8;
        let y;
        let width = 0;
        const height =
          length * 12 + (length - 1) * textGap + verticalPadding * 2;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        texts.forEach((text) => {
          width = Math.max(utils.calcTextWidth(text as string), width);
        });
        width += horizontalPadding * 2;
        if (topToBottom) {
          if (coordinates[1].y + tipGap + height > bounding.height) {
            y = bounding.height - height;
          } else {
            y = coordinates[1].y + tipGap;
          }
        } else {
          if (coordinates[1].y - tipGap - height < 0) {
            y = 0;
          } else {
            y = coordinates[1].y - tipGap - height;
          }
        }

        figures.push({
          type: 'rect',
          attrs: {
            x: centerCoordinate.x - width / 2,
            y,
            width,
            height,
          },
          styles: {
            borderRadius: 4,
            color: tipBackgroundColor,
          },
        });

        let textY = y + verticalPadding;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        texts.forEach((text) => {
          figures.push({
            type: 'text',
            attrs: {
              x: centerCoordinate.x,
              y: textY,
              text,
              align: 'center',
            },
            styles: {
              paddingLeft: 0,
              paddingTop: 0,
              paddingRight: 0,
              paddingBottom: 0,
              backgroundColor: 'none',
              family: 'Space Grotesk, sans-serif',
            },
          });
          textY += 12 + textGap;
        });
      }
      return figures;
    }
    return [];
  },
};

export default measure;
