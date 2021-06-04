import React from 'react';
import { makeStyles, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';


const useStyles = makeStyles((theme) => ({
  stickToBottom: {
    width: '100%',
    position: 'sticky',
    bottom: 0,
    backgroundColor: theme.palette.main,
    height: '70px',
  },
  root: {
    color: "white"
  }
}));

const TopBar = () => {
  const classes = useStyles();
  return (
    <BottomNavigation
      showLabels
      className={classes.stickToBottom}
    >
      <BottomNavigationAction 
        label="Provided by 4A-WisHub Group for IO 2021 AGH" 
        icon={<GitHubIcon/>} 
        href="https://github.com/MrrrrFox/WisHub"
        className={classes.root}
      />
      
    </BottomNavigation>
  );
};


export default TopBar;
