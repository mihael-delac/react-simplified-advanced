import {
  format,
  getDate,
  isBefore,
  isSameMonth,
  isSameWeek,
  isToday,
  startOfMonth,
} from "date-fns";
import { useDateContext } from "../App";
import { Events } from "./Events";
import { CreateEventModal } from "./CreateEventModal";
import { createContext, useContext, useReducer, useState } from "react";
import { createPortal } from "react-dom";
import { DayEventsModal } from "./DayEventsModal";

export interface DayObjectType {
  day: Date;
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
  const [events, dispatch] = useReducer(reducer, []);
  const { date } = useDateContext();
  const isNonMonthDay = !isSameMonth(day, date);
  const isTodaysDate = isToday(day);
  const isBeforeToday = isTodaysDate ? false : isBefore(day, new Date()); //for some reason it returns 'false' for today's date

  function addEvent(event: EventObject): void {
    dispatch({ type: ACTIONS.ADD, event: event });
  }
  function deleteEvent(event: EventObject): void {
    dispatch({ type: ACTIONS.DELETE, id: event.id });
  }
  function editEvent(event: EventObject): void {
    dispatch({ type: ACTIONS.EDIT, event: event });
  }
  return (
    <div
      className={`day ${isNonMonthDay && "non-month-day"}  ${
        isBeforeToday && "old-month-day"
      }`}
      key={day.toDateString()}
    >
      <div className="day-header">
        {isSameWeek(startOfMonth(date), day) && (
          <div className="week-name">{format(day, "iii")}</div>
        )}
        <div className={`day-number ${isTodaysDate && "today"}`}>
          {getDate(day)}
        </div>
        <button
          className="add-event-btn"
          onClick={() => setIsCreateEventModalOpen(true)}
        >
          +
        </button>
      </div>
      <DayContext.Provider value={{ day, editEvent, deleteEvent }}>
        {events.length > 0 && <Events events={events} />}
        {isCreateEventModalOpen &&
          createPortal(
            <CreateEventModal
              onChange={setIsCreateEventModalOpen}
              addEvent={addEvent}
            />,
            document.body
          )}
        {isDayEventsModalOpen &&
          createPortal(
            <DayEventsModal
              onChange={setIsDayEventsModalOpen}
              events={events}
            />,
            document.body
          )}
      </DayContext.Provider>
    </div>
  );
}
