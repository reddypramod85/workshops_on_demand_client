import React from "react";
import { Box, Text, Heading, Anchor, Button } from "grommet";

//========================================= Footer
const Footer = () => (
  <Box
    align="stretch"
    justify="center"
    direction="column"
    alignSelf="center"
    wrap={false}
    flex={false}
  >
    <Box
      align="center"
      justify="center"
      direction="row"
      wrap={false}
      flex={true}
      fill="horizontal"
      pad="medium"
    >
      <Box
        align="center"
        justify="center"
        direction="column"
        wrap={true}
        flex={true}
        basis="1/3"
      >
        <Text>Stay in the loop</Text>
        <Heading level="4" textAlign="center" size="small" truncate={false}>
          Sign up for the HPE Developer Newsletter
        </Heading>
        <Anchor
          href="https://developer.hpe.com/newsletter-signup"
          target="_blank"
        >
           
          <Button label="Subscribe Now" primary={true} />
        </Anchor>
      </Box>
      <Box
        align="center"
        justify="center"
        direction="column"
        overflow="auto"
        flex={true}
        basis="1/3"
      >
        <Text>Build with us</Text>
        <Heading
          level="4"
          size="small"
          textAlign="center"
          truncate={false}
          margin="medium"
        >
          Contribute to the HPE Developer blog
        </Heading>
        <Anchor href="https://developer.hpe.com/signup" target="_blank">
           
          <Button label="Contribute" primary={true} />
        </Anchor>
      </Box>
      <Box
        align="center"
        justify="center"
        direction="column"
        overflow="auto"
        flex={true}
        basis="1/3"
      >
        <Text>Connect and code</Text>
        <Heading
          level="4"
          size="small"
          textAlign="center"
          truncate={false}
          margin="medium"
        >
          Join the HPE Developer Slack Community
        </Heading>
        <Anchor href="https://slack.hpedev.io/" target="_blank">
           
          <Button label="Join Now" primary={true} />
        </Anchor>
      </Box>
    </Box>
  </Box>
);

export default Footer;
