import {
  format,
  getDate,
  isBefore,
  isSameMonth,
  isSameWeek,
  isToday,
  startOfMonth,
} from "date-fns";
import { useDateContext } from "../App";
import { Events } from "./Events";

interface DayProps {
  day: Date;
}

export function Day({ day }: DayProps) {
  const { date } = useDateContext();
  const isNonMonthDay = isSameMonth(day, date);
  const isTodaysDate = isToday(day);
  const isBeforeToday = isTodaysDate ? false : isBefore(day, date); //for some reason it returns 'false' for today's date

  return (
    <div
      className={`day ${isNonMonthDay && "non-month-day"}  ${
        isBeforeToday && "old-month-day"
      }`}
      key={day.toDateString()}
    >
      <div className="day-header">
        {isSameWeek(startOfMonth(date), day) && (
          <div className="week-name">{format(day, "iii")}</div>
        )}
        <div className={`day-number ${isTodaysDate && "today"}`}>
          {getDate(day)}
        </div>
        <button className="add-event-btn">+</button>
      </div>
      <Events />
    </div>
  );
}
