import { format } from "date-fns";
import { EventObject } from "./Day";

interface EditEventModalProps {
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
  day: Date;
  event: EventObject;
  editEvent: (event: EventObject) => void;
  deleteEvent: (event: EventObject) => void;
}

export function EditEventModal({
  onChange,
  day,
  event,
  editEvent,
  deleteEvent,
}: EditEventModalProps) {
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
            <label htmlFor="name">{event.name}</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="form-group checkbox">
            <input type="checkbox" name="all-day" id="all-day" />
            <label htmlFor="all-day">All Day?</label>
          </div>
          <div className="row">
            <div className="form-group">
              <label htmlFor="start-time">Start Time</label>
              <input type="time" name="start-time" id="start-time" />
            </div>
            <div className="form-group">
              <label htmlFor="end-time">End Time</label>
              <input type="time" name="end-time" id="end-time" />
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
                checked
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
