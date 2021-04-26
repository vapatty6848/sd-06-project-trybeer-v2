import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function InputRegister({ name, value, setValue, checked, label, type = 'text' }) {
  return (
    <div htmlFor={ name } className={ `${name}-label` }>
      <TextField
        variant="outlined"
        label={ `${label}` }
        type={ type }
        name={ name }
        className={ `signup-${name}` }
        data-testid={ `signup-${name}` }
        value={ type !== 'checkbox' ? value : '' }
        checked={ type === 'checkbox' ? checked : false }
        onChange={ (e) => (type !== 'checkbox'
          ? setValue(e.target.value) : setValue(e.target.checked)) }
      />
    </div>
  );
}

export default InputRegister;

InputRegister.defaultProps = {
  type: '',
  value: '',
  checked: false,

};

InputRegister.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  checked: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string,
};
