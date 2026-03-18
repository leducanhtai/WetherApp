export const convertTemp = (temp, isMetric) => {
  if (isMetric) {
    return Math.round(temp);
  }
  // Convert Celsius to Fahrenheit
  return Math.round((temp * 9) / 5 + 32);
};

export const convertSpeed = (speed, isMetric) => {
  if (isMetric) {
    return `${Math.round(speed)} m/s`;
  }
  // Convert Meters/sec to Miles/hour
  return `${Math.round(speed * 2.237)} mph`;
};