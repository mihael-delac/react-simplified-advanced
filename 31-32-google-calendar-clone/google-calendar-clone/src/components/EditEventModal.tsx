import { format } from "date-fns";
import { EventObject, useDayContext } from "./Day";
import { useEffect, useState } from "react";

interface EditEventModalProps {
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
  event: EventObject;
}

export function EditEventModal({ onChange, event }: EditEventModalProps) {
  const { day, editEvent, deleteEvent } = useDayContext();
  const [allDay, setAllDay] = useState(event.allDay);
  function handleEditSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    editEvent(event);
    onChange(false);
  }
  function handleDeleteSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    deleteEvent(event);
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
          <div>Edit Event</div>
          <small>{format(day, "PPP")}</small>
          <button className="close-btn" onClick={() => onChange(false)}>
            &times;
          </button>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={event.name}
            />
          </div>
          <div className="form-group checkbox">
            <input
              type="checkbox"
              name="all-day"
              id="all-day"
              defaultChecked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
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
                defaultValue={event.time?.startTime}
                disabled={allDay}
              />
            </div>
            <div className="form-group">
              <label htmlFor="end-time">End Time</label>
              <input
                type="time"
                name="end-time"
                id="end-time"
                defaultValue={event.time?.endTime}
                disabled={allDay}
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
                defaultChecked={event.color == "blue" ? true : false}
                className="color-radio"
              />
              <label htmlFor="blue">
                <span className="sr-only">Blue</span>
              </label>
              <input
                type="radio"
                name="color"
                value="red"
                id="red"
                defaultChecked={event.color == "red" ? true : false}
                className="color-radio"
              />
              <label htmlFor="red">
                <span className="sr-only">Red</span>
              </label>
              <input
                type="radio"
                name="color"
                value="green"
                id="green"
                defaultChecked={event.color == "green" ? true : false}
                className="color-radio"
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
              onClick={handleEditSubmit}
            >
              Confirm Edit
            </button>
            <button
              className="btn btn-delete"
              type="button"
              onClick={handleDeleteSubmit}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
