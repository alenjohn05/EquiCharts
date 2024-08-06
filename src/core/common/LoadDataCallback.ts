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

import type Nullable from './Nullable';
import type TViewData from './TViewData';

enum LoadDataType {
  Init = 'init',
  Forward = 'forward',
  Backward = 'backward',
}

interface LoadDataParams {
  type: LoadDataType;
  data: Nullable<TViewData>;
  callback: (dataList: TViewData[], more?: boolean) => void;
}

export { LoadDataType, type LoadDataParams };

type LoadDataCallback = (params: LoadDataParams) => void;

export default LoadDataCallback;
