import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.button`
  background: none;
  color: ${({ theme, $isactive }) =>
    $isactive ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};

  border: none;
  font-size: 16px;
`;
