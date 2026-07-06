const startOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

const addMinutes = (date, minutes) => {
  return new Date(new Date(date).getTime() + minutes * 60 * 1000);
};

const isPast = (date) => {
  return new Date(date).getTime() < Date.now();
};

const formatISODate = (date = new Date()) => {
  return new Date(date).toISOString();
};

module.exports = {
  startOfDay,
  endOfDay,
  addMinutes,
  isPast,
  formatISODate,
};