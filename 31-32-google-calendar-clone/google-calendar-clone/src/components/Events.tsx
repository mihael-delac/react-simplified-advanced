import { useRef, useState } from "react";
import { EventObject } from "./Day";
import { Event } from "./Event";

interface EventsProps {
  events: EventObject[];
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Events({ events, onChange }: EventsProps) {
  const eventsRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [hiddenEventCount, setHiddenEventCount] = useState<number>(0);
  return (
    <>
      <div className="events" ref={eventsRef}>
        {events.map((event) => (
          <Event
            event={event}
            key={event.id}
            overflow={setIsOverflowing}
            setHiddenEventCount={setHiddenEventCount}
          />
        ))}
      </div>
      {isOverflowing && (
        <button className="events-view-more-btn" onClick={() => onChange(true)}>
          Show {`+${hiddenEventCount}`} more
        </button>
      )}
    </>
  );
}
