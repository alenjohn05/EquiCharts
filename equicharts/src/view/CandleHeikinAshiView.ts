/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type Nullable from '../common/Nullable';
import type VisibleData from '../common/VisibleData';
import type BarSpace from '../common/BarSpace';
import { type EventHandler } from '../common/SyntheticEvent';
import { ActionType } from '../common/Action';
import {
  CandleType,
  type CandleBarColor,
  type RectStyle,
  PolygonType,
} from '../common/Styles';

import type ChartStore from '../store/ChartStore';

import { type FigureCreate } from '../component/Figure';
import { type RectAttrs } from '../extension/figure/rect';

import ChildrenView from './ChildrenView';

import { PaneIdConstants } from '../pane/types';
import { isValid } from '../common/utils/typeChecks';
import type TViewData from '../common/TViewData';

export interface CandleBarOptions {
  type: CandleType.HeikinAshi;
  styles: CandleBarColor;
}

export default class CandleHeikinAshiView extends ChildrenView {
  private readonly _boundCandleBarClickEvent = (data: VisibleData) => () => {
    this.getWidget()
      .getPane()
      .getChart()
      .getChartStore()
      .getActionStore()
      .execute(ActionType.OnCandleBarClick, data);
    return false;
  };

  override drawImp(ctx: CanvasRenderingContext2D): void {
    const pane = this.getWidget().getPane();
    const isMain = pane.getId() === PaneIdConstants.CANDLE;
    const chartStore = pane.getChart().getChartStore();
    const mainDataList = chartStore.getDataList();
    const visibleDataList = chartStore.getVisibleDataList();
    const hAData = this._calculateHeikinAshi(mainDataList);
    const candleBarOptions = this.getCandleBarOptions(chartStore);
    const barSpace = chartStore.getTimeScaleStore().getBarSpace();
    if (candleBarOptions !== null) {
      const yAxis = pane.getAxisComponent();
      if (visibleDataList.length > 0) {
        const filteredData = visibleDataList.map((each) => {
          const matchingElement = hAData.find(
            (element) => element.timestamp === each?.data?.timestamp,
          );
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          return matchingElement
            ? { data: matchingElement, dataIndex: each.dataIndex, x: each.x }
            : each;
        });
        filteredData.forEach((data: VisibleData) => {
          const { data: TViewData, x } = data;
          if (isValid(TViewData)) {
            const { open, high, low, close } = TViewData;
            const { styles } = candleBarOptions;
            const colors: string[] = [];
            if (close > open) {
              colors[0] = styles.upColor;
              colors[1] = styles.upBorderColor;
              colors[2] = styles.upWickColor;
            } else if (close < open) {
              colors[0] = styles.downColor;
              colors[1] = styles.downBorderColor;
              colors[2] = styles.downWickColor;
            } else {
              colors[0] = styles.noChangeColor;
              colors[1] = styles.noChangeBorderColor;
              colors[2] = styles.noChangeWickColor;
            }
            const openY = yAxis.convertToPixel(open);
            const closeY = yAxis.convertToPixel(close);
            const priceY = [
              openY,
              closeY,
              yAxis.convertToPixel(high),
              yAxis.convertToPixel(low),
            ];
            priceY.sort((a, b) => a - b);
            let rects: Array<
              FigureCreate<RectAttrs | RectAttrs[], Partial<RectStyle>>
            > = [];
            rects = this._createSolidBar(x, priceY, barSpace, colors);
            rects.forEach((rect) => {
              let handler: EventHandler | undefined;
              if (isMain) {
                handler = {
                  mouseClickEvent: this._boundCandleBarClickEvent(data),
                };
              }
              this.createFigure(rect, handler)?.draw(ctx);
            });
          }
        });
      }
    }
  }

  protected getCandleBarOptions(
    chartStore: ChartStore,
  ): Nullable<CandleBarOptions> {
    const candleStyles = chartStore.getStyles().candle;
    return {
      type: CandleType.HeikinAshi,
      styles: candleStyles.bar,
    };
  }

  private _createSolidBar(
    x: number,
    priceY: number[],
    barSpace: BarSpace,
    colors: string[],
  ): Array<FigureCreate<RectAttrs | RectAttrs[], Partial<RectStyle>>> {
    return [
      {
        name: 'rect',
        attrs: {
          x,
          y: priceY[0],
          width: 1,
          height: priceY[3] - priceY[0],
        },
        styles: { color: colors[2] },
      },
      {
        name: 'rect',
        attrs: {
          x: x - barSpace.halfGapBar,
          y: priceY[1],
          width: barSpace.gapBar,
          height: Math.max(1, priceY[2] - priceY[1]),
        },
        styles: {
          style: PolygonType.StrokeFill,
          color: colors[0],
          borderColor: colors[1],
        },
      },
    ];
  }

  private _calculateHeikinAshi(data: TViewData[]): TViewData[] {
    const haData: TViewData[] = [];
    for (let i = 0; i < data.length; i++) {
      const currentData = data[i];
      let haOpen: number;
      let haClose: number;
      let haHigh: number;
      let haLow: number;
      if (i === 0) {
        haOpen = (currentData.open + currentData.close) / 2;
        haClose =
          (currentData.open +
            currentData.high +
            currentData.low +
            currentData.close) /
          4;
        haHigh = currentData.high;
        haLow = currentData.low;
      } else {
        const prevHA = haData[i - 1];
        haOpen = (prevHA.open + prevHA.close) / 2;
        haClose =
          (currentData.open +
            currentData.high +
            currentData.low +
            currentData.close) /
          4;
        haHigh = Math.max(currentData.high, haOpen, haClose);
        haLow = Math.min(currentData.low, haOpen, haClose);
      }
      haData.push({
        open: haOpen,
        high: haHigh,
        low: haLow,
        close: haClose,
        timestamp: currentData.timestamp,
        volume: currentData.volume,
        turnover: currentData.turnover,
      });
    }
    return haData;
  }
}
