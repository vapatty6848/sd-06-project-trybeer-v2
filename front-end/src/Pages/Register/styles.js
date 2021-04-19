import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondary};
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 500px) {
      background: ${theme.colors.primary};
    }
  `}
`;

const Form = styled.form`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    padding: 20px 30px 10px 30px;
    border-radius: 5px;
    box-shadow: 0 0 5px black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > h1 {
      margin-bottom: 20px;
      color: ${theme.colors.text};

      @media (max-width: 500px) {
        font-size: 26px;
      }
    }

    > p {
      color: ${theme.colors.text};
      border: 1px solid red;
      border-radius: 5px;
      padding: 10px 20px;
    }
    
    @media (max-width: 500px) {
      border: none;
      padding-bottom: 0;
      border-radius: 0;
      box-shadow: none;
      background: ${theme.colors.secondaryMobile};
      width: 100%;
    }
  `}
`;

const Label = styled.label`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 500;

    @media (max-width: 500px) {
      font-size: 16px;
    }

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 20px;
      width: 20px;
      background-color: #eee;
      border: 1px solid ${theme.colors.borderInput};
      border-radius: 2px;

      @media (max-width: 500px) {
        width: 17px;
        height: 17px;
      }
    }
  `}

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  input:checked ~ .checkmark {
    background-color: #fff;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
    left: 5px;
    top: 1px;
    width: 5px;
    height: 10px;
    border: solid #397330;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);

    @media (max-width: 500px) {
      left: 4px;
      top: 1px;
      width: 4px;
      height: 8px;
    }
  }
  
`;

export default {
  Container,
  Form,
  Label,
};
