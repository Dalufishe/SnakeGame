import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  rightbar: {
    backgroundColor: "green",
    borderLeft: "2px solid lightgreen",
  }
});

export default function Rightbar(props) {
  const styles = useStyles();

  return (
    <Grid
      height="calc(100vh - 32px)"
      item
      container
      xs={5}
      className={styles.rightbar}
    >
      {props.children}
    </Grid>
  );
}
