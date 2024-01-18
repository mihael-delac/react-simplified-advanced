import { format } from "date-fns";
import { EventObject, EventClass } from "./Day";

interface CreateEventModalProps {
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
  day: Date;
  addEvent: (event: EventObject) => void;
}
export function CreateEventModal({
  onChange,
  day,
  addEvent,
}: CreateEventModalProps) {
  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newEvent = new EventClass({
      allDay: true,
      color: "green",
      name: "Test",
      id: crypto.randomUUID(),
    });
    addEvent(newEvent);
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
            <label htmlFor="name">Name</label>
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
