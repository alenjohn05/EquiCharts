let baseId = 1;
let prevIdTimestamp = new Date().getTime();

export function createId(prefix?: string): string {
  const timestamp = new Date().getTime();
  if (timestamp === prevIdTimestamp) {
    ++baseId;
  } else {
    baseId = 1;
  }
  prevIdTimestamp = timestamp;
  return `${prefix ?? ''}${timestamp}_${baseId}`;
}
