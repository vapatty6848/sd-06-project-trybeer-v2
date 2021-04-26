import React from 'react';
import PropTypes from 'prop-types';

import S from './styles';

const Input = ({
  readOnly,
  onChange,
  dataTestid,
  label,
  id,
  value,
  width,
  themeStorage,
  widthDivLabel,
  icon: Icon,
}) => {
  let trueOrFalse = false;

  if (Icon) {
    trueOrFalse = true;
  }

  return (
    <S.CompInput
      htmlFor={ id }
      themeStorage={ themeStorage }
      widthDivLabel={ widthDivLabel }
    >
      {label}

      {Icon ? (
        <div>
          <div>
            { Icon && <Icon size={ 20 } /> }
          </div>

          <S.Input
            id={ id }
            isIcon={ trueOrFalse }
            value={ value }
            data-testid={ dataTestid }
            onChange={ (e) => onChange(e) }
            readOnly={ readOnly }
            themeStorage={ themeStorage }
            width={ width }
          />
        </div>
      ) : (
        <S.Input
          id={ id }
          isIcon={ trueOrFalse }
          value={ value }
          data-testid={ dataTestid }
          onChange={ (e) => onChange(e) }
          readOnly={ readOnly }
          themeStorage={ themeStorage }
          width={ width }
        />
      )}
    </S.CompInput>
  );
};

Input.defaultProps = {
  readOnly: false,
  themeStorage: '',
  value: undefined,
  onChange: () => {},
  icon: undefined,
  widthDivLabel: '100%',
  width: '400px',
};

Input.propTypes = {
  onChange: PropTypes.func,
  dataTestid: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  themeStorage: PropTypes.string,
  icon: PropTypes.elementType,
  widthDivLabel: PropTypes.string,
  width: PropTypes.string,
};

export default Input;
