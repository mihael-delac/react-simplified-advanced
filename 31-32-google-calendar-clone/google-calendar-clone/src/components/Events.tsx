import { EventObject } from "./Day";
import { Event } from "./Event";

interface EventsProps {
  // onChange: React.Dispatch<React.SetStateAction<boolean>>;
  events: EventObject[];
}

export function Events({ events }: EventsProps) {
  return (
    <div className="events">
      {events?.map((event) => {
        return <Event event={event} key={event.id} />;
      })}
    </div>
  );
}
