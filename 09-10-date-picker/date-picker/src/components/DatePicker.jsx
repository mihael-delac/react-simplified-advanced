/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useEffect, useState } from "react";

export function DatePicker({ selectedDate, onChange }) {
  const [visibleMonth, setVisibleMonth] = useState(selectedDate || new Date());
  const visibleDays = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  });

  function showPreviousMonth() {
    setVisibleMonth((curr) => addMonths(curr, -1));
  }
  function showNextMonth() {
    setVisibleMonth((curr) => addMonths(curr, 1));
  }

  useEffect(() => {
    setVisibleMonth(() => selectedDate || new Date());
  }, [selectedDate]);

  return (
    <div className="date-picker">
      <button
        className="today-button"
        onClick={() => setVisibleMonth(new Date())}
        disabled={isSameMonth(visibleMonth, new Date()) && true}
      >
        Jump to today
      </button>

      <div className="date-picker-header">
        <button
          className="prev-month-button month-button"
          onClick={showPreviousMonth}
        >
          &larr;
        </button>
        <div className="current-month">
          {format(visibleMonth, "MMMM - yyyy")}
        </div>
        <button
          className="next-month-button month-button"
          onClick={showNextMonth}
        >
          &rarr;
        </button>
      </div>
      <div className="date-picker-grid-header date-picker-grid">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="date-picker-grid-dates date-picker-grid">
        {visibleDays.map((day) => (
          <button
            className={`date ${
              !isSameMonth(day, visibleMonth) && "date-picker-other-month-date"
            }
            ${isSameDay(day, selectedDate) && "selected"}
            ${isToday(day) && "today"}`}
            key={day}
            onClick={() => onChange(day)}
          >
            {day.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
}
