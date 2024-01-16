/* eslint-disable react-refresh/only-export-components */
import { SetStateAction, createContext, useContext, useState } from "react";
import { Calendar } from "./components/Calendar";
import { CreateEventModal } from "./components/CreateEventModal";

type DataObjectType = {
  date: Date;
  onChange: React.Dispatch<SetStateAction<Date>>;
};

const DateContext = createContext<DataObjectType | null>(null);

export const useDateContext = () => {
  const date = useContext(DateContext);
  if (!date) {
    throw new Error("useGetDateComplex must be used within a Provider");
  }
  return date;
};

function App() {
  const [date, setDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Open</button>
      <DateContext.Provider value={{ date, onChange: setDate }}>
        <Calendar />;
      </DateContext.Provider>
      {isModalOpen && <CreateEventModal />}
    </>
  );
}

export default App;
