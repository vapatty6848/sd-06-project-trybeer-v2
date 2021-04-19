import styled, { css } from 'styled-components';

const Container = styled.div`
  ${() => css`

  `}
`;

const Products = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    position: relative;

    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid ${theme.colors.borderInput}; 

    > img {
      height: 100px;
      margin-left: 20px;
      margin-right: 40px;
    }
  `}
`;

const DescriptionProducts = styled.div`
  ${() => css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .content-left-product {
      height: 60px;
      padding: 0 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > p {
        font-weight: 400;
        font-size: 14px;
      }
      @media (max-width: 1100px) {
        width: 150px;
      }
      @media (max-width: 460px) {
        width: 110px;
      }
    }
    > span {
      font-size: 22px;
    }
    .content-right-product {
      font-size: 22px;
      display: flex;
      > span {
        margin-right: 5px;
      }
      > p {
        margin-left: 5px;
      }
      @media (max-width: 940px) {
        margin-right: 30%;
      }
      @media (max-width: 840px) {
        margin-right: 25%;
      }
      @media (max-width: 780px) {
        margin-right: 20%;
      }
      @media (max-width: 740px) {
        margin-right: 0;
      }
      @media (max-width: 600px) {
        height: 68px;
      }
    }
  `}
`;

const ButtonProduct = styled.button`
  ${({ theme }) => css`
    width: 180px;
    height: 30px;

    margin-left: 20px;

    font-size: 16px;
    font-weight: 550;
    color: #353535;

    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px ${theme.colors.shadowCards};
    
    background: yellow;

    @media (max-width: 600px) {
      position: absolute;
      width: 120px;
      right: 0;
      bottom: 40px;
    }
  `}
`;

export default {
  Container,
  Products,
  DescriptionProducts,
  ButtonProduct,
};
