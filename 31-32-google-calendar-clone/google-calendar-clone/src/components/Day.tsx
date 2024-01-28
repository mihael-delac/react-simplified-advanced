import { isBefore, isSameMonth, isToday } from "date-fns";
import { useDateContext } from "../App";
import { Events } from "./Events";
import { EventModal } from "./EventModal";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { DayEventsModal } from "./DayEventsModal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { DayHeader } from "./DayHeader";

export interface DayObjectType {
  day: Date;
  addEvent: (event: EventObject) => void;
  editEvent: (event: EventObject) => void;
  deleteEvent: (event: EventObject) => void;
}

const DayContext = createContext<DayObjectType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useDayContext = () => {
  const day = useContext(DayContext);
  if (!day) {
    throw new Error("useGetDateComplex must be used within a Provider");
  }
  return day;
};
interface DayProps {
  day: Date;
}
export interface EventObject {
  allDay?: boolean;
  time?: {
    startTime: string;
    endTime: string;
  };
  color: string;
  name: string;
  id: string;
}

export class EventClass implements EventObject {
  allDay?: boolean;
  time?: {
    startTime: string;
    endTime: string;
  };
  color: string;
  name: string;
  id: string;

  constructor(event: EventObject) {
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

const ACTIONS = {
  ADD: "add",
  DELETE: "delete",
  EDIT: "edit",
};

type Action =
  | { type: string; event: EventObject }
  | { type: string; id: string };

function reducer(state: EventObject[], action: Action) {
  switch (action.type) {
    case ACTIONS.ADD:
      if ("event" in action) {
        return [...state, action.event];
      }
      break;
    case ACTIONS.DELETE:
      if ("id" in action) {
        return state.filter((event) => event.id !== action.id);
      }
      break;
    case ACTIONS.EDIT:
      if ("event" in action) {
        return state.map((event) => {
          if (event.id === action.event.id) {
            return action.event;
          }
          return event;
        });
      }
      break;
    default:
      return state;
  }
  return state;
}

export function Day({ day }: DayProps) {
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isDayEventsModalOpen, setIsDayEventsModalOpen] = useState(false);
  const [initialEvents, setInitialEvents] = useLocalStorage({
    key: day.toDateString(),
    initialValue: [],
  });
  const [events, dispatch] = useReducer(reducer, initialEvents);
  const { date } = useDateContext();
  const isNonMonthDay = !isSameMonth(day, date);
  const isBeforeToday = isToday(day) ? false : isBefore(day, new Date()); //for some reason it returns 'false' for today's date
  function addEvent(event: EventObject): void {
    dispatch({ type: ACTIONS.ADD, event: event });
  }
  function deleteEvent(event: EventObject): void {
    dispatch({ type: ACTIONS.DELETE, id: event.id });
  }
  function editEvent(event: EventObject): void {
    dispatch({ type: ACTIONS.EDIT, event: event });
  }

  useEffect(() => {
    setInitialEvents(events);
  }, [events, setInitialEvents]);
  return (
    <div
      className={`day ${isNonMonthDay ? "non-month-day" : ""}  ${
        isBeforeToday ? "old-month-day" : ""
      }`}
      key={day.toDateString()}
    >
      <DayContext.Provider value={{ day, addEvent, editEvent, deleteEvent }}>
        <DayHeader onChange={setIsCreateEventModalOpen} />

        {events.length > 0 && (
          <Events events={events} onChange={setIsDayEventsModalOpen} />
        )}
        {isCreateEventModalOpen &&
          createPortal(
            <EventModal onChange={setIsCreateEventModalOpen} />,
            document.getElementById("modalDiv")!
          )}
        {isDayEventsModalOpen &&
          createPortal(
            <DayEventsModal
              onChange={setIsDayEventsModalOpen}
              events={events}
            />,
            document.getElementById("modalDiv")!
          )}
      </DayContext.Provider>
    </div>
  );
}
