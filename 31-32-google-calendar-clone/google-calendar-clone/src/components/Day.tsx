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
import { useReducer, useState } from "react";
import { createPortal } from "react-dom";
import { DayEventsModal } from "./DayEventsModal";

interface DayProps {
  day: Date;
}
export interface EventObject {
  allDay?: boolean;
  time?: string;
  color: string;
  name: string;
  id: string;
}

export class EventClass implements EventObject {
  allDay?: boolean;
  time?: string;
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
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] =
    useState<boolean>(false);
  const [isDayEventsModalOpen, setIsDayEventsModalOpen] =
    useState<boolean>(false);
  const [events, dispatch] = useReducer(reducer, []);
  const { date } = useDateContext();
  const isNonMonthDay = !isSameMonth(day, date);
  const isTodaysDate = isToday(day);
  const isBeforeToday = isTodaysDate ? false : isBefore(day, new Date()); //for some reason it returns 'false' for today's date

  function addEvent(event: EventObject): void {
    dispatch({ type: ACTIONS.ADD, event: event });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function deleteEvent(event: EventObject) {
    dispatch({ type: ACTIONS.DELETE, id: event.id });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function editEvent(event: EventObject) {
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
      {events.length > 0 && (
        <Events onChange={setIsDayEventsModalOpen} events={events} />
      )}
      {isCreateEventModalOpen &&
        createPortal(
          <CreateEventModal
            onChange={setIsCreateEventModalOpen}
            day={day}
            addEvent={addEvent}
          />,
          document.body
        )}
      {isDayEventsModalOpen &&
        createPortal(
          <DayEventsModal
            onChange={setIsDayEventsModalOpen}
            day={day}
            events={events}
          />,
          document.body
        )}
    </div>
  );
}
