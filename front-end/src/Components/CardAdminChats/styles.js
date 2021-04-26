import styled, { css } from 'styled-components';

export const Container = styled.div`${({ theme, pending, stateSideBarAdmin }) => css`
  font-weight: 550;
  padding: 15px 20px 15px 40px;
  width: 70%;

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
