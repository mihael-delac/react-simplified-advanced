/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./styles.css";
import { useCallback, useEffect, useRef, useState } from "react";
import parseLinkHeader from "./parseLinkHeader";

const LIMIT = 10;

function App() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const nextPhotoUrlRef = useRef();

  async function fetchPhotos(url, controller = null) {
    setIsLoading(true);
    try {
      const res = await fetch(url, { signal: controller?.signal });
      nextPhotoUrlRef.current = parseLinkHeader(res.headers.get("Link")).next;
      const photosRes = await res.json();
      setPhotos((prevPhotos) => {
        return [...prevPhotos, ...photosRes];
      });
    } catch (error) {
      if (error.name == "AbortError") return;
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const imageRef = useCallback((image) => {
    if (image == null || nextPhotoUrlRef.current == null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPhotos(nextPhotoUrlRef.current);
          observer.unobserve(image);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(image);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchPhotos(
      `http://localhost:3000/photos?_page=1&_limit=${LIMIT}`,
      controller
    );
    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="grid">
        {photos?.map((photo) => (
          <img
            src={photo.url}
            key={photo.id}
            ref={photo.id === photos.length - 1 ? imageRef : undefined}
          />
        ))}
        {isLoading &&
          Array.from({ length: LIMIT }, (_, index) => index).map((n) => {
            return (
              <div key={n} className="skeleton">
                Loading...
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
