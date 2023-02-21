import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Logo from "../feature/Logo";

const useStyles = makeStyles({
  topbar: {
    backgroundColor: "lightgreen",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;",
  },
});

export default function Topbar(props) {
  const styles = useStyles();
  return (
    <Grid height={32} container className={styles.topbar}>
      <Grid item xs={12}>
        {props.children}
      </Grid>
    </Grid>
  );
}
