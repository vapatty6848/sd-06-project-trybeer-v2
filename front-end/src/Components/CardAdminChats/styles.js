import styled, { css } from 'styled-components';

const Container = styled.div`${({ theme, pending }) => css`
  width: 70%;
  font-weight: bold;
  font-family: 'PT sans', sans-serif;
  padding: 15px 20px 15px 40px;

  position: relative;

  border-bottom: 10px solid ${theme.colors.colorStatusYellow};
  border-radius: 5px;
  box-shadow: 0 0 5px black;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: ${theme.colors.text};
  background: ${theme.colors.primary};

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
    cursor: pointer;
    .content-left {
      margin-left: ${pending && '200px'};

      @media (max-width: 900px) {
        margin-left: 0;
        animation: 0;
      }
    }
  }

  h2 {
    text-align: center;
  }

  h4 {
    text-align: end;
  }
  `}
`;

export default { Container };
