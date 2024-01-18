/* eslint-disable react-refresh/only-export-components */
import { SetStateAction, createContext, useContext, useState } from "react";
import { Calendar } from "./components/Calendar";

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

  return (
    <>
      <DateContext.Provider value={{ date, onChange: setDate }}>
        <Calendar />;
      </DateContext.Provider>
    </>
  );
}

export default App;
