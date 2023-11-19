import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Nav() {
  return (
    <AppBar>
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div">
          POMODORO
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
