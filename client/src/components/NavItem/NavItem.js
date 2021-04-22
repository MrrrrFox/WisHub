import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "120px",
    height: "50px",
    textAlign: "center",
    cursor: "pointer",
  },
  text: {
    color: theme.palette.main,
    fontFamily: theme.mainFont,
    position: "relative",
  },
}));

const NavItem = ({ title, ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper} {...props}>
      <Typography className={classes.text} variant="h4">
        {title}
      </Typography>
    </div>
  );
};

export default NavItem;