import styled, { css } from 'styled-components';

const CompInput = styled.label`
  ${({ theme, themeStorage, widthDivLabel }) => css`
    color: ${theme.colors.text};

    width: ${widthDivLabel};

    display: flex;
    flex-direction: column;

    font-size: 20px;
    font-weight: 450;

    @media (max-width: 500px) {
      font-size: 18px;
      width: 100%;
    }

    > div {
    display: flex;

    > div {
      padding-left: 2px;
      width: 45px;
      height: 40px;
      margin-top: 5px;
      /* background: ${themeStorage === 'light' ? '#CCCCCC' : '#353535'}; */
      background: ${theme.colors.borderInput};
      border-radius: 5px 0 0 5px;

      display: flex;
      align-items: center;
      justify-content: center;

      > img {
        width: 20px;
        height: 20px;
      }
    }
  }
  `}
`;

const Input = styled.input`
  ${({ theme, themeStorage, isIcon, width }) => css`
    background: ${theme.colors.backgroundInput};
    color: ${theme.colors.text};

    width: ${width};
    height: 40px;

    padding-left: 10px;
    font-size: 16px;

    margin: 5px 0 20px 0;

    /* border: ${themeStorage === 'light' ? '1px solid #CCCCCC' : '1px solid #353535'}; */
    border: 1px solid ${theme.colors.borderInput};
    border-radius: ${isIcon ? '0 5px 5px 0' : '5px'};

    @media (max-width: 500px) {
      width: 100%;
    }
  `}
`;

export default {
  CompInput,
  Input,
};
