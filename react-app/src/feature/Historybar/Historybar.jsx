import { Grid, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import { connect } from "react-redux";
import Titlebar from "../../components/Titlebar";

const useStyles = makeStyles({
  historybar: {
    width: "100%",
    borderBottom: "2px solid lightgreen",
  },
  historybox: {
    height: "18vh",
    overflow: "auto",
    backgroundColor: "darkgreen",
    padding: "16px",
    borderRight: "2px solid lightgreen",
  },
});

function Historybar(props) {
  const styles = useStyles();
  const history = props.HistoryGameData.history;
  
  const handleBestScore = (history) => {
    let highest = 0;
    console.log(history)
    
    for (let record of history) {
      if (Number(record.score) > highest) {
        highest = Number(record.score);
      }
    }
    return highest;
  };
  return (
    <Stack className={styles.historybar}>
      <Titlebar height="6vh">History</Titlebar>
      <Grid container borderTop="2px solid lightgreen" flexGrow={1}>
        <Grid item xs={4} className={styles.historybox}>
          <Stack height="100%" gap={2} justifyContent="center">
            <Typography
              variant="h5"
              align="center"
              color="greenyellow"
              fontFamily="inherit"
            >
              Best
            </Typography>
            <Typography
              variant="h3"
              align="center"
              color="greenyellow"
              fontFamily="inherit"
            >
              {handleBestScore(history)}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={8} className={styles.historybox}>
          <Stack height="100%" gap={4} justifyContent="flex-start">
            {history.map((item) => (
              <Typography
                key={item._id}
                variant="h6"
                align="center"
                color="greenyellow"
                fontFamily="inherit"
              >
                {`Nobody | ${item.score} | ${item.level} | ${item.snake.length}`}
              </Typography>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

const mapStateToProps = (state) => {
  return {
    HistoryGameData: state.historyGameReducer,
  };
};

export default connect(mapStateToProps)(Historybar);
