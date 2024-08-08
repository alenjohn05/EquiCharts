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
  type IndicatorTemplate,
  IndicatorSeries,
} from '../../component/Indicator';

interface Avp {
  avp?: number;
}

/**
 * average price
 */
const averagePrice: IndicatorTemplate<Avp> = {
  name: 'AVP',
  shortName: 'AVP',
  series: IndicatorSeries.Price,
  precision: 2,
  figures: [{ key: 'avp', title: 'AVP: ', type: 'line' }],
  calc: (dataList: TViewData[]) => {
    let totalTurnover = 0;
    let totalVolume = 0;
    return dataList.map((TViewData: TViewData) => {
      const avp: Avp = {};
      const turnover = TViewData?.turnover ?? 0;
      const volume = TViewData?.volume ?? 0;
      totalTurnover += turnover;
      totalVolume += volume;
      if (totalVolume !== 0) {
        avp.avp = totalTurnover / totalVolume;
      }
      return avp;
    });
  },
};

export default averagePrice;
