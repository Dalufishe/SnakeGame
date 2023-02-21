import { Divider, Link, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function Logo() {
  return (
    <Stack
      height="100%"
      direction="row"
      gap={1}
      alignItems="center"
      p={0.5}
      ml={1}
      mr={1}
    >
      {/* Logo */}
      <Typography
        variant="body2"
        fontWeight={900}
        sx={{
          cursor: "pointer",
        }}
      >
        SnakeGameDemo™ ©{" "}
      </Typography>
      {/* Studio */}
      <Link href="#" color="inherit" fontWeight={700}>
        Dalus Studio
      </Link>
      {/* Year */}
      <Typography variant="body2" color="text.secondary" fontWeight={700}>
        - 2023
      </Typography>
      {/* Links */}
      <Divider orientation="vertical" flexItem />
      <Link href="#" color="inherit" fontWeight={700}>
        Github
      </Link>
      <Divider orientation="vertical" flexItem />
      <Link
        href="#"
        sx={{
          color: "#5865F2",
        }}
        fontWeight={700}
      >
        Discord
      </Link>
      <Divider orientation="vertical" flexItem />
      <YouTubeIcon
        sx={{
          fontSize: 16,
          mr: -0.5,
          color: "red",
          opacity: 0.9,
        }}
      />
      <Link href="#" color="inherit" fontWeight={700}>
        Youtube
      </Link>
      <Divider orientation="vertical" flexItem />
      <Link href="#" color="inherit" fontWeight={700}>
        Support Us
      </Link>
    </Stack>
  );
}
