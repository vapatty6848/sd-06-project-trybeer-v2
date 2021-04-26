import styled, { css } from 'styled-components';

const Container = styled.div`
  ${() => css`
  `}
`;

const Context = styled.div`
  ${() => css`
    width: 100%;
    height: 100vh;
    display: flex;
  `}

`;
const ContainerCard = styled.div`
  ${({ theme, stateSideBarAdmin }) => css`
    opacity: ${!stateSideBarAdmin && '0.2'};
    width: 100%;
    height: 100%;
    padding: 70px 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    background: ${theme.colors.secondary};

    @media (max-width: 1000px) {
      padding: 70px 20px 0 20px;
    }

    @media (max-width: 600px) {
      padding: 60px 10px 0 10px;
    }
  `}
`;

export default {
  Container,
  Context,
  ContainerCard,
};
