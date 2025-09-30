import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {children}
    </>,
    document.body
  );
}

export default Modal;