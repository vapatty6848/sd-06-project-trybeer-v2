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

const Container = styled.div`
  ${({ theme, pending, stateSideBarAdmin }) => css`
    width: 70%;
    padding: 15px 20px 15px 40px;
    font-weight: 550;
    /* opacity: ${stateSideBarAdmin && '0.2'}; */
    position: relative;

    border-bottom: 10px solid ${theme.colors.borderInput};
    border-radius: 5px;
    box-shadow: 0 0 5px black;

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
      .content-left {
        margin-left: ${pending && '200px'};

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

const Content = styled.div`
  ${() => css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `}
`;

const ContentLeft = styled.div`
  ${({ theme, pending }) => css`
    margin-bottom: 30px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > div {
      display: flex;
      justify-content: space-between;

      > h1 {
        font-size: 22px;
        font-weight: 500;
      }
      > h2 {
        font-size: 22px;
        font-weight: 500;
        color: ${pending
    ? theme.colors.colorStatusYellow
    : theme.colors.colorStatusGreen};
      }
    }

    > h3 {
      margin-top: 10px;
      font-size: 16px;
      font-weight: 400;
    }
  `}
`;

const ContentRight = styled.div`
  ${() => css`
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    align-items: center;

    > h1 {
      font-size: 22px;  
      font-weight: 500;

      > span {
        font-size: 16px;  
        font-weight: 400;
      }

      @media (max-width: 480px) {
        display: flex;
        flex-direction: column;
      }
    }
  `}
`;

const ColorStatus = styled.div`
  ${({ theme, pending }) => css`
    width: 20px;
    height: 100%;
    left: 0;
    top: 0;

    position: absolute;

    border-radius: 5px 0 0 0;
    
    background: ${pending
    ? theme.colors.colorStatusYellow
    : theme.colors.colorStatusGreen};
  `}
`;

const ColorStatusBottom = styled.div`
  ${({ theme, pending }) => css`
    width: 20px;
    height: 100%;
    left: 0;
    bottom: -10px;

    position: absolute;

    border-radius: 5px 5px 0 5px;
    
    background: ${pending
    ? theme.colors.colorStatusYellow
    : theme.colors.colorStatusGreen};
  `}
`;

const ConfirmButton = styled.button`
  ${({ theme, pending }) => css`
    width: 180px;
    height: 50px;

    font-size: 18px;
    font-weight: 550;
    color: #353535;

    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px ${theme.colors.shadowCards};
    
    background: ${theme.colors.colorStatusYellow};

    display: ${!pending && 'none'};

    @media (max-width: 900px) {
      animation: ${animate} 0.5s;
    }

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
  Content,
  ColorStatus,
  ConfirmButton,
  ColorStatusBottom,
  ContentLeft,
  ContentRight,
};
