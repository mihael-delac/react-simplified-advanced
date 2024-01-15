import { format } from "date-fns";
import { useDateContext } from "../App";

export function Header() {
  const value = useDateContext();
  return (
    <div className="header">
      <button className="btn" onClick={value.onChange(() => new Date())}>
        Today
      </button>
      <div>
        <button className="month-change-btn">&lt;</button>
        <button className="month-change-btn">&gt;</button>
      </div>
      <span className="month-title">{`${format(value.date, "MMMM")} ${format(
        value.date,
        "YYY"
      )}`}</span>
    </div>
  );
}
