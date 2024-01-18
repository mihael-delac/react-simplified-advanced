import { EventObject } from "./Day";
import { Event } from "./Event";

interface EventsProps {
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
  events: EventObject[];
}

export function Events({ onChange, events }: EventsProps) {
  return (
    <div className="events" onClick={() => onChange(true)}>
      {events?.map((event) => {
        return <Event event={event} key={event.id} />;
      })}
    </div>
  );
}
