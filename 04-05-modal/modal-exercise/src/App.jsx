import { useState } from "react";
import { CustomModal } from "./components/CustomModal";
import { DialogModal } from "./components/DialogModal";

function App() {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isDialogModalOpen, setIsDialogModalOpen] = useState(false);
  const openCustomModal = () => setIsCustomModalOpen(true);
  const closeCustomModal = () => setIsCustomModalOpen(false);
  const openDialogModal = () => setIsDialogModalOpen(true);
  const closeDialogModal = () => setIsDialogModalOpen(false);

  return (
    <>
      <button onClick={openCustomModal}>Show Custom Modal</button>
      <br />
      <button onClick={openDialogModal}>Show Dialog Modal</button>

      <CustomModal isOpen={isCustomModalOpen} onClose={closeCustomModal}>
        <h1>Modal Content</h1>
        <button onClick={closeCustomModal}>Close</button>
      </CustomModal>

      <DialogModal isOpen={isDialogModalOpen} onClose={closeDialogModal}>
        <h1>Dialog Content</h1>
        <button onClick={closeDialogModal}>Close</button>
      </DialogModal>
    </>
  );
}

export default App;
