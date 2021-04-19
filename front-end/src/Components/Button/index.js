import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../Contexts/GlobalContext';

import CompButton from './styles';

const Button = ({
  children,
  type,
  width,
  heigth,
  color,
  disabled,
  onClick,
  fontSize,
  dataTestid,
  position,
  botton,
  marginBottom,
  opacity,
}) => {
  const { stateSideBar } = useContext(GlobalContext);

  return (
    <CompButton
      type={ type }
      color={ color }
      width={ width }
      heigth={ heigth }
      fontSize={ fontSize }
      disabled={ disabled }
      onClick={ onClick }
      data-testid={ dataTestid }
      position={ position }
      opacity={ opacity }
      botton={ botton }
      marginBottom={ marginBottom }
      stateSideBar={ stateSideBar }
    >
      {children}
    </CompButton>
  );
};

Button.defaultProps = {
  color: '',
  onClick: () => {},
  disabled: false,
  position: '',
  botton: '',
  width: '',
  marginBottom: '20px',
  opacity: '',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  width: PropTypes.string,
  heigth: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  fontSize: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
  position: PropTypes.string,
  botton: PropTypes.string,
  marginBottom: PropTypes.string,
  opacity: PropTypes.string,
};

export default Button;
