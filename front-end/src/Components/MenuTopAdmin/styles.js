import styled, { css } from 'styled-components';

const CompMenuTop = styled.header`
  ${({ theme, darkTheme }) => css`
    width: 100%;
    height: 50px;
    z-index: 999;
    position: fixed;
    overflow: hidden;
    padding: 0 1rem;
    background: ${theme.colors.secondary};
    border-bottom: 3px solid ${theme.colors.green};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    > button {
      background: ${theme.colors.primary};
      padding: 3px 5px 3px 5px;
      border: none;
      border-radius: 3px;
      box-shadow: 0 0 5px ${theme.colors.shadowCards};
      cursor: pointer;
      outline: none;
      transition: filter 0.3s;
      &:hover {
        filter: brightness(0.955);
      }
      > img {
        filter: ${!darkTheme && 'brightness(0)'};
        width: 16px;
      }
    }
    > h2 {
      font-size: 22px;
      color: ${theme.colors.text};
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'Typoslab';
      font-weight: 400;
    }
    .hamburger {
      display: none;
      @media (max-width: 940px) {
        display: flex;
      }
    }
    @media (max-width: 940px) {
      justify-content: space-between;
    }
  `}
`;

const ContainerToggle = styled.div`
  ${({ darkTheme }) => css`
    
    display: flex;
    align-items: center;

    > img {
      width: 12px;
      height: 12px;
      margin-left: 3px;

      filter: ${!darkTheme && 'brightness(100)'};
    }

    > div {
      margin-left: 3px;
    }
  `}

`;

export default {
  CompMenuTop,
  ContainerToggle,
};
