import styled, { css, keyframes } from 'styled-components';

const animate = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const contentLeft = keyframes`
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  50% {
    opacity: .4;
  }
  100% {
    transform: translatex(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  ${({ theme, pending, stateSideBarAdmin }) => css`
    width: 70%;
    height: 100px;
    padding: 15px 20px 15px 40px;
    margin-bottom: 20px;
    font-weight: 550;

    opacity: ${stateSideBarAdmin && '0.2'};
    position: relative;

    border-bottom: 10px solid ${theme.colors.borderInput};
    border-radius: 5px;
    box-shadow: 0 0 5px ${theme.colors.shadowCards};

    display: flex;
    justify-content: space-between;

    color: ${theme.colors.text};
    background: ${theme.colors.secondary};

    @media (max-width: 1200px) {
      width: 80%;
    }
    @media (max-width: 1000px) {
      width: 100%;
    }
    @media (max-width: 600px) {
      margin-bottom: 10px;
    }

    transition: background 0.3s;

    &:hover {
      background: ${pending && theme.colors.borderInput};

      .content-left {
        margin-left: ${pending && '200px'};
        animation: ${pending && contentLeft} 0.7s;

        @media (max-width: 900px) {
          margin-left: 0;
          animation: 0;
        }
      }

      .confirm {
        display: ${pending && 'flex'};
        justify-content: center;
        align-items: center;
      }
    }
  `}
`;

const ContentLeft = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `}
`;

const ContentRight = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    > p {
      font-size: 24px;
      font-weight: 600;
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

const ConfirmButton = styled.button`
  ${({ theme }) => css`
    width: 180px;
    height: 70px;

    font-size: 18px;
    font-weight: 550;
    color: #353535;

    position: absolute;
    /* left: 50%;
    transform: translateX(-50%); */

    opacity: 1;

    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px ${theme.colors.shadowCards};
    
    background: ${theme.colors.colorStatusYellow};

    animation: ${animate} 0.2s;

    @media (max-width: 900px) {
      animation: ${animate} 0.5s;
    }

    display: none;

    cursor: pointer;
    outline: none;
    transition: filter 0.3s;

    &:hover {
      filter: brightness(0.9);
    }
  `}
`;

export default {
  Container,
  ContentLeft,
  ContentRight,
  ColorStatus,
  ConfirmButton,
};
