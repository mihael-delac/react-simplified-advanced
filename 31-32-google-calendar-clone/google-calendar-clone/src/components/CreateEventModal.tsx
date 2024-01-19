import { format } from "date-fns";
import { EventObject, EventClass, useDayContext } from "./Day";
import { useEffect, useRef } from "react";

interface CreateEventModalProps {
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
  addEvent: (event: EventObject) => void;
}
export function CreateEventModal({
  onChange,
  addEvent,
}: CreateEventModalProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const allDayRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const blueRadioRef = useRef<HTMLInputElement>(null);
  const redRadioRef = useRef<HTMLInputElement>(null);
  const greenRadioRef = useRef<HTMLInputElement>(null);
  const { day } = useDayContext();

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const checkedColor = blueRadioRef.current?.checked
      ? "blue"
      : redRadioRef.current?.checked
      ? "red"
      : greenRadioRef.current?.checked
      ? "green"
      : "blue";

    if (allDayRef.current?.checked) {
      const newEvent = new EventClass({
        allDay: true,
        color: checkedColor,
        name: nameRef.current!.value,
        id: crypto.randomUUID(),
      });
      addEvent(newEvent);
    } else if (startTimeRef.current?.value && endTimeRef.current?.value) {
      const newEvent = new EventClass({
        allDay: false,
        time: {
          startTime: startTimeRef.current.value,
          endTime: endTimeRef.current.value,
        },
        color: checkedColor,
        name: nameRef.current!.value,
        id: crypto.randomUUID(),
      });
      addEvent(newEvent);
    }
    onChange(false);
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onChange(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onChange]);

  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-body">
        <div className="modal-title">
          <div>Add Event</div>
          <small>{format(day, "PPP")}</small>
          <button className="close-btn" onClick={() => onChange(false)}>
            &times;
          </button>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" ref={nameRef} />
          </div>
          <div className="form-group checkbox">
            <input
              type="checkbox"
              name="all-day"
              id="all-day"
              ref={allDayRef}
            />
            <label htmlFor="all-day">All Day?</label>
          </div>
          <div className="row">
            <div className="form-group">
              <label htmlFor="start-time">Start Time</label>
              <input
                type="time"
                name="start-time"
                id="start-time"
                ref={startTimeRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="end-time">End Time</label>
              <input
                type="time"
                name="end-time"
                id="end-time"
                ref={endTimeRef}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Color</label>
            <div className="row left">
              <input
                type="radio"
                name="color"
                value="blue"
                id="blue"
                defaultChecked={true}
                className="color-radio"
                ref={blueRadioRef}
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
              />
              <label htmlFor="green">
                <span className="sr-only">Green</span>
              </label>
            </div>
          </div>
          <div className="row">
            <button
              className="btn btn-success"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
