import { createContext, useContext, useState } from "react";
import { EventObject } from "./Day";
import { createPortal } from "react-dom";
import { EventModal } from "./EventModal";

interface EventProp {
  event: EventObject;
}

const EventContext = createContext<EventObject | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useEventContext = () => {
  const event = useContext(EventContext);
  // if (!event) {
  //   throw new Error("useEventContext must be used within a Provider");
  // }
  return event;
};

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
            <div className={`color-dot ${event.color}`}></div>
            <div className="event-time">{event.time?.startTime}</div>
          </>
        )}
        <div className="event-name">{event.name}</div>
      </button>
      {isEditEventModalOpen &&
        createPortal(
          <EventContext.Provider value={event}>
            <EventModal event={event} onChange={setIsEditEventModalOpen} />
          </EventContext.Provider>,
          document.body
        )}
    </>
  );
}
