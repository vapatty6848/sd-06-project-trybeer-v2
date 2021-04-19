import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondary};
    width: 100%;
    height: 100vh;
  `}
`;

const ContainerOrders = styled.div`
  ${({ theme, stateSideBar }) => css`
    opacity: ${stateSideBar ? '0.3' : '1'};

    width: 100%;
    min-height: 100%;
    padding: 70px 20px 20px 20px;
    background: ${theme.colors.secondary};

    display: flex;
    flex-direction: column;
    align-items: center;

    /* @media (min-height: 500px) {
      height: 100%;
    } */

    @media (max-width: 600px) {
      padding: 60px 10px 10px 10px;
    }
  `}
`;

const CardOrder = styled.div`
  ${({ theme }) => css`
    width: 60%;
    height: 100px;
    margin-bottom: 20px;
    font-size: 20px;
    color: ${theme.colors.text};
    background: ${theme.colors.primary};
    box-shadow: 0 0 5px ${theme.colors.shadowCards};
    border-radius: 5px;
    padding: 15px 20px 15px 40px;

    border-bottom: 10px solid ${theme.colors.borderInput};
    position: relative;

    cursor: pointer;

    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }
    @media (max-width: 1000px) {
      width: 70%;
    }
    @media (max-width: 700px) {
      width: 100%;
    }
    @media (max-width: 600px) {
      width: 100%;
      margin-bottom: 10px;
    }
    > p {
      text-align: right;
      margin-top: 10px;
      font-size: 24px;
      font-weight: 600;
    }
    > div {
      display: flex;
      justify-content: space-between;

      .order-number {
        font-weight: 600;
        font-size: 24px;
      }

      > h2 {
        font-size: 20px;
        font-weight: 400;
      }
    }
  `}
`;

const ColorStatus = styled.div`
  ${({ theme, pending }) => css`
    width: 20px;
    height: 100px;
    left: 0;
    top: 0;

    position: absolute;

    border-radius: 5px 0 0 5px;
    
    background: ${pending
    ? theme.colors.colorStatusYellow
    : theme.colors.colorStatusGreen};
  `}
`;

export default {
  Container,
  ContainerOrders,
  CardOrder,
  ColorStatus,
};
