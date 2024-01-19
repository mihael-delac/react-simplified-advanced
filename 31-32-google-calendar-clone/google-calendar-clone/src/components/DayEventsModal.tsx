import { format } from "date-fns";
import { Events } from "./Events";
import { EventObject, useDayContext } from "./Day";

interface DayEventsModalProps {
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
  events: EventObject[];
}

export function DayEventsModal({ onChange, events }: DayEventsModalProps) {
  const { day } = useDayContext();
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
