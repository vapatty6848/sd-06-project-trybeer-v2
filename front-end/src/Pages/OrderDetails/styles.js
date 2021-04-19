import styled, { css } from 'styled-components';

const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;
    background: ${theme.colors.primary};

    display: flex;
    justify-content: center;
  `}
`;

const ContainerOrder = styled.div`
  ${({ theme, stateSideBar }) => css`
    width: 60%;
    height: 100vh;

    opacity: ${stateSideBar ? '0.3' : '1'};

    padding: 70px 20px 20px 20px;

    background: ${theme.colors.primary};
    color: ${theme.colors.text};
  `}

  @media (max-width: 1000px) {
    width: 70%;
  }
  
  @media (max-width: 700px) {
    width: 90%;
  }


  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ContainerDescription = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 30px;
    margin-bottom: 10px;

    padding: 0 10px;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: ${theme.colors.backgroundInput};
    border: 1px solid ${theme.colors.borderInput};
  `}
`;

const ContainerInfos = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
    position: relative;

    padding-right: 10px;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: ${theme.colors.backgroundInput};
    border: 1px solid ${theme.colors.backgroundDiv};

    .quantity {
      background: ${theme.colors.backgroundDiv};
      height: 100%;
      width: 40px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 5px 0 0 5px;
    }

    .description {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    @media (max-width: 500px) {
      font-size: 14px;
    }
  `}
`;

const Total = styled.p`
  ${() => css`
    text-align: right;
    margin-top: 20px;

    font-weight: 600;
  `}
`;

const TopInfos = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    > h2 {
      margin-bottom: 20px;

      font-size: 20px;
    }

    > span {
      margin-bottom: 20px;

      font-size: 20px;
    }
  `}
`;

export default {
  Container,
  ContainerOrder,
  ContainerDescription,
  ContainerInfos,
  Total,
  TopInfos,
};
