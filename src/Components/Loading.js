import React from "react";
import styled, { keyframes } from "styled-components";

const LOADING = keyframes`
  0% {
    transform: scale(0.7);
    background: #306293;
  }
  50% {
    transform: scale(1);
    background: white;
  }
  100% {
    transform: scale(0.7);
    background: #306293;
  }
`;

const LOADINGREV = keyframes`
  0% {
    transform: scale(0.7);
    background: white;
  }
  50% {
    transform: scale(1);
    background: #306293;
  }
  100% {
    transform: scale(0.7);
    background: white;
  }
`;

const Container = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  transform: translate(-50%, -50%);
  font-size: 0;
  &.reversed {
    li {
      border: 3px solid white;
      animation: ${LOADINGREV} 2s infinite;
      &:nth-child(1n) {
        animation-delay: 0s;
      }
      &:nth-child(2n) {
        animation-delay: 0.2s;
      }
      &:nth-child(3n) {
        animation-delay: 0.4s;
      }
    }
  }
  li {
    height: 0;
    position: absolute;
    left: 0;
    margin: 0;
    height: 13px;
    width: 13px;
    border: 1.7px solid ${props => props.theme.blueColor};
    border-radius: 100%;
    transform: transformZ(0);
    animation: ${LOADING} 2s infinite;
    &:nth-child(1n) {
      left: -20px;
      animation-delay: 0s;
    }
    &:nth-child(2n) {
      left: 0;
      animation-delay: 0.2s;
    }
    &:nth-child(3n) {
      left: 20px;
      animation-delay: 0.4s;
    }
  }
`;

const Loading = () => (
  <Container>
    <li />
    <li />
    <li />
  </Container>
);

export default Loading;
