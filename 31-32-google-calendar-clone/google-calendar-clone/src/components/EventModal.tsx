import { format } from "date-fns";
import { EventObject, useDayContext } from "./Day";
import { Form } from "./Form";

interface CreateEventModalProps {
  event?: EventObject;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}
export function EventModal({ event, onChange }: CreateEventModalProps) {
  const { day } = useDayContext();

  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-body">
        <div className="modal-title">
          <div>{event ? "Edit event" : "Add event"}</div>
          <small>{format(day, "PPP")}</small>
          <button className="close-btn" onClick={() => onChange(false)}>
            &times;
          </button>
        </div>
        <Form onChange={onChange} />
      </div>
    </div>
  );
}
