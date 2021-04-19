import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    width: 100%;
    height: 100vh;
    
  `}
`;

const Content = styled.div`
  ${() => css`
    width: 100%;
    height: 100vh;
    padding: 70px 0 0 0;

    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`;

const ContainerProducts = styled.div`
  ${() => css`
    width: 60%;
    padding: 0 20px; 
    background: red;

    display: flex;
    align-items: center;
    justify-content: space-between;

    > img {
      height: 80px;
    }
  `}
`;

const ContainerForm = styled.div`
  ${() => css`
    width: 60%;
    padding: 0 20px; 
    background: blue;

  `}
`;

const ContainerButton = styled.div`
  ${({ stateSideBar }) => css`
    width: 100%;
    padding: 0 19px;
    display: flex;
    justify-content: center;

    opacity: ${stateSideBar ? '0.3' : '1'};

    @media (max-width: 500px) {
      padding: 0 19px;
    }

    > button {
      width: 57%;

      @media (max-width: 1000px) {
      width: 65%;
      }
      
      @media (max-width: 700px) {
        width: 75%;
      }

      @media (max-width: 500px) {
        width: 91%;
      }
    }
  `}
`;

export default {
  Container,
  ContainerProducts,
  ContainerForm,
  Content,
  ContainerButton,
};
