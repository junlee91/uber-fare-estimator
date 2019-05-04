import React from "react";

import Header from "./Header";
import config from "../config";

export default () => {
  console.log(config);

  return (
    <>
      <Header />
      <h1>Uber Fare Estimator Component</h1>
    </>
  );
};
