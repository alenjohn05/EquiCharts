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

import type TViewData from '../../common/TViewData';
import {
  type Indicator,
  type IndicatorTemplate,
  IndicatorSeries,
} from '../../component/Indicator';

interface Ma {
  ma1?: number;
}

/**
 * MA 移动平均
 */
const movingAverage: IndicatorTemplate<Ma> = {
  name: 'MA',
  shortName: 'MA',
  series: IndicatorSeries.Price,
  calcParams: [5],
  precision: 2,
  shouldOhlc: false,
  figures: [{ key: 'ma', title: 'MA: ', type: 'line' }],
  regenerateFigures: (params: any[]) => {
    return params.map((p: number, i: number) => {
      return { key: `ma${i + 1}`, title: `MA${p}: `, type: 'line' };
    });
  },
  calc: (dataList: TViewData[], indicator: Indicator<Ma>) => {
    const { calcParams: params, figures } = indicator;
    const closeSums: number[] = [];
    return dataList.map((TViewData: TViewData, i: number) => {
      const ma = {};
      const close = TViewData.close;
      params.forEach((p: number, index: number) => {
        closeSums[index] = (closeSums[index] ?? 0) + close;
        if (i >= p - 1) {
          ma[figures[index].key] = closeSums[index] / p;
          closeSums[index] -= dataList[i - (p - 1)].close;
        }
      });
      return ma;
    });
  },
};

export default movingAverage;
