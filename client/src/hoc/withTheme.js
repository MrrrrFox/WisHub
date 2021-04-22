import React from "react";
import { ThemeProvider } from "@material-ui/core";
import theme from "../theme";

const withTheme = (WrappedComponent) => {
  return (props) => {
    return (
      <ThemeProvider theme={theme}>
        <WrappedComponent {...props} />
      </ThemeProvider>
    );
  };
};

export default withTheme;
