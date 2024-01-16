import { format, subMonths } from "date-fns";
import { useDateContext } from "../App";

export function Header() {
  const { date, onChange } = useDateContext();

  function handleTodayClick() {
    onChange(() => new Date());
  }

  const handleMonthChange = {
    previous: () => onChange(subMonths(date, 1)),
    next: () => onChange(subMonths(date, -1)),
  };

  return (
    <div className="header">
      <button className="btn" onClick={handleTodayClick}>
        Today
      </button>
      <div>
        <button
          className="month-change-btn"
          onClick={handleMonthChange.previous}
        >
          &lt;
        </button>
        <button className="month-change-btn" onClick={handleMonthChange.next}>
          &gt;
        </button>
      </div>
      <span className="month-title">{`${format(date, "MMMM")} ${format(
        date,
        "yyy"
      )}`}</span>
    </div>
  );
}
