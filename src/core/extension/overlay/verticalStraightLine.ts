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

import { type OverlayTemplate } from '../../component/Overlay';

const verticalStraightLine: OverlayTemplate = {
  name: 'verticalStraightLine',
  totalStep: 2,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates, bounding }) => {
    return [
      {
        type: 'line',
        attrs: {
          coordinates: [
            {
              x: coordinates[0].x,
              y: 0,
            },
            {
              x: coordinates[0].x,
              y: bounding.height,
            },
          ],
        },
      },
    ];
  },
};

export default verticalStraightLine;
