export function getProgressPercent(index, answer, total) {
  // const answeredCount = index + (answer !== null ? 1 : 0);
  // return (answeredCount / total) * 100;

  const progressUnits = index * 2 + (answer !== null ? 2 : 1);
  const totalUnits = total * 2;
  return (progressUnits / totalUnits) * 100;
}