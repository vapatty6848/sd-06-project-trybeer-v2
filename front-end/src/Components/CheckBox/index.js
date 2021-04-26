import React from 'react';
import PropTypes from 'prop-types';

import CompCheckBox from './styles';

const CheckBox = ({
  id,
  type,
  width,
  height,
  checked,
  onChange,
  dataTestid,
}) => (
  <CompCheckBox
    id={ id }
    checked={ checked }
    type={ type }
    width={ width }
    height={ height }
    onChange={ (e) => onChange(e) }
    data-testid={ dataTestid }
  />
);

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  dataTestid: PropTypes.string.isRequired,
};

export default CheckBox;
