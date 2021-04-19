import styled, { css } from 'styled-components';

const CompInput = styled.input`
  ${({ width, height, fontSize }) => css`
    width: ${width};
    height: ${height};

    font-size: ${fontSize};

    margin-right: 10px;

    border: none;
    border-radius: 5px;

    box-shadow: 0 0 2px 0;

    @media (max-width: 500px) {
    }
  `}
`;

export default CompInput;
