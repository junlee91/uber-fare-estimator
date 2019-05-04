import React from "react";
// import styled from "styled-components";

import Header from "./Header";
import TitleBox from "./TitleBox";
import Estimator from './Estimator';
import config from "../config";

export default () => {
  console.log(config);

  return (
    <>
      <Header />
      <TitleBox />
      <Estimator />
    </>
  );
};
