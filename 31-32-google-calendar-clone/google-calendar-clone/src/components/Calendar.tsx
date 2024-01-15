import { Days } from "./Days";
import { Header } from "./Header";

export function Calendar() {
  return (
    <div className="calendar">
      <Header />
      <Days />
    </div>
  );
}
