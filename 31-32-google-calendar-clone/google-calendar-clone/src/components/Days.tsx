/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useDateContext } from "../App";
import { Day } from "./Day";

export function Days() {
  const { date } = useDateContext();
  const visibleDays = eachDayOfInterval({
    start: startOfWeek(startOfMonth(date)),
    end: endOfWeek(endOfMonth(date)),
  });

  return (
    <div className="days">
      {visibleDays.map((day) => (
        <Day key={day.toDateString()} day={day} />
      ))}
    </div>
  );
}
