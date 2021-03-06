/**
 * areDatesEqual
 * compare two dates
 *
 * @param  {Date} firstDate
 * @param  {Date} secondDate
 * @return {Boolean}
 */
export function areDatesEqual(firstDate, secondDate) {
  if (firstDate instanceof Date && secondDate instanceof Date) {
    return firstDate.getTime() === secondDate.getTime();
  }

  return false;
}

/**
 * createDate
 * create a date in the beginning of the day
 *
 * @param  {Date} date
 * @return {Date}
 */
export function createDate(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return new Date(year, month, day, 0, 0, 0, 0);
}

const storedTasks = new WeakMap();

/**
 * debounce
 * prevent dublicate calls
 *
 * @param  {Function} func
 * @param  {Number}   timeout
 */
export function debounce(func, timeout = 0) {
  clearTimeout(storedTasks.get(func));
  storedTasks.set(func, setTimeout(func, timeout));
}
