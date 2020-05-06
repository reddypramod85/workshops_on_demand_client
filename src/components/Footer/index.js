import React from "react";
import PropTypes from "prop-types";
import { Anchor, Box, Text, Footer } from "grommet";

// import Footer from "./styles";

export const AppFooter = ({ colorIndex }) => (
  <Footer
    align="center"
    direction="row-responsive"
    flex={false}
    justify="between"
    gap="medium"
    fill="horizontal"
    pad="medium"
    background={{ color: "background-front" }}
  >
    <Text>© 2020 Hewlett Packard Enterprise Development LP</Text>
    <Box align="center" justify="start" direction="row" gap="small">
      <Anchor
        href="https://www.hpe.com/us/en/about/legal/terms-of-use.html"
        target="_blank"
      >
        Terms of use
      </Anchor>
      <Anchor
        href="https://www.hpe.com/us/en/legal/privacy.html"
        target="_blank"
      >
        Privacy
      </Anchor>
      <Anchor
        href="https://www.hpe.com/us/en/legal/privacy.html#datacollection"
        target="_blank"
      >
        Cookies
      </Anchor>
      <Anchor
        href="https://www.hpe.com/us/en/privacy/personal-information.html"
        target="_blank"
      >
        Do Not Sell My Personal Information
      </Anchor>
    </Box>
  </Footer>
);

AppFooter.propTypes = {
  colorIndex: PropTypes.oneOf(["neutral-1", "light-2"])
};

AppFooter.defaultProps = {
  colorIndex: "neutral-1"
};

export default AppFooter;
