import PropTypes from 'prop-types';
import { useCallback } from 'react';
import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smImage, tags, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(smImage, tags);
  }, [onClick, smImage, tags]);

  return (
    <li className={style.ImageGalleryItem}>
      <img
        className={style.ImageGalleryItem_image}
        src={smImage}
        alt={tags}
        onClick={handleClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
  smImage: PropTypes.string.isRequired,
};

export default ImageGalleryItem;

