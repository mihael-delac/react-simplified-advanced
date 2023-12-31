/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { createPortal } from "react-dom";

/* eslint-disable react/prop-types */
export function CustomModal({ isOpen, onClose, children }) {
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return createPortal(
    <div className={`modal-overlay ${isOpen ? "show" : ""}`}>
      <div className="modal">{children}</div>
    </div>,
    document.querySelector("#modal-container")
  );
}
