/**
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { isNumber, isValid } from './typeChecks';

const reEscapeChar = /\\(\\)?/g;
const rePropName = RegExp(
  '[^.[\\]]+' +
    '|' +
    '\\[(?:' +
    '([^"\'][^[]*)' +
    '|' +
    '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
    ')\\]' +
    '|' +
    '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))',
  'g',
);

export function formatValue(
  data: unknown,
  key: string,
  defaultValue?: unknown,
): unknown {
  if (isValid(data)) {
    const path: string[] = [];
    key.replace(rePropName, (subString: string, ...args: any[]) => {
      let k = subString;
      if (isValid(args[1])) {
        k = args[2].replace(reEscapeChar, '$1');
      } else if (isValid(args[0])) {
        k = args[0].trim();
      }
      path.push(k);
      return '';
    });
    let value = data;
    let index = 0;
    const length = path.length;
    while (isValid(value) && index < length) {
      value = value?.[path[index++]];
    }
    return isValid(value) ? value : (defaultValue ?? '--');
  }
  return defaultValue ?? '--';
}

export function formatDate(
  dateTimeFormat: Intl.DateTimeFormat,
  timestamp: number,
  format: string,
): string {
  const date: Record<string, string> = {};
  const dateObj = new Date(timestamp);
  const fullMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const shortMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let monthIndex = 0;
  dateTimeFormat.formatToParts(dateObj).forEach(({ type, value }) => {
    switch (type) {
      case 'year':
        date.YYYY = value;
        break;
      case 'month':
        monthIndex = parseInt(value, 10) - 1;
        date.MM = value.padStart(2, '0');
        date.M = String(parseInt(value, 10));
        date.MMMM = fullMonths[monthIndex];
        date.MMM = shortMonths[monthIndex];
        date.LL = shortMonths[monthIndex];
        date.LLL = shortMonths[monthIndex];
        date.LLLL = fullMonths[monthIndex];
        date.L = String(monthIndex + 1);
        date.ll = shortMonths[monthIndex].toLowerCase();
        date.lll = shortMonths[monthIndex].toLowerCase();
        date.llll = fullMonths[monthIndex].toLowerCase();
        date.l = String(monthIndex + 1);
        date.Mo = getOrdinal(parseInt(value, 10));
        break;
      case 'day':
        date.DD = value.padStart(2, '0');
        date.D = String(parseInt(value, 10));
        date.do = getOrdinal(parseInt(value, 10));
        break;
      case 'hour': {
        const hour = parseInt(value, 10);
        date.HH = value.padStart(2, '0');
        date.H = String(hour);
        date.hh = String(hour % 12 === 0 ? 12 : hour % 12).padStart(2, '0');
        date.h = String(hour % 12 === 0 ? 12 : hour % 12);
        date.k = String(hour === 0 ? 24 : hour);
        date.kk = String(hour === 0 ? 24 : hour).padStart(2, '0');
        date.K = String(hour % 12);
        date.KK = String(hour % 12).padStart(2, '0');
        break;
      }
      case 'minute':
        date.mm = value.padStart(2, '0');
        date.m = String(parseInt(value, 10));
        break;
      case 'second':
        date.ss = value.padStart(2, '0');
        date.s = String(parseInt(value, 10));
        break;
      case 'dayPeriod':
        date.a = value.toLowerCase();
        date.A = value.toUpperCase();
        break;
      case 'weekday': {
        const weekdays = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
        const shortWeekdays = weekdays.map((day) => day.slice(0, 3));
        const minWeekdays = weekdays.map((day) => day[0]);
        date.EEEE = weekdays[dateObj.getDay()];
        date.EEE = shortWeekdays[dateObj.getDay()];
        date.E = minWeekdays[dateObj.getDay()];
        break;
      }
    }
  });

  const dayOfYear = getDayOfYear(dateObj);
  date.DDD = String(dayOfYear).padStart(3, '0');
  date.DDDD = String(dayOfYear).padStart(4, '0');
  date.Do = getOrdinal(dayOfYear);

  const pattern =
    /YYYY|MMMM|MMM|MM|M|LL|LLL|LLLL|L|ll|lll|llll|l|Mo|DD|D|do|HH|H|hh|h|k|kk|K|KK|mm|m|ss|s|a|A|EEEE|EEE|E|DDD|DDDD|Do/g;
  return format.replace(pattern, (key) => date[key] ?? key);
}

function getOrdinal(n: number): string {
  const suffix = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (suffix[(v - 20) % 10] ?? suffix[v] ?? suffix[0]);
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff =
    date.getTime() -
    start.getTime() +
    (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function formatPrecision(
  value: string | number,
  precision?: number,
): string {
  const v = +value;
  if (isNumber(v)) {
    return v.toFixed(precision ?? 2);
  }
  return `${value}`;
}

export function formatBigNumber(value: string | number): string {
  const v = +value;
  if (isNumber(v)) {
    if (v > 1000000000) {
      return `${+(v / 1000000000).toFixed(3)}B`;
    }
    if (v > 1000000) {
      return `${+(v / 1000000).toFixed(3)}M`;
    }
    if (v > 1000) {
      return `${+(v / 1000).toFixed(3)}K`;
    }
  }
  return `${value}`;
}

export function formatThousands(value: string | number, sign: string): string {
  const vl = `${value}`;
  if (sign.length === 0) {
    return vl;
  }
  if (vl.includes('.')) {
    const arr = vl.split('.');
    return `${arr[0].replace(/(\d)(?=(\d{3})+$)/g, ($1) => `${$1}${sign}`)}.${arr[1]}`;
  }
  return vl.replace(/(\d)(?=(\d{3})+$)/g, ($1) => `${$1}${sign}`);
}

export function formatFoldDecimal(
  value: string | number,
  threshold: number,
): string {
  const vl = `${value}`;
  const reg = new RegExp('\\.0{' + threshold + ',}[1-9][0-9]*$');
  if (reg.test(vl)) {
    const result = vl.split('.');
    const v = result[result.length - 1];
    const match = v.match(/0*/);
    if (isValid(match)) {
      const count = match[0].length;
      result[result.length - 1] = v.replace(/0*/, `0{${count}}`);
      return result.join('.');
    }
  }
  return vl;
}
