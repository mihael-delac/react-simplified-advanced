/* eslint-disable no-unused-vars */
import {
  endOfMonth,
  getDay,
  getDaysInMonth,
  setMonth,
  startOfMonth,
} from "date-fns";
let allDaysInView = {};

export function getAllDaysInView(date) {
  getPreviousMonthDaysInView(date);
  getCurrentMonthDaysInView(date);
  getNextMonthDaysInView(date);
  return allDaysInView;
}
function getPreviousMonthDaysInView(date) {
  const previousMonthLength = getDaysInMonth(setMonth(date, -1));
  const firstWeekOtherDaysNumber = getDay(startOfMonth(date));
  const previousMonthDaysInView = [];
  for (let i = 0; i < firstWeekOtherDaysNumber; i++) {
    previousMonthDaysInView.push(previousMonthLength - i);
  }
  allDaysInView = {
    ...allDaysInView,
    previous: previousMonthDaysInView,
  };
}
function getCurrentMonthDaysInView(date) {
  const currentMonthDaysInView = [];
  for (let i = 1; i <= getDaysInMonth(date); i++) {
    currentMonthDaysInView.push(i);
  }
  allDaysInView = {
    ...allDaysInView,
    current: currentMonthDaysInView,
  };
}
function getNextMonthDaysInView(date) {
  const lastDayOfCurrentMonth = getDay(endOfMonth(date));
  const lastWeekOtherDaysNumber = 6 - lastDayOfCurrentMonth;
  const nextMonthDaysInView = [];
  for (let i = 1; i <= lastWeekOtherDaysNumber; i++) {
    nextMonthDaysInView.push(i);
  }
  allDaysInView = {
    ...allDaysInView,
    next: nextMonthDaysInView,
  };
}
