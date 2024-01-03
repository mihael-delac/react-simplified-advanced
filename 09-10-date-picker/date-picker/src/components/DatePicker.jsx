/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getAllDaysInView } from "../scripts/getAllDaysInView";

export function DatePicker({ date, onChange }) {
  const [selectedDate, setSelectedDate] = useState(date);
  const [currentMonthDays, setCurrentMonthDays] = useState({});

  useEffect(() => {
    setCurrentMonthDays(() => getAllDaysInView(date));
  }, [date, selectedDate]);
  console.log(currentMonthDays);
  return (
    <div className="date-picker">
      <DatePickerHeader date={date} />
      <DatePickerDayNames />
      <div className="date-picker-grid-dates date-picker-grid">
        <DatePickerGrid
          currentMonthDays={currentMonthDays}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}
function DatePickerHeader({ date }) {
  return (
    <div className="date-picker-header">
      <button className="prev-month-button month-button">&larr;</button>
      <div className="current-month">{format(date, "MMMM - yyyy")}</div>
      <button className="next-month-button month-button">&rarr;</button>
    </div>
  );
}

function DatePickerDayNames() {
  return (
    <div className="date-picker-grid-header date-picker-grid">
      <div>Sun</div>
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
    </div>
  );
}
function DatePickerGrid({ currentMonthDays }) {
  return (
    <>
      {currentMonthDays.previous?.map((day) => {
        return (
          <button
            className="date date-picker-other-month-date"
            key={crypto.randomUUID()}
          >
            {day}
          </button>
        );
      })}

      {currentMonthDays.current?.map((day) => {
        return (
          <button className="date" key={crypto.randomUUID()}>
            {day}
          </button>
        );
      })}
      {currentMonthDays.next?.map((day) => {
        return (
          <button
            className="date date-picker-other-month-date"
            key={crypto.randomUUID()}
          >
            {day}
          </button>
        );
      })}
    </>
  );
}
