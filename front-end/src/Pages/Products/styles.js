import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;

    background: ${theme.colors.secondary};
  `}
`;

const ContainerProducts = styled.div`
  ${({ theme }) => css`
    width: 100%;
    background: ${theme.colors.secondary};

    display: flex;
    flex-wrap: wrap;
    justify-content: center;


    @media (max-width: 1350px) {
      height: 100%;
    }
  `}
`;

const ContainerCards = styled.section`
  ${({ stateSideBar }) => css`

    opacity: ${stateSideBar && '0.2'};

    /* overflow: auto; */

    width: 70%;
    height: 100%;

    padding: 70px 10px 65px 10px;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @media (max-width: 1300px) {
      width: 80%;
    }

    @media (max-width: 870px) {
      width: 90%;
    }

    @media (max-width: 770px) {
      width: 100%;
    }

    @media (max-width: 500px) {
      padding: 60px 10px 50px 10px;
      justify-content: space-between;
    }
  `} 
`;

const ContainerButton = styled.div`
  ${({ stateSideBar }) => css`
    width: 100%;
    padding: 0 19px;

    opacity: ${stateSideBar ? '0.3' : '1'};

    display: flex;
    justify-content: center;

    > button {
      width: 862px;;
      margin-bottom: 20px;


      @media (max-width: 1135px) {
        width: 641px;
      }

      @media (max-width: 700px) {
        padding: 0 15px;
        margin-bottom: 20px;

        width: 95%;
      }

      @media (max-width: 690px) {
        margin-bottom: 10px;
      }
    }
  `}
`;

export default {
  Container,
  ContainerButton,
  ContainerCards,
  ContainerProducts,
};
