import { Coordinate, Bounding, LineAttrs, utils } from '../../core/dist';
import { Period } from '../types';

export function getRotateCoordinate(
  coordinate: Coordinate,
  targetCoordinate: Coordinate,
  angle: number,
): Coordinate {
  const x =
    (coordinate.x - targetCoordinate.x) * Math.cos(angle) -
    (coordinate.y - targetCoordinate.y) * Math.sin(angle) +
    targetCoordinate.x;
  const y =
    (coordinate.x - targetCoordinate.x) * Math.sin(angle) +
    (coordinate.y - targetCoordinate.y) * Math.cos(angle) +
    targetCoordinate.y;
  return { x, y };
}

export function getRayLine(
  coordinates: Coordinate[],
  bounding: Bounding,
): LineAttrs | LineAttrs[] {
  if (coordinates.length > 1) {
    let coordinate: Coordinate;
    if (
      coordinates[0].x === coordinates[1].x &&
      coordinates[0].y !== coordinates[1].y
    ) {
      if (coordinates[0].y < coordinates[1].y) {
        coordinate = {
          x: coordinates[0].x,
          y: bounding.height,
        };
      } else {
        coordinate = {
          x: coordinates[0].x,
          y: 0,
        };
      }
    } else if (coordinates[0].x > coordinates[1].x) {
      coordinate = {
        x: 0,
        y: utils.getLinearYFromCoordinates(coordinates[0], coordinates[1], {
          x: 0,
          y: coordinates[0].y,
        }),
      };
    } else {
      coordinate = {
        x: bounding.width,
        y: utils.getLinearYFromCoordinates(coordinates[0], coordinates[1], {
          x: bounding.width,
          y: coordinates[0].y,
        }),
      };
    }
    return { coordinates: [coordinates[0], coordinate] };
  }
  return [];
}

export function getDistance(
  coordinate1: Coordinate,
  coordinate2: Coordinate,
): number {
  const xDis = Math.abs(coordinate1.x - coordinate2.x);
  const yDis = Math.abs(coordinate1.y - coordinate2.y);
  return Math.sqrt(xDis * xDis + yDis * yDis);
}

export function getAngle(
  coordinate1: Coordinate,
  coordinate2: Coordinate,
): number {
  const dx = coordinate2.x - coordinate1.x;
  const dy = coordinate2.y - coordinate1.y;
  const radians = Math.atan2(dy, dx);
  const degrees = radians * (180 / Math.PI);
  return degrees;
}

export function getMidpoint(
  coordinate1: Coordinate,
  coordinate2: Coordinate,
): { x: number; y: number } {
  const x = (coordinate1.x + coordinate2.x) / 2;
  const y = (coordinate1.y + coordinate2.y) / 2;
  return { x, y };
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

export function formatDate(timestamp: number): string {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
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

  const date = new Date(timestamp);

  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${dayOfWeek} ${day} ${month}' ${year}`;
}

export function addPeriodsToTimestamp(
  period: Period,
  timestamp: number,
  multiplier: number,
) {
  let newTimestamp = timestamp;
  switch (period.timespan) {
    case 'minute': {
      newTimestamp += multiplier * period.multiplier * 60 * 1000;
      break;
    }
    case 'hour': {
      newTimestamp += multiplier * period.multiplier * 60 * 60 * 1000;
      break;
    }
    case 'day': {
      newTimestamp += multiplier * period.multiplier * 24 * 60 * 60 * 1000;
      break;
    }
    case 'week': {
      newTimestamp += multiplier * period.multiplier * 7 * 24 * 60 * 60 * 1000;
      break;
    }
    case 'month': {
      const date = new Date(timestamp);
      const currentMonth = date.getMonth();
      const newMonth = currentMonth + multiplier * period.multiplier;
      date.setMonth(newMonth);
      newTimestamp = date.getTime();
      break;
    }
    case 'year': {
      const date = new Date(timestamp);
      const currentYear = date.getFullYear();
      const newYear = currentYear + multiplier * period.multiplier;
      date.setFullYear(newYear);
      newTimestamp = date.getTime();
      break;
    }
    default:
      throw new Error(`Unsupported timespan: ${period.timespan}`);
  }
  return newTimestamp;
}
