import { Box, Grid, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import Titlebar from "../../components/Titlebar";
import startbuttonimg from "../../assets/gui/buttons/start.png";

const useStyles = makeStyles({
  startgamebar: {
    width: "100%",
    borderBottom: "2px solid lightgreen",
  },
  startgamebox: {
    height: "41.5vh",
    backgroundColor: "darkgreen",
    padding: "16px",
    borderRight: "2px solid lightgreen",
  },
});

const StartButton = () => {
  const [click, setClick] = useState(false);

  return (
    <Box
      component="img"
      src={startbuttonimg}
      width={click ? "48%" : "50%"}
      onClick={() => {
        setClick(true);
        setTimeout(() => {
          setClick(false);
        }, 100);
      }}
    ></Box>
  );
};

export default function StartGame() {
  const styles = useStyles();

  return (
    <Stack className={styles.startgamebar}>
      <Titlebar height="6vh">
        <Typography
          variant="h4"
          fontFamily="inherit"
          fontStyle="italic"
          color="yellow"
        >
          SnakeGameDemo
        </Typography>
      </Titlebar>
      <Grid container borderTop="2px solid lightgreen" flexGrow={1}>
        <Grid item xs={12} className={styles.startgamebox}>
          <StartButton />
        </Grid>
      </Grid>
    </Stack>
  );
}
