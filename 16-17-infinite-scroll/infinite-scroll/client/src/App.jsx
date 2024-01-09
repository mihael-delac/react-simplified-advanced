/* eslint-disable no-unused-vars */
import { useFetch } from "./useFetch";
import "./styles.css";
import { useEffect, useState } from "react";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState(undefined);
  const {
    newData = undefined,
    isLoading = true,
    isError,
  } = useFetch(
    `http://127.0.0.1:3000/photos-short-list?_page=${pageNumber}&_limit=1`
  );
  useEffect(() => {
    if (data) {
      console.log("test", newData);
      setData([...data, ...newData]);
    } else if (newData) {
      setData(newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData]);
  console.log("data", data);

  return (
    <>
      <div className="grid">
        {isLoading ? (
          <div className="skeleton">Loading...</div>
        ) : (
          data?.map((photo) => {
            return <img key={photo.id} src={photo.url} />;
          })
        )}
      </div>
      <button
        style={{ position: "fixed", bottom: "50px" }}
        onClick={() => setPageNumber(pageNumber + 1)}
      >
        Click
      </button>
    </>
  );
}

export default App;
