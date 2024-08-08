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
} from '../../component/Indicator';

interface Obv {
  obv?: number;
  maObv?: number;
}

/**
 * OBV
 * OBV = REF(OBV) + sign * V
 */
const onBalanceVolume: IndicatorTemplate<Obv> = {
  name: 'OBV',
  shortName: 'OBV',
  calcParams: [30],
  figures: [
    { key: 'obv', title: 'OBV: ', type: 'line' },
    { key: 'maObv', title: 'MAOBV: ', type: 'line' },
  ],
  calc: (dataList: TViewData[], indicator: Indicator<Obv>) => {
    const params = indicator.calcParams as number[];
    let obvSum = 0;
    let oldObv = 0;
    const result: Obv[] = [];
    dataList.forEach((TViewData: TViewData, i: number) => {
      const prevTViewData = dataList[i - 1] ?? TViewData;
      if (TViewData.close < prevTViewData.close) {
        oldObv -= TViewData.volume ?? 0;
      } else if (TViewData.close > prevTViewData.close) {
        oldObv += TViewData.volume ?? 0;
      }
      const obv: Obv = { obv: oldObv };
      obvSum += oldObv;
      if (i >= params[0] - 1) {
        obv.maObv = obvSum / params[0];
        obvSum -= result[i - (params[0] - 1)].obv ?? 0;
      }
      result.push(obv);
    });
    return result;
  },
};

export default onBalanceVolume;
