import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    width: 100%;
    height: 100vh;

    padding-bottom: 70px;
    
  `}
`;

const ContainerMain = styled.div`
  ${({ stateSideBar }) => css`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    opacity: ${stateSideBar ? '0.3' : '1'};
  `}
`;

const ContainerProducts = styled.div`
  ${({ theme }) => css`
    width: 60%;
    display: flex;
    flex-direction: column;
    padding: 70px 20px 20px 20px;

    @media (max-width: 1000px) {
    width: 70%;
    }
    
    @media (max-width: 750px) {
      width: 90%;
    }

    @media (max-width: 600px) {
      width: 100%;
    }

    > h1 {
      font-size: 20px;
      color: ${theme.colors.text};
      margin-bottom: 20px;
    }

    > span {
      text-align: right;
    }
  `}
`;

const ContainerEmptyCart = styled.div`
  ${({ theme }) => css`
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    color: ${theme.colors.text};

    display: flex;
    justify-content: center;
  `}
`;

const Total = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    margin-top: 15px;
    text-align: right;
  `}
`;

const ContainerInfos = styled.div`
  ${({ theme }) => css`
    height: 30px;
    font-size: 14px;
    margin-bottom: 10px;

    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: ${theme.colors.backgroundInput};
    color: ${theme.colors.text};
    border: 1px solid ${theme.colors.borderInput};

    @media (max-width: 500px) {
      font-size: 12px; 
    }

    > div {
      height: 100%;
      width: 30px;
      background: ${theme.colors.backgroundDiv};

      display: flex;
      align-items: center;
      justify-content: center;
    }
    > p {
      font-size: 10px;
    }
  `}
`;

const ButtonForm = styled.button`
  ${({ theme }) => css`
    height: 100%;
    width: 30px;

    border: none;
    border-radius: 0 5px 5px 0;
    background: ${theme.colors.backgroundDiv};
    color: ${theme.colors.text};

    cursor: pointer;

    transition: filter 0.3s;

    &:hover {
      filter: brightness(0.9);
    }
    
  `}
`;

const NameProduct = styled.div`
`;

const ContainerAddress = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-flow: column wrap;
    align-items: center;

    color: ${theme.colors.text};

    > h1 {
      text-align: left;
      font-size: 20px;
      margin-top: 30px;
    }
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

const CompletedSale = styled.span`
  ${({ theme }) => css`
    width: 100%;
    height: 100vh;

    font-size: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${theme.colors.text};
  `}
`;

export default {
  Container,
  ContainerProducts,
  ContainerAddress,
  ContainerButton,
  ContainerInfos,
  ContainerEmptyCart,
  Total,
  CompletedSale,
  ButtonForm,
  NameProduct,
  ContainerMain,
};
