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

import type Crosshair from '../../common/Crosshair';
import type TViewData from '../../common/TViewData';
import { type IndicatorStyle } from '../../common/Styles';
import {
  type Indicator,
  IndicatorSeries,
  type IndicatorCreateTooltipDataSourceParams,
  type IndicatorDrawParams,
} from '../../component/Indicator';

interface Vol {
  volume?: number;
}

const candleVolume = {
  name: 'candle_volume',
  shortName: 'Volume',
  title: 'VOLUME: ',
  type: 'bar',
  series: IndicatorSeries.Volume,
  shouldFormatBigNumber: true,
  precision: 0,
  minValue: 0,
  calc: (dataList: TViewData[]) => {
    return dataList.map((TViewData) => TViewData.volume);
  },
  createTooltipDataSource: ({
    TViewDataList,
    crosshair,
    indicator,
    defaultStyles,
  }: IndicatorCreateTooltipDataSourceParams) => {
    const { dataIndex }: Crosshair = crosshair;
    const { result }: Indicator<Vol> = indicator;
    if (dataIndex !== undefined && result[dataIndex] !== null) {
      const styles: IndicatorStyle = defaultStyles;
      let color: string;
      const TViewData: TViewData = TViewDataList[dataIndex];
      if (TViewData.close > TViewData.open) {
        color = styles.ohlc?.upColor;
      } else if (TViewData.close < TViewData.open) {
        color = styles.ohlc?.downColor;
      } else {
        color = styles.ohlc?.noChangeColor;
      }
      return {
        name: 'Volume',
        values: [
          { title: '', value: { text: result[dataIndex] ?? 'n/a', color } },
        ],
      };
    }
    return null;
  },
  draw: ({
    ctx,
    TViewDataList,
    bounding,
    visibleRange,
    barSpace,
    defaultStyles,
    indicator,
    xAxis,
  }: IndicatorDrawParams) => {
    const { from, to } = visibleRange;
    const result = indicator.result;
    let maxVolume = Number.MIN_SAFE_INTEGER;
    for (let i = from; i < to; i++) {
      const volume = result[i];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      maxVolume = Math.max(volume, maxVolume);
    }
    const height = bounding.height;
    const maxBarHeight = height / 4;
    ctx.globalCompositeOperation = 'destination-over';
    const styles: IndicatorStyle = defaultStyles;
    for (let i = from; i < to; i++) {
      const TViewData: TViewData = TViewDataList[i];
      const volume = result[i];
      let color: string;
      if (TViewData.close > TViewData.open) {
        color = styles.ohlc?.upColor;
      } else if (TViewData.close < TViewData.open) {
        color = styles.ohlc?.downColor;
      } else {
        color = styles.ohlc?.noChangeColor;
      }
      const x = xAxis.convertToPixel(i);
      ctx.fillStyle = color;
      const barStartY = height - (volume / maxVolume) * maxBarHeight;
      ctx.fillRect(
        x - barSpace.halfGapBar,
        barStartY,
        barSpace.gapBar,
        height - barStartY,
      );
    }
    return false;
  },
};

export default candleVolume;
