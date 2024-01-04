/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./assets/styles.css";
import { DatePicker } from "./components/DatePicker";
import { format } from "date-fns";

function App() {
  const [selectedDate, setSelectedDate] = useState();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="date-picker-container">
      <button
        className="date-picker-button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
      </button>
      {isOpen && (
        <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
      )}
    </div>
  );
}

export default App;
