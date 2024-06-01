import React from 'react';

interface ModalProps {
  closeModal: () => void;
}

const ModalWindow: React.FC<ModalProps> = ({ closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <p>Modal window is here</p>
      </div>
    </div>
  );
};

export default ModalWindow;
