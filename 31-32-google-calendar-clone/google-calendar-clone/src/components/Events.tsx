import { EventObject } from "./Day";
import { Event } from "./Event";

interface EventsProps {
  events: EventObject[];
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Events({ events, onChange }: EventsProps) {
  events.sort((a, b) => {
    if (a.allDay === b.allDay) {
      return 0;
    } else if (a.allDay) {
      return -1;
    } else {
      return 1;
    }
  });

  function handleClick() {
    if (events.length > 4) onChange(true);
  }
  return (
    <div className="events" onClick={handleClick}>
      {events?.map((event) => {
        return <Event event={event} key={event.id} />;
      })}
    </div>
  );
}
