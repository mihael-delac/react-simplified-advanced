import { useState } from "react";

interface Event {
  allDay?: boolean;
  time?: string;
  color: string;
  name: string;
  id: string;
}

class EventClass implements Event {
  allDay?: boolean;
  time?: string;
  color: string;
  name: string;
  id: string;

  constructor(event: Event) {
    if (!event.allDay && !event.time) {
      throw new Error("Either 'allDay' must be true or 'time' must exist.");
    } else if (event.allDay && event.time) {
      throw new Error("Either 'allDay' must be true or 'time' must exist.");
    }

    this.allDay = event.allDay;
    this.time = event.time;
    this.color = event.color;
    this.name = event.name;
    this.id = event.id;
  }
}

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  function createEvent(): void {
    setEvents((prevEvents) => [
      ...prevEvents,
      new EventClass({
        color: "green",
        time: "7pm",
        name: "test2222 event",
        id: crypto.randomUUID(),
      }),
      new EventClass({
        color: "green",
        allDay: true,
        name: "test event",
        id: crypto.randomUUID(),
      }),
    ]);
  }
  if (events.length < 2) createEvent();
  return (
    <div className="events">
      {events.map((event) => {
        return (
          <button
            className={`${event.allDay && "all-day-event"} event ${
              event.color
            }`}
            key={event.id}
          >
            {!event.allDay && (
              <>
                <div className="color-dot blue"></div>
                <div className="event-time">{event.time}</div>
              </>
            )}
            <div className="event-name">{event.name}</div>
          </button>
        );
      })}
    </div>
  );
}
