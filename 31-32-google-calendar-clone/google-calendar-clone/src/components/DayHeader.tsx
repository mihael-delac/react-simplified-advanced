import { format, getDate, isSameWeek, isToday, startOfMonth } from "date-fns";
import { useDateContext } from "../App";

interface DayHeaderProps {
  day: Date;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DayHeader({ day, onChange }: DayHeaderProps) {
  const { date } = useDateContext();

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
