import { Box, Grid, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { connect } from "react-redux";
import Titlebar from "../../components/Titlebar";

const useStyles = makeStyles({
  statebar: {
    width: "100%",
    borderBottom: "2px solid lightgreen",
  },
  statebox: {
    height: "18vh",
    backgroundColor: "darkgreen",
    padding: "16px",
    borderRight: "2px solid lightgreen",
  },
});

function Statebar(props) {
  const styles = useStyles();
  const { gameData } = props;
  return (
    <Stack className={styles.statebar}>
      <Titlebar height="6vh">
        Game State
      </Titlebar>
      <Grid container borderTop="2px solid lightgreen" flexGrow={1}>
        <Grid item xs={6} className={styles.statebox}>
          <Stack height="100%" gap={2} justifyContent="center">
            <Typography
              variant="h5"
              align="center"
              color="greenyellow"
              fontFamily="inherit"
            >
              Score
            </Typography>
            <Typography
              variant="h3"
              align="center"
              color={
                Number(gameData.game.score) % 1000 > 850 ? "orange" : "yellow"
              }
              fontFamily="inherit"
            >
              {gameData.game.score}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={3} className={styles.statebox}>
          <Stack height="100%" gap={3} justifyContent="center">
            <Typography
              variant="h5"
              align="center"
              color="greenyellow"
              fontFamily="inherit"
            >
              Level {gameData.game.level}
            </Typography>
            <Box borderTop="1.5px solid lightgreen"></Box>
            <Typography
              variant="h5"
              align="center"
              color="greenyellow"
              fontFamily="inherit"
            >
              Speed {gameData.game.speed?.toFixed(0)}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={3} className={styles.statebox}>
          <Stack height="100%" gap={3} justifyContent="center">
            <Typography
              variant="h5"
              align="center"
              color="greenyellow"
              fontFamily="inherit"
            >
              {"(" + gameData.game.snake?.head.replace("_", " , ") + ")"}
            </Typography>
            <Box borderTop="1.5px solid lightgreen"></Box>
            <Typography
              variant="h5"
              align="center"
              color="greenyellow"
              fontFamily="inherit"
            >
              {gameData.game.snake?.length}{" "}
              {gameData.game.snake?.length === 1 ? "snk" : "snks"}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

const mapStateToProps = (state) => {
  return {
    gameData: state.gameReducer,
  };
};

export default connect(mapStateToProps)(Statebar);
