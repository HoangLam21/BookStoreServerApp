import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function OverlayEditBook({ isOpen, onClose, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <button onClick={onClose} className="close-button">X</button>
      {children}
    </Modal>
  );
}

export default OverlayEditBook;