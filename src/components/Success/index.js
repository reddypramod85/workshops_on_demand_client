import React from "react";
import { Box, Text, Button } from "grommet";
import { Link } from "react-router-dom";

const Success = props => {
  return (
    <Box
      align="stretch"
      justify="center"
      direction="column"
      round="medium"
      background={{ color: "background-front" }}
      pad="xsmall"
      fill={true}
    >
      <Box
        align="center"
        justify="center"
        direction="column"
        margin={{ top: "large" }}
        gap="small"
        fill={true}
      >
        <Box
          align="start"
          justify="center"
          direction="row"
          gap="xlarge"
          fill={true}
        >
          <Box align="center" justify="center" basis="1/2" direction="row">
            <Text>
              <strong>Name</strong>
            </Text>
          </Box>
          <Box align="start" justify="start" basis="1/2" direction="row">
            <Text>{props.location.state.name}</Text>
          </Box>
        </Box>

        <Box
          align="start"
          justify="center"
          direction="row"
          gap="xlarge"
          fill={true}
        >
          <Box align="center" justify="center" basis="1/2" direction="row">
            <Text>
              <strong>Company</strong>
            </Text>
          </Box>
          <Box align="start" justify="start" basis="1/2" direction="row">
            <Text>{props.location.state.company}</Text>
          </Box>
        </Box>

        <Box
          align="start"
          justify="center"
          direction="row"
          gap="xlarge"
          fill={true}
        >
          <Box align="center" justify="center" basis="1/2" direction="row">
            <Text>
              <strong>Email</strong>
            </Text>
          </Box>
          <Box align="start" justify="start" basis="1/2" direction="row">
            <Text>{props.location.state.email}</Text>
          </Box>
        </Box>

        <Box
          align="start"
          justify="center"
          direction="row"
          gap="xlarge"
          fill={true}
        >
          <Box align="center" justify="center" basis="1/2" direction="row">
            <Text>
              <strong>Workshop</strong>
            </Text>
          </Box>
          <Box align="start" justify="start" basis="1/2" direction="row">
            <Text>{props.location.state.workshop}</Text>
          </Box>
        </Box>
      </Box>
      <Box align="center" justify="start" gap="small" pad="medium">
        <Link to="/">
          <Button label="Register More Workshops" primary={true} />
        </Link>
      </Box>
    </Box>
  );
};

export default Success;
