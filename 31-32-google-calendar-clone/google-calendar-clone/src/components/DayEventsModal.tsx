import { format } from "date-fns";
import { Events } from "./Events";
import { EventObject, useDayContext } from "./Day";

interface DayEventsModalProps {
  events: EventObject[];
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DayEventsModal({ events, onChange }: DayEventsModalProps) {
  const { day } = useDayContext();
  console.log(events);
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
