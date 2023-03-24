import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

const Modal = ({ closeModal, lgImage, tags }) => {
const handleKeyDown = useCallback(element => {
if (element.code === 'Escape') {
closeModal();
}
}, [closeModal]);

const handleBackdropClick = useCallback(event => {
if (event.currentTarget === event.target) {
closeModal();
}
}, [closeModal]);

useEffect(() => {
window.addEventListener('keydown', handleKeyDown);
return () => {
  window.removeEventListener('keydown', handleKeyDown);
};

}, [handleKeyDown]);

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





