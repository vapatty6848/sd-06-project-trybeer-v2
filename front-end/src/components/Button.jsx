import React from 'react';
import PropTypes from 'prop-types';
import ButtonMaterial from '@material-ui/core/Button';

function Button({ className, onClick, disabled, children, size }) {
  return (
    <ButtonMaterial
    variant="contained"
    color="primary"
      type="button"
      data-testid={ className }
      className={ className }
      onClick={ onClick }
      disabled={ disabled }
      size={size || "medium"}
    >
      {children}
    </ButtonMaterial>
  );
}

export default Button;

Button.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
