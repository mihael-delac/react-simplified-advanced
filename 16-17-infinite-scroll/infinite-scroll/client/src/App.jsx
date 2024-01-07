/* eslint-disable no-unused-vars */
import { useFetch } from "./useFetch";

function App() {
  const {
    data,
    isLoading = true,
    isError,
  } = useFetch("http://127.0.0.1:3000/photos?_page=0&_limit=10");
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data?.map((photo) => {
          return <div key={photo.id}>{photo.title}</div>;
        })
      )}
    </>
  );
}

export default App;
