import { format } from "date-fns";
import { Events } from "./Events";
import { EventObject } from "./Day";

interface DayEventsModalProps {
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
  day: Date;
  events: EventObject[];
}

export function DayEventsModal({ onChange, day, events }: DayEventsModalProps) {
  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-body">
        <div className="modal-title">
          {format(day, "PPP")}
          <button className="close-btn" onClick={() => onChange(false)}>
            &times;
          </button>
        </div>
        <Events onChange={onChange} events={events} />
      </div>
    </div>
  );
}
