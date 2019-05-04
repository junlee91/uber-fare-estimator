import React from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../styles/globalStyles";
import theme from "../styles/theme";
import UberHome from "./UberHome";

export default () => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <UberHome />
    </>
  </ThemeProvider>
);
