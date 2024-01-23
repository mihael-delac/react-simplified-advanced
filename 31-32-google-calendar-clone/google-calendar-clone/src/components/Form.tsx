import { useCallback, useEffect, useRef, useState } from "react";
import { EventClass, useDayContext } from "./Day";
import { useEventContext } from "./Event";
import { FormGroup } from "./FormGroup";

interface FormProps {
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Form({ onChange }: FormProps) {
  const { addEvent, editEvent, deleteEvent } = useDayContext();
  const event = useEventContext() || null;
  const [allDay, setAllDay] = useState(event?.allDay || false);
  const nameRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const blueRadioRef = useRef<HTMLInputElement>(null);
  const redRadioRef = useRef<HTMLInputElement>(null);
  const greenRadioRef = useRef<HTMLInputElement>(null);

  const checkedColor = useCallback(() => {
    if (blueRadioRef.current?.checked) return "blue";
    if (redRadioRef.current?.checked) return "red";
    if (greenRadioRef.current?.checked) return "green";
    return "blue";
  }, []);

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (allDay) {
      const newEvent = new EventClass({
        allDay: true,
        color: checkedColor(),
        name: nameRef.current!.value,
        id: event?.id || crypto.randomUUID(),
      });
      event ? editEvent(newEvent) : addEvent(newEvent);
    } else if (startTimeRef.current?.value && endTimeRef.current?.value) {
      const newEvent = new EventClass({
        allDay: false,
        time: {
          startTime: startTimeRef.current.value,
          endTime: endTimeRef.current.value,
        },
        color: checkedColor(),
        name: nameRef.current!.value,
        id: event?.id || crypto.randomUUID(),
      });
      event ? editEvent(newEvent) : addEvent(newEvent);
    }
    onChange(false);
  }

  function handleDeleteSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    deleteEvent(event!);
    onChange(false);
  }
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onChange(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onChange]);
  return (
    <form>
      <FormGroup>
        <>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            ref={nameRef}
            defaultValue={event?.name || ""}
          />
        </>
      </FormGroup>
      <FormGroup>
        <div className="checkbox">
          <input
            type="checkbox"
            name="all-day"
            id="all-day"
            checked={allDay}
            onChange={(e) => setAllDay(e.target.checked)}
          />
          <label htmlFor="all-day">All Day?</label>
        </div>
      </FormGroup>
      <div className="row">
        <FormGroup>
          <>
            <label htmlFor="start-time">Start Time</label>
            <input
              type="time"
              name="start-time"
              id="start-time"
              ref={startTimeRef}
              defaultValue={event?.time?.startTime || ""}
              disabled={allDay}
            />
          </>
        </FormGroup>
        <FormGroup>
          <>
            <label htmlFor="end-time">End Time</label>
            <input
              type="time"
              name="end-time"
              id="end-time"
              ref={endTimeRef}
              defaultValue={event?.time?.endTime || ""}
              disabled={allDay}
            />
          </>
        </FormGroup>
      </div>
      <FormGroup>
        <>
          <label>Color</label>
          <div className="row left">
            <input
              type="radio"
              name="color"
              value="blue"
              id="blue"
              className="color-radio"
              ref={blueRadioRef}
              defaultChecked={
                !event ? true : event?.color === "blue" ? true : false
              }
            />
            <label htmlFor="blue">
              <span className="sr-only">Blue</span>
            </label>
            <input
              type="radio"
              name="color"
              value="red"
              id="red"
              className="color-radio"
              ref={redRadioRef}
              defaultChecked={event?.color === "red" ? true : false}
            />
            <label htmlFor="red">
              <span className="sr-only">Red</span>
            </label>
            <input
              type="radio"
              name="color"
              value="green"
              id="green"
              className="color-radio"
              ref={greenRadioRef}
              defaultChecked={event?.color === "green" ? true : false}
            />
            <label htmlFor="green">
              <span className="sr-only">Green</span>
            </label>
          </div>
        </>
      </FormGroup>
      <div className="row">
        <button
          className="btn btn-success"
          type="submit"
          onClick={handleSubmit}
        >
          {event ? "Confirm Edit" : "Add"}
        </button>

        {event && (
          <button
            className="btn btn-delete"
            type="button"
            onClick={handleDeleteSubmit}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
