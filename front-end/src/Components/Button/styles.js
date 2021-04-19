import styled, { css } from 'styled-components';

const CompButton = styled.button`
  ${({
    theme,
    width,
    heigth,
    color,
    fontSize,
    position,
    botton,
    stateSideBar,
    marginBottom,
    opacity,
  }) => css`
    width: ${width || '100%'};
    height: ${heigth};

    z-index: 0;

    opacity: ${stateSideBar && '0.2'};
    opacity: ${opacity};

    position: ${position};
    bottom: ${botton};

    font-size: ${fontSize};
    font-weight: 600;

    margin-bottom: ${marginBottom};

    background: ${theme.colors[color]};

    border: none;
    border-radius: 5px;

    box-shadow: 0 0 2px 0;

    cursor: pointer; 

    transition: filter 0.3s;

    &:hover {
      filter: brightness(0.9);
    }

    @media (max-width: 500px) {
      width: ${width || '100%'};
    }
  `}
`;

export default CompButton;
