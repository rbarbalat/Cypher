import React from 'react';
import './modal.css';

function Modal(props) {
    const { children } = props;
  return (
    <div id='modal-wrapper'>
        {children}
    </div>
  )
}

export default Modal
