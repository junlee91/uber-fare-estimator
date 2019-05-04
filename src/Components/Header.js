import React from "react";
import styled from "styled-components";

import {
  UberGlobeIcon,
  UberLoginIcon,
  UberPayIcon,
  UberRewardsIcon
} from "./Icons";

const HeaderContainer = styled.header`
  background-color: black;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: ${props => props.theme.maxWidth};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  &:last-child {
    color: #2a56b1;
  }
`;

const BaseText = styled.p`
  font-size: 14px;
  font-weight: normal;
  color: white;
  padding: 5px 0;
  cursor: pointer;
  margin-right: 16px;
`;

const LogoText = styled(BaseText)`
  font-size: 22px;
`;

const ItemText = styled(BaseText)`
  font-weight: 200;
  transition: 0.1s;
  letter-spacing: 0.5px;
  line-height: 20px;
  &:hover {
    color: ${props => props.theme.blueColor};
  }
  margin: 0 4px;
  padding: 0 2px;
`;

const IconBoxText = styled.div`
  display: flex;
  align-items: center;
  &:hover path {
    fill: ${props => props.theme.blueColor};
  }
  &:hover p {
    color: ${props => props.theme.blueColor};
  }
  cursor: pointer;
`;

const IconWrapper = styled.div`
  margin: 0 4px;
`;

const SignUpBtn = styled.button`
  background-color: #276EF1;
  font-weight: 300;
  color: white;
  border: none;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  padding-top: 9px;
  padding-bottom: 9px;
  padding-right: 15px;
  padding-left: 15px;
  margin: 0px 8px;
  transition: 0.3s;
  &:hover {
    background-color: #2a57b1;
  }
`;

export default () => (
  <HeaderContainer>
    <Wrapper>
      <Column>
        <LogoText>Uber</LogoText>
        <ItemText>Our products</ItemText>
        <ItemText>Our company</ItemText>
        <ItemText>Safety</ItemText>
        <ItemText>Help</ItemText>
      </Column>
      <Column>
        <IconBoxText>
          <IconWrapper>
            <UberGlobeIcon />
          </IconWrapper>
          <ItemText>EN</ItemText>
        </IconBoxText>

        <IconBoxText>
          <IconWrapper>
            <UberRewardsIcon />
          </IconWrapper>
          <ItemText>Rewards</ItemText>
        </IconBoxText>

        <IconBoxText>
          <IconWrapper>
            <UberPayIcon />
          </IconWrapper>
          <ItemText>Pay</ItemText>
        </IconBoxText>

        <IconBoxText>
          <IconWrapper>
            <UberLoginIcon />
          </IconWrapper>
          <ItemText>Log in</ItemText>
        </IconBoxText>

        <SignUpBtn>Sign up</SignUpBtn>
      </Column>
    </Wrapper>
  </HeaderContainer>
);
