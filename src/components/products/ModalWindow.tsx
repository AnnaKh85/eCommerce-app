// import React from 'react';

// interface ModalProps {
//   closeModal: () => void;
// }

// const ModalWindow: React.FC<ModalProps> = ({ closeModal }) => {
//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close" onClick={closeModal}>
//           &times;
//         </span>
//         <p>Modal window is here</p>
//       </div>
//     </div>
//   );
// };

// export default ModalWindow;

import React from 'react';

interface ModalProps {
  imageUrl: string;
  closeModal: () => void;
}

const ModalWindow: React.FC<ModalProps> = ({ imageUrl, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <p>Modal window is here</p>
        <img src={imageUrl} alt="IMAGE WAS HERE" style={{ width: '100%' }} />
      </div>
    </div>
  );
};

export default ModalWindow;
