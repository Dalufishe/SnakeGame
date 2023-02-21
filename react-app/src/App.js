
import React from 'react'
import { makeStyles } from "@mui/styles"
import { Grid, Stack } from "@mui/material"
import Game from './feature/Game/Game';
import Topbar from './layout/Topbar';
import Content from './layout/Content/Content';
import Rightbar from './layout/Rightbar/Rightbar';
import Logo from './feature/Logo';
import Statebar from './feature/Statebar/Statebar';
import Historybar from './feature/Historybar/Historybar';
import StartGame from './feature/StartGame/StartGame';

export default function App() {

  return (
    <>
      {/* topbar */}
      <Topbar>
        <Logo />
      </Topbar>
      {/*  */}
      <Grid
        container
      >
        {/* content */}
        <Content>
          <Stack width="100%" justifyContent="center" alignItems="center">
            <Game />
          </Stack>
        </Content>
        {/* rightbar */}
        <Rightbar>
          <Stack width="100%" justifyContent="flex-start" alignItems="center">
            <Statebar />
            <StartGame />
            <Historybar />
          </Stack>
        </Rightbar>
      </Grid>
    </>
  )
}
