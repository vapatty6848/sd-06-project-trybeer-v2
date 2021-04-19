import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ theme, stateSideBar }) => css`

    background: ${theme.colors.secondary};

    z-index: 997;
  
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 500px) {
      background: ${theme.colors.primary};
    }

    > form {
      opacity: ${stateSideBar && '0.2'};
      background: ${theme.colors.primary};
      padding: 20px 30px 10px 30px;
      border-radius: 5px;
      box-shadow: 0 0 5px black;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      > h1 {
        color: ${theme.colors.text};
        margin-bottom: 20px;
        display: none;

        @media (max-width: 500px) {
          display: none;
        }
      }

      > p {
        color: ${theme.colors.text};
      }

      @media (max-width: 500px) {
        border: none;
        border-radius: 0;
        box-shadow: none;
        width: 100%;
      }
    }
  `}
`;

export default Container;
