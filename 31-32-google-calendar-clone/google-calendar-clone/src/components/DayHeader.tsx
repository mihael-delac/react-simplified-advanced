import { format, getDate, isSameWeek, isToday, startOfMonth } from "date-fns";
import { useDateContext } from "../App";
import { useDayContext } from "./Day";

interface DayHeaderProps {
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DayHeader({ onChange }: DayHeaderProps) {
  const { date } = useDateContext();
  const { day } = useDayContext();

  return (
    <div className="day-header">
      {isSameWeek(startOfMonth(date), day) && (
        <div className="week-name">{format(day, "iii")}</div>
      )}

      <div className={`day-number ${isToday(day) && "today"}`}>
        {getDate(day)}
      </div>
      <button className="add-event-btn" onClick={() => onChange(true)}>
        +
      </button>
    </div>
  );
}
