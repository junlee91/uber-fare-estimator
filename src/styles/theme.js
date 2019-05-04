import { keyframes } from "styled-components";

export const theme = {
  blueColor: "#3498db",
  greenColor: "#1abc9c",
  greyColor: "#7f8c8d",
  yellowColor: "#f1c40f",
  maxWidth: "1030px"
};

export const fadeIn = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;
