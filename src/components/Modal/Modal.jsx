import { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

const Modal = ({ closeModal, lgImage, tags }) => {

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    const handleKeyDownWrapper = (event) => handleKeyDown(event);

    window.addEventListener('keydown', handleKeyDownWrapper);

    return () => {
      window.removeEventListener('keydown', handleKeyDownWrapper);
    };
  }, [closeModal]);

  return (
    <div className={style.Overlay} onClick={handleBackdropClick}>
      <div className={style.Modal}>
        <img src={lgImage} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  lgImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Modal;
