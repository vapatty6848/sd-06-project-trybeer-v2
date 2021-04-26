import styled, { css } from 'styled-components';

const Container = styled.div`${({ theme, stateSideBar }) => css`
  align-items: center;
  background: ${theme.colors.secondary};
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100%;
  z-index: 997;

  @media ( max-width : 500px ) {
    background: ${theme.colors.primary};
  }

  > form {
    align-items: center;
    background: ${theme.colors.primary};
    border-radius: 5px;
    box-shadow: 0 0 5px black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: ${stateSideBar && '0.2'};
    padding: 20px 30px 10px;

    > h1 {
      color: ${theme.colors.text};
      display: none;
      margin-bottom: 20px;

      @media ( max-width : 500px ) {
        display: none;
      }
    }

    > p {
      color: ${theme.colors.text};
    }

    @media ( max-width : 500px ) {
      border: none;
      border-radius: 0;
      box-shadow: none;
      width: 100%;
    }
  }
  `}
`;

export default Container;
