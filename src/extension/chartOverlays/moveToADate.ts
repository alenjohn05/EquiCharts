import {
  KLineData,
  LineType,
  Nullable,
  OverlayCreateFiguresCallbackParams,
  PolygonType,
} from '../../../core/dist';
import { formatDate } from '../utils';

export function getMoveToADateOverlay(timeData: number) {
  console.log(timeData);
  return {
    name: 'priceLine2',
    totalStep: 2,
    needDefaultPointFigure: false,
    needDefaultXAxisFigure: false,
    needDefaultYAxisFigure: false,
    styles: {
      line: { style: LineType.Dashed, color: '#FCB900' },
      polygon: { style: PolygonType.Fill, color: '#FCB900' },
      text: {
        color: '#FCB900',
        style: PolygonType.Stroke,
        borderColor: '#FCB900',
      },
    },
    createPointFigures: ({
      yAxis,
      xAxis,
    }: OverlayCreateFiguresCallbackParams) => {
      if (!xAxis || !yAxis || !timeData) return [];
      // @ts-ignore
      const x = xAxis?.convertTimestampToPixel(timeData);
      // @ts-ignore
      const data: Nullable<KLineData> | undefined =
        xAxis?.convertTimestampToData(timeData);
      if (data) {
        const y = yAxis?.convertToPixel(data.high);
        const startX = x;
        const startY = y - 6;
        const lineEndY = startY - 50;
        const arrowEndY = lineEndY - 5;
        return [
          {
            type: 'line',
            attrs: {
              coordinates: [
                { x: startX, y: startY },
                { x: startX, y: lineEndY },
              ],
            },
            ignoreEvent: true,
          },
          {
            type: 'polygon',
            attrs: {
              coordinates: [
                { x: startX, y: lineEndY },
                { x: startX - 4, y: arrowEndY },
                { x: startX + 4, y: arrowEndY },
              ],
            },
            ignoreEvent: true,
          },
          {
            type: 'text',
            attrs: {
              x: startX,
              y: arrowEndY,
              text: formatDate(timeData),
              align: 'center',
              baseline: 'bottom',
            },
            ignoreEvent: true,
          },
        ];
      }
      return [];
    },
  };
}
