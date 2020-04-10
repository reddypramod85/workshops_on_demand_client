import React from "react";
import { Box, Text } from "grommet";
import { Hpe } from "grommet-icons";

//========================================= Footer
const Header = () => (
  <Box
    align="center"
    justify="center"
    direction="row-responsive"
    pad="small"
    fill="horizontal"
    gap="medium"
    flex={false}
  >
    <Hpe color="brand" size="large" />
    <Box align="end" justify="center" direction="column">
      <Text size="xlarge" weight="bold">
        Hack Shack Workshops On Demand
      </Text>
      <Text weight="bold">powered by HPEDEV</Text>
    </Box>
  </Box>
);

export default Header;
