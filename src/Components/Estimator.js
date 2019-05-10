import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { GoogleApiWrapper } from "google-maps-react";
import _ from "lodash";

import { CrossIcon } from "./Icons";
import Loading from "./Loading";
import config from "../config";
import { geoCode, getUberEstimate } from "../mapHelpers";
import { debounce } from "./utils";

function forMatEstimateResult(prices) {
  const sorted = _.orderBy(prices, "low_estimate");
  return sorted;
}

class Estimator extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.fetchPlaces = debounce(this.fetchPlaces, 500);
  }

  initialState = {
    pickup: "",
    destination: "",
    loading: false,
    showRides: false,
    pickupOptions: [],
    destinationOptions: [],
    prices: [],
    priceErrorMessage: ""
  };

  state = {
    pickup: "",
    destination: "",
    loading: false
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }

  handleGeoSuccess = position => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.setState({
      lat: latitude,
      lng: longitude
    });

    this.loadMap(latitude, longitude);
  };

  handleGeoError = () => {
    console.log("No location, set to default.");
    this.loadMap(37.422, -122.0841);
  };

  async fetchPlaces(name, address) {
    if (address) {
      // TODO: Not supporting dynamic update yet
      // const result = await geoCode(address);
      // if (name === "pickup") {
      //   this.setState({
      //     pickupOptions: result
      //   });
      // } else if (name === "destination") {
      //   this.setState({
      //     destinationOptions: result
      //   });
      // }
    }
  }

  loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    if (!mapNode) {
      this.loadMap(lat, lng);
      return;
    }
    const mapConfig = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      minZoom: 8,
      zoom: 15
    };
    this.map = new maps.Map(mapNode, mapConfig);
  };

  onInputChange = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    });
  };

  getFareEstimate = async () => {
    this.setState({
      loading: true
    });

    const { pickup, destination } = this.state;
    const pickLoc = await geoCode(pickup);
    const destLoc = await geoCode(destination);
    const { lat: startLat, lng: startLng } = pickLoc[0];
    const { lat: endLat, lng: endLng } = destLoc[0];
    const result = await getUberEstimate(startLat, startLng, endLat, endLng);

    if (result.status === "OK") {
      const { prices } = result;
      const formattedPrices = forMatEstimateResult(prices);

      this.setState({
        prices: formattedPrices,
        loading: false,
        showRides: true
      });

      // Set Map Markers
      const { google } = this.props;
      const maps = google.maps;
      const pickUpMarkerOptions = {
        icon: {
          path: maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: 4
        },
        position: {
          lat: startLat,
          lng: startLng
        }
      };

      // Create pickup marker
      this.pickUpMarker = new maps.Marker(pickUpMarkerOptions);
      this.pickUpMarker.setMap(this.map);

      const destMarkerOptions = {
        icon: {
          path: maps.SymbolPath.CIRCLE,
          scale: 7
        },
        position: {
          lat: endLat,
          lng: endLng
        }
      }

      // Create destination marker
      this.destMarker = new maps.Marker(destMarkerOptions);
      this.destMarker.setMap(this.map);

      // Expand Map
      const bounds = new maps.LatLngBounds();

      bounds.extend({ lat: startLat, lng: startLng });
      bounds.extend({ lat: endLat, lng: endLng });
      this.map.fitBounds(bounds);

      // Set Direction Path
      const directionOptions = {
        polylineOptions: {
          strokeColor: "#000"
        },
        suppressMarkers: true
      };

      this.directions = new google.maps.DirectionsRenderer(directionOptions);
      const directionsService = new google.maps.DirectionsService();
      const to = new google.maps.LatLng(startLat, startLng);
      const from = new google.maps.LatLng(endLat, endLng);
      const directionsOptions = {
        destination: to,
        origin: from,
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(directionsOptions, this.handleRouteRequest);
    } else {
      const { message } = result;

      this.setState({
        loading: false,
        showRides: false,
        prices: [],
        priceErrorMessage: message
      });
    }
  };

  handleRouteRequest = (result, status) => {
    if (status === "OK") {
      this.directions.setDirections(result);
      this.directions.setMap(this.map);
    } else {
      console.log.error("There is no route there.");
    }
  }

  onReset = () => {
    this.setState(this.initialState);

    // Reset markers and directions on map
    this.pickUpMarker.setMap(null);
    this.destMarker.setMap(null);
    this.directions.setMap(null);
  };

  render() {
    const { prices } = this.state;

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
                  list="pickup"
                  placeholder="Enter pickup location"
                  name="pickup"
                  value={this.state.pickup}
                  onChange={this.onInputChange}
                  readOnly={this.state.showRides}
                />
                {/* <datalist id="pickup">
                  {pickupOptions &&
                    pickupOptions.map((opt, index) => (
                      <option key={index} value={opt.address} data={opt} />
                    ))}
                </datalist> */}
                <Input
                  list="destination"
                  placeholder="Enter destination"
                  name="destination"
                  value={this.state.destination}
                  onChange={this.onInputChange}
                  readOnly={this.state.showRides}
                />
                {/* <datalist id="destination">
                  {destinationOptions &&
                    destinationOptions.map((opt, index) => (
                      <option key={index} value={opt.address} data={opt} />
                    ))}
                </datalist> */}
              </InputBox>
              {this.state.pickup.length !== 0 &&
                this.state.destination.length !== 0 &&
                !this.state.loading &&
                !this.state.showRides &&
                !this.state.priceErrorMessage && (
                  <EstimateBtn onClick={this.getFareEstimate}>
                    Calculate fare estimation
                  </EstimateBtn>
                )}
              {this.state.loading && (
                <LoadingBox>
                  <Loading />
                </LoadingBox>
              )}
              {this.state.priceErrorMessage && (
                <EstimateResultBox>
                  <EstimateResultTitleBox>
                    <EstimateResultTitleText>Error</EstimateResultTitleText>
                    <CrossDiv onClick={this.onReset}>
                      <CrossIcon />
                    </CrossDiv>
                  </EstimateResultTitleBox>
                  <DistanceErrorText>
                    {this.state.priceErrorMessage}
                  </DistanceErrorText>
                </EstimateResultBox>
              )}
              {this.state.showRides && (
                <EstimateResultBox>
                  <EstimateResultTitleBox>
                    <EstimateResultTitleText>All rides</EstimateResultTitleText>
                    <CrossDiv onClick={this.onReset}>
                      <CrossIcon />
                    </CrossDiv>
                  </EstimateResultTitleBox>
                  <ResultRidesBox>
                    {prices &&
                      prices.map(price => {
                        const low = price.low_estimate;
                        const estimate = low
                          ? `$${low
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
                          : price.estimate;

                        return (
                          <RideItem key={price.display_name}>
                            <h1>{price.display_name}</h1>
                            <h1>{estimate}</h1>
                          </RideItem>
                        );
                      })}
                    <WarningP>
                      Sample rider prices are estimates only and do not reflect
                      variations due to discounts, traffic delays, or other
                      factors. Flat rates and minimum fees may apply. Actual
                      prices may vary.
                    </WarningP>
                  </ResultRidesBox>
                </EstimateResultBox>
              )}
            </div>
            <div>
              <Map ref={this.mapRef} />
            </div>
          </Wrapper>
        </Content>
      </ContentWrapper>
    );
  }
}

export default GoogleApiWrapper({ apiKey: config.GOOGLE_MAP_API_KEY })(
  Estimator
);

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
  min-height: 50vh;
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

const EstimateResultBox = styled.div`
  box-sizing: border-box;
  background-color: #f6f6f6;
  display: block;
  line-height: 24px;
`;

const EstimateResultTitleBox = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid rgb(222, 223, 225);
  padding-top: 9px;
  margin: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EstimateResultTitleText = styled.p`
  padding: 18px 0px;
  line-height: 19px;
  color: #276ef1;
  white-space: nowrap;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.8px;
`;

const ResultRidesBox = styled.div`
  padding: 12px 0px 0px;
  box-sizing: border-box;
`;

const RideItem = styled.div`
  display: flex;
  padding: 12px 21px;
  line-height: 19px;
  align-items: center;
  justify-content: space-between;
`;

const WarningP = styled.p`
  line-height: 20px;
  padding: 20px 21px 25px;
  font-size: 12px;
  color: #333333;
`;

const LoadingBox = styled.div`
  padding: 12px 21px;
  height: 50px;
  display: flex;
  justify-content: center;
`;

const CrossDiv = styled.div`
  cursor: pointer;
  &:hover path {
    fill: ${props => props.theme.blueColor};
  }
`;

const Map = styled.div`
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const DistanceErrorText = styled.h1`
  padding: 15px 0;
  color: red;
  font-size: 22px;
  margin: 0px 20px;
`;
