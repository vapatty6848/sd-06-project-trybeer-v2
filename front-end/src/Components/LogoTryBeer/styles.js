import styled, { css, keyframes } from 'styled-components';

const logo = keyframes`
  0% {
    transform: translatex(-100px);
    opacity: 0;
  }
  50% {
    opacity: .3;
  }
  100% {
    transform: translatex(0);
    opacity: 1;
  }
`;

const image = keyframes`
  0% {
    transform: translatex(100px);
    opacity: 0;
  }
  50% {
    opacity: .3;
  }
  100% {
    transform: translatex(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  ${({ stateSideBar }) => css`
    opacity: ${stateSideBar && '0.2'};

    position: relative;
    display: flex;

    margin-bottom: 50px;

    @media (max-width: 500px) {
      margin-bottom: 30px;
    }

    > h1 {
      font-family: 'Typoslab';
      font-size: 55px;
      color:  #397330;

      animation: ${logo} .9s;

      @media (max-width: 500px) {
        font-size: 50px;
      }

      > span {
        color: #cf8d2e;
      }
    }

    > img {
      width: 70px;
      position: absolute;
      bottom: 40px;
      left: 170px;

      animation: ${image} .9s;

      @media (max-width: 500px) {
        bottom: 35px;
        left: 150px;
      }
    }
  `}
`;

export default {
  Container,
};
