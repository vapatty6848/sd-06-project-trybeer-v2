import styled, { css } from 'styled-components';

const Container = styled.div`${() => css`

  `}
`;

const Products = styled.div`${({ theme }) => css`
  align-items: center;
  border-bottom: 2px solid ${theme.colors.borderInput};
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  position: relative;
  width: 100%;

  > img {
    height: 100px;
    margin-left: 20px;
    margin-right: 40px;
  }
  `}
`;

const Image = styled.div`align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  width: 115px;

  > img {
    height: 115px;
    margin-bottom: 5px;
  }
`;

const DescriptionProducts = styled.div`
  ${() => css`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  width: 100%;
  .content-left-product {
    display: flex;
    flex-direction: column;
    height: 60px;
    justify-content: space-between;
    padding: 0;
    > p {
      font-size: 14px;
      font-weight: 400;
    }
    @media ( max-width : 1100px ) {
      width: 150px;
    }
    @media ( max-width : 460px ) {
      width: 110px;
    }
  }
  > span {
    font-size: 22px;
  }
  .content-right-product {
    display: flex;
    font-size: 22px;
    > span {
      margin-right: 5px;
    }
    > p {
      margin-left: 5px;
    }
    @media ( max-width : 940px ) {
      margin-right: 30%;
    }
    @media ( max-width : 840px ) {
      margin-right: 25%;
    }
    @media ( max-width : 780px ) {
      margin-right: 20%;
    }
    @media ( max-width : 740px ) {
      margin-right: 0;
    }
    @media ( max-width : 600px ) {
      height: 68px;
    }
  }
`}
`;

const ButtonProduct = styled.button`${({ theme }) => css`
  background: yellow;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px ${theme.colors.shadowCards};
  color: #353535;
  font-size: 16px;
  font-weight: 550;
  height: 30px;
  margin-left: 20px;
  width: 180px;

  @media ( max-width : 600px ) {
    bottom: 40px;
    position: absolute;
    right: 0;
    width: 120px;
  }
`}
`;

export default {
  Container,
  Products,
  Image,
  DescriptionProducts,
  ButtonProduct,
};
