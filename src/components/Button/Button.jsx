import PropTypes from 'prop-types';
import { useCallback } from 'react';
import style from './Button.module.css';

const Button = ({ loadMore }) => {
  const handleClick = useCallback(() => {
    loadMore();
  }, [loadMore]);

  return (
    <button type="button" onClick={handleClick} className={style.Button}>
      Load more
    </button>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;

