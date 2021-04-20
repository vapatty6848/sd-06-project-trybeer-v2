import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { dataTestid, handleClick, btnDisable, title, className } = props;
  return (
    <div>
      <button
        className={ className }
        type="button"
        data-testid={ dataTestid }
        disabled={ btnDisable }
        onClick={ handleClick }
      >
        { title }
      </button>
    </div>
  );
}

Button.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  btnDisable: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Button;
