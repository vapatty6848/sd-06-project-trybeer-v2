import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secundary};
  `}
`;

const ContainerCard = styled.div`
  ${({ theme }) => css`
    opacity: '0.2';
    width: 100%;
    height: 100%;
    padding: 70px 0;

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
    height: 100%;
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
  ContainerCard,
  ContainerMessages,
  ChatContainer,
};
