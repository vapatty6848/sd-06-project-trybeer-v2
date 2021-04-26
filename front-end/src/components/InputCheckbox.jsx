import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

function InputCheckbox({ name, value, setValue, checked, label, type = 'text' }) {
  return (
    <label htmlFor={ name } className={ `${name}-label` }>
      {label}
      <Checkbox
        variant="outlined"
        color="primary"
        label={`${label}`}
        type={ type }
        name={ name }
        className={ `signup-${name}` }
        data-testid={ `signup-${name}` }
        value={ type !== 'checkbox' ? value : '' }
        checked={ type === 'checkbox' ? checked : false }
        onChange={ (e) => (type !== 'checkbox'
          ? setValue(e.target.value) : setValue(e.target.checked)) }
      />
    </label>
  );
}

export default InputCheckbox;

InputCheckbox.defaultProps = {
  type: '',
  value: '',
  checked: false,

};

InputCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  checked: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string,
};
