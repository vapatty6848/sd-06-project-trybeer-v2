import styled, { css } from 'styled-components';

const Container = styled.div`
  ${() => css`
  `}
`;

const Context = styled.div`
  ${() => css`
    width: 100%;
    height: 100vh;
    display: flex;
  `}

`;
const ContainerCard = styled.div`
  ${({ theme, stateSideBarAdmin }) => css`
    opacity: ${!stateSideBarAdmin && '0.2'};
    width: 100%;
    height: 100%;
    padding-top: 70px;

    display: flex;
    flex-direction: column;
    align-items: center;

    color: ${theme.colors.text};

    @media (max-width: 1000px) {
      padding: 70px 20px 0 20px;
    }

    @media (max-width: 600px) {
      padding: 60px 10px 0 10px;
    }

    form {
      width: 100%;
      display: flex;
      flex-flow: column wrap;
      align-items: center;

      label {
        width: 90%;

        input {
          width: 100%;
        }
      }

      button {
        width: 90%;
      }
    }
  `}
`;

const ChatContainer = styled.div`
  ${({ theme }) => css`
    width: 60%;
    height: 95%;
    margin-left: 70px;

    background: ${theme.colors.primary};
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 10px ${theme.colors.shadowCards};
  `}
`;

const ContainerMessages = styled.div`
  ${() => css`
    width: 85%;
    text-align: center;
    margin: 25px auto;
  `}
`;

export default {
  Container,
  Context,
  ContainerCard,
  ChatContainer,
  ContainerMessages,
};
