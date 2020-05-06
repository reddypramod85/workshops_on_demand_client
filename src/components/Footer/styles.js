import styled from "styled-components";
import AppFooter from "grommet/components/Footer2";

export const Footer = styled(AppFooter)`
  a {
    text-decoration: none;
  }
  svg {
    width: 128px;
    height: 48px;
    path:first-child {
      fill: ${props => (props.colorIndex === "neutral-1" ? "white" : "#333")};
    }
  }
  & > div {
    max-width: 1400px;
  }
`;

export default Footer;
