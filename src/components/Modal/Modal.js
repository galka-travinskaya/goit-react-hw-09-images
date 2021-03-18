import React, { useEffect } from 'react';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onToggleModal }) {
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onToggleModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onToggleModal]);

  const onCloseOverlay = e => {
    if (e.target === e.currentTarget) {
      onToggleModal();
    }
  };

  // const handleKeyDown = e => {
  //   if (e.code === 'Escape') {
  //     onToggleModal();
  //   }
  // };

  return createPortal(
    <div className={s.Overlay} onClick={onCloseOverlay}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
}
