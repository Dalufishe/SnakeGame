import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export default function Titlebar(props) {
  return (
    <Stack height={props.height} justifyContent="center" alignItems="center">
      <Typography variant="h4" color="greenyellow" fontFamily="inherit">
        {props.children}
      </Typography>
    </Stack>
  );
}
