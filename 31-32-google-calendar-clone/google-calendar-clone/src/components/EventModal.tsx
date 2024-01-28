import { format } from "date-fns";
import { EventObject, useDayContext } from "./Day";
import { Form } from "./Form";
import { useState } from "react";

interface EventModalProps {
  event?: EventObject;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}
export function EventModal({ event, onChange }: EventModalProps) {
  const { day } = useDayContext();
  const [isClosing, setIsClosing] = useState(false);

  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onChange(false);
    }, 250);
  }

  return (
    <div className={`modal ${isClosing ? "closing" : ""}`}>
      <div className="overlay"></div>
      <div className="modal-body">
        <div className="modal-title">
          <div>{event ? "Edit event" : "Add event"}</div>
          <small>{format(day, "PPP")}</small>
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>
        <Form onChange={handleClose} />
      </div>
    </div>
  );
}
