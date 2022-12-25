export function getPreparationTime(startTime: Date, endTime: Date = new Date()) {
  // return Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
  return (endTime.getTime() - startTime.getTime()) / 1000;
}
