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

interface Brar {
  br?: number;
  ar?: number;
}

/**
 * BRAR
 * 默认参数是26。
 * 公式N日BR=N日内（H－CY）之和除以N日内（CY－L）之和*100，
 * 其中，H为当日最高价，L为当日最低价，CY为前一交易日的收盘价，N为设定的时间参数。
 * N日AR=(N日内（H－O）之和除以N日内（O－L）之和)*100，
 * 其中，H为当日最高价，L为当日最低价，O为当日开盘价，N为设定的时间参数
 *
 */
const brar: IndicatorTemplate<Brar> = {
  name: 'BRAR',
  shortName: 'BRAR',
  calcParams: [26],
  figures: [
    { key: 'br', title: 'BR: ', type: 'line' },
    { key: 'ar', title: 'AR: ', type: 'line' },
  ],
  calc: (dataList: TViewData[], indicator: Indicator<Brar>) => {
    const params = indicator.calcParams;
    let hcy = 0;
    let cyl = 0;
    let ho = 0;
    let ol = 0;
    return dataList.map((TViewData: TViewData, i: number) => {
      const brar: Brar = {};
      const high = TViewData.high;
      const low = TViewData.low;
      const open = TViewData.open;
      const prevClose = (dataList[i - 1] ?? TViewData).close;
      ho += high - open;
      ol += open - low;
      hcy += high - prevClose;
      cyl += prevClose - low;
      if (i >= params[0] - 1) {
        if (ol !== 0) {
          brar.ar = (ho / ol) * 100;
        } else {
          brar.ar = 0;
        }
        if (cyl !== 0) {
          brar.br = (hcy / cyl) * 100;
        } else {
          brar.br = 0;
        }
        const agoTViewData = dataList[i - (params[0] - 1)];
        const agoHigh = agoTViewData.high;
        const agoLow = agoTViewData.low;
        const agoOpen = agoTViewData.open;
        const agoPreClose = (
          dataList[i - params[0]] ?? dataList[i - (params[0] - 1)]
        ).close;
        hcy -= agoHigh - agoPreClose;
        cyl -= agoPreClose - agoLow;
        ho -= agoHigh - agoOpen;
        ol -= agoOpen - agoLow;
      }
      return brar;
    });
  },
};

export default brar;
