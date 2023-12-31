/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/* eslint-disable react/prop-types */
export function DialogModal({ isOpen, onClose, children }) {
  const dialogRef = useRef(null);

  const handleOutsideClick = (e, element) => {
    const dialogDimensions = element.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      element.close();
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog == null) return;

    isOpen ? dialog.showModal() : dialog.close();
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog == null) return;

    dialog.addEventListener("close", onClose);
    dialog.addEventListener("click", (e) => handleOutsideClick(e, dialog));

    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return createPortal(
    <dialog ref={dialogRef}>{children}</dialog>,
    document.querySelector("#modal-container")
  );
}
