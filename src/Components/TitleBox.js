import React from "react";
import styled from "styled-components";

const ContentWrapper = styled.div`
  width: 100%;
  padding-top: 64px;
  padding-bottom: 64px;
  padding-right: 40px;
  padding-left: 40px;
  position: relative;
`;

const Content = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const TopContent = styled.div`
  box-sizing: border-box;
  width: 70%;
  display: box;
`;

const TitleText = styled.h1`
  line-height: 56px;
  font-size: 52px;
  font-weight: bold;
  padding: 5px 0;
`;

const SubTitleText = styled.p`
  display: block;
  font-weight: 300;
  line-height: 24px;
  font-size: 16px;
  margin: 0 2px;
  padding: 5px 0;
`;

export default () => (
  <ContentWrapper>
    <Content>
      <TopContent>
        <TitleText>How much does a ride with Uber cost?</TitleText>
      </TopContent>
      <TopContent>
        <SubTitleText>
          Plan your next trip with the price estimator. Know before you go, so
          there’s no math and no surprises.
        </SubTitleText>
      </TopContent>
    </Content>
  </ContentWrapper>
);
