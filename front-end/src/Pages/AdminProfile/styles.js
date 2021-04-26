import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ theme, stateSideBar }) => css`
    opacity: ${!stateSideBar && '0.2'};
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

const ContextProfile = styled.div`
  ${({ theme, stateSideBar }) => css`
    width: 450px;
    opacity: ${stateSideBar && '0.2'};
    background: ${theme.colors.primary};
    padding: 30px 30px 20px 30px;
    border-radius: 5px;
    box-shadow: 0 0 5px black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > h2 {
      color: ${theme.colors.text};
      margin-bottom: 20px;

      @media (max-width: 500px) {
      }
    }

    > p {
      color: ${theme.colors.text};
    }

    @media (max-width: 500px) {
      border: none;
      border-radius: 0;
      box-shadow: none;
      width: 100%;

      input {
        width: 100%;
      }
    }
  `}
`;

const Context = styled.div`
  ${() => css`
    display: flex;
  `}
`;

const ContextName = styled.div`
  ${({ theme }) => css`
    background:  ${theme.colors.backgroundInput};
    border: 1px solid ${theme.colors.borderInput};
    width: 100%;

    margin-bottom: 20px;

    display: flex;
    align-items: center;

    border-radius: 5px;

    > div {
      background: ${theme.colors.borderInput};
      color: ${theme.colors.text};

      width: 35px;
      height: 35px;

      border-radius: 5px 0 0 5px;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    > span {
      padding-left: 10px;
      border-radius: 0 5px 5px 0;
      color: ${theme.colors.text};
    }
  `}
`;

const ContextEmail = styled.div`
  ${({ theme }) => css`
    background:  ${theme.colors.backgroundInput};
    border: 1px solid ${theme.colors.borderInput};
    width: 100%;

    margin-bottom: 10px;

    display: flex;
    align-items: center;

    border-radius: 5px;

    > div {
      background: ${theme.colors.borderInput};
      color: ${theme.colors.text};

      width: 35px;
      height: 35px;

      border-radius: 5px 0 0 5px;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    > span {
      padding-left: 10px;
      border-radius: 0 5px 5px 0;
      color: ${theme.colors.text};
    }
  `}
`;

export default {
  Container,
  Context,
  ContextProfile,
  ContextName,
  ContextEmail,
};
