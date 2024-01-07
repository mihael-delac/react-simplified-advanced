/* eslint-disable no-unused-vars */
import { useFetch } from "./useFetch";
import "./styles.css";

function App() {
  const {
    data,
    isLoading = true,
    isError,
  } = useFetch("http://127.0.0.1:3000/photos-short-list");
  return (
    <div className="grid">
      {isLoading ? (
        <div className="skeleton">Loading...</div>
      ) : (
        data?.map((photo) => {
          return <img key={photo.id} src={photo.url} />;
        })
      )}
    </div>
  );
}

export default App;
