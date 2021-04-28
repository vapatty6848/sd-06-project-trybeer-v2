import styled, { css } from "styled-components";

const ListUl = styled.ul`
  ${({ theme }) => css`
    list-style: none;
    width: 100%;
    display: flex;
    flex-flow: column wrap;

    li {
      margin: 10px;

      div {
        background: ${theme.colors.divCounter};
        border-radius: 12px;

        color: ${theme.colors.text};

        padding: 10px;

        span {
          font-weight: 700;
          font-family: 'PT sans', sans-serif;
        }

        p {
          margin-top: 10px;
          font-family: 'Lexend', sans-serif;
          font-weight: 500;
        }
      }
    }

    .administrator {
      width: 100%;
      display: flex;
      justify-content: flex-start;

      div {
        background: ${theme.colors.colorStatusYellow};
      }
    }

    .client {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      div {
        background: ${theme.colors.colorStatusGreen};
      }
    }
  `}
`

export default {
  ListUl,
}