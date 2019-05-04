import React from "react";
import styled from "styled-components";

const ContentWrapper = styled.div`
  width: 100%;
  padding-right: 40px;
  padding-left: 40px;
  padding-top: 64px;
  padding-bottom: 64px;
  position: relative;
`;

const Content = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: grid;
  grid-gap: 70px;
  grid-template-columns: 1fr 2fr;
`;

const TitleText = styled.h2`
  line-height: 40px;
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 13px;
`;

const InputBox = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-auto-rows: 45px;
  margin-bottom: 14px;
  position: relative;
`;

const Dots = styled.div`
  box-sizing: border-box;
  left: 22px;
  bottom: 29px;
  top: 29px;
  z-index: 1;
  background-color: #000000;
  position: absolute;
  width: 1px;
  display: block;
`;

const DotFirst = styled.div`
  background-color: #f6f6f6;
  border: 1px solid #000000;
  bottom: -10px;
  height: 7px;
  width: 7px;
  left: -3px;
  position: absolute;
  content: "";
`;

const DotSecond = styled.div`
  background-color: #f6f6f6;
  border: 1px solid #000000;
  border-radius: 50%;
  top: -10px;
  height: 8px;
  width: 8px;
  left: -3px;
  position: absolute;
  content: "";
`;

const Input = styled.input`
  font-size: 16px;
  line-height: 24px;
  padding: 11px 0;
  padding-left: 41px;
  padding-right: 33px;
  background-color: #f6f6f6;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
  outline: none;
  color: black;
  border: none;
  overflow: hidden;
`;

const EstimateBtn = styled.button`
  background-color: #276ef1;
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
  transition: 0.3s;
  height: 52px;
  letter-spacing: 1px;
  &:hover {
    background-color: #2a57b1;
  }
`;

class Estimator extends React.Component {
  state = {
    pickups: "",
    destinations: ""
  };

  onInputChange = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    });
  };

  getFareEstimate = () => {
    const { pickups, destinations } = this.state;

    console.log(pickups, destinations);
  };

  render() {
    return (
      <ContentWrapper>
        <Content>
          <Wrapper>
            <div>
              <TitleText>
                Uber price <br /> estimator
              </TitleText>
              <InputBox>
                <Dots>
                  <DotFirst />
                  <DotSecond />
                </Dots>
                <Input
                  list="pickups"
                  placeholder="Enter pickup location"
                  name="pickups"
                  onChange={this.onInputChange}
                />
                <datalist id="pickups">
                  <option value="Location 1" />
                  <option value="Location 2" />
                  <option value="Location 3" />
                  <option value="Location 4" />
                  <option value="Location 5" />
                </datalist>
                <Input
                  list="destinations"
                  placeholder="Enter destination"
                  name="destinations"
                  onChange={this.onInputChange}
                />
                <datalist id="destinations">
                  <option value="Location 1" />
                  <option value="Location 2" />
                  <option value="Location 3" />
                  <option value="Location 4" />
                  <option value="Location 5" />
                </datalist>
              </InputBox>
              {this.state.pickups.length !== 0 && this.state.destinations.length !== 0 && (
                <EstimateBtn onClick={this.getFareEstimate}>
                  Calculate fare estimation
                </EstimateBtn>
              )}
            </div>
            <div>
              <h1>Map Goes here</h1>
            </div>
          </Wrapper>
        </Content>
      </ContentWrapper>
    );
  }
}

export default Estimator;
