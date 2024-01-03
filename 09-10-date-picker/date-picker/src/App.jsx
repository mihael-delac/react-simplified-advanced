/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./assets/styles.css";
import { DatePicker } from "./components/DatePicker";
import { format } from "date-fns";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="date-picker-container">
      <button
        className="date-picker-button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        {format(selectedDate, "PPP")}
      </button>
      {isOpen && <DatePicker date={selectedDate} onChange={setSelectedDate} />}
    </div>
  );
}

export default App;
