import { createContext, useContext, useEffect, useRef, useState } from "react";
import { EventObject } from "./Day";
import { createPortal } from "react-dom";
import { EventModal } from "./EventModal";

interface EventProp {
  event: EventObject;
  overflow: React.Dispatch<React.SetStateAction<boolean>>;
  setHiddenEventCount: React.Dispatch<React.SetStateAction<number>>;
}

const EventContext = createContext<EventObject | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useEventContext = () => {
  const event = useContext(EventContext);
  return event;
};

export function Event({ event, overflow, setHiddenEventCount }: EventProp) {
  const eventRef = useRef<HTMLButtonElement>(null);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const container = eventRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOverflowing(!entry.isIntersecting);
      },
      { root: null, rootMargin: "0px", threshold: 1 } // Adjust these options as needed
    );

    if (container) {
      observer.observe(container);
    }
    if (isOverflowing) {
      setHiddenEventCount((prev) => prev + 1);
      overflow(true);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [isOverflowing, setHiddenEventCount, overflow]);

  return (
    <>
      {!isOverflowing && (
        <button
          className={`${event.allDay && "all-day-event"} event ${event.color}`}
          key={event.id}
          ref={eventRef}
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
      )}
      {isEditEventModalOpen &&
        createPortal(
          <EventContext.Provider value={event}>
            <EventModal event={event} onChange={setIsEditEventModalOpen} />
          </EventContext.Provider>,
          document.getElementById("modalDiv")!
        )}
    </>
  );
}
