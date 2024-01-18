import { useState } from "react";
import { EventObject } from "./Day";
import { createPortal } from "react-dom";
import { DayEventsModal } from "./DayEventsModal";

interface EventProp {
  event: EventObject;
}

export function Event({ event }: EventProp) {
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  return (
    <>
      <button
        className={`${event.allDay && "all-day-event"} event ${event.color}`}
        key={event.id}
        onClick={() => setIsEditEventModalOpen(true)}
      >
        {!event.allDay && (
          <>
            <div className="color-dot blue"></div>
            <div className="event-time">{event.time}</div>
          </>
        )}
        <div className="event-name">{event.name}</div>
      </button>
      {isEditEventModalOpen && createPortal(<DayEventsModal />, document.body)}
    </>
  );
}
