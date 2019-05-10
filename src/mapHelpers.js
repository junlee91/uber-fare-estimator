import axios from "axios";
import config from "./config";

const MAPS_KEY = config.GOOGLE_MAP_API_KEY;
const UBER_KEY = config.UBER_TOKEN;

export const geoCode = async address => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);

  if (!data.error_message) {
    const { results } = data;
    return results.map(result => {
      return {
        address: result.formatted_address,
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng
      };
    });
  } else {
    console.error(data.error_message);
    return false;
  }
};

export const reverseGeoCode = async (lat, lng) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);

  if (!data.error_message) {
    const { results } = data;
    const firstPlace = results[0];

    if (!firstPlace) {
      return false;
    }

    return firstPlace.formatted_address;
  } else {
    console.error(data.error_message);

    return false;
  }
};

export const getUberEstimate = async (
  start_lat,
  start_lng,
  end_lat,
  end_lng
) => {
  const URL = `/estimates/price?start_latitude=${start_lat}&start_longitude=${start_lng}&end_latitude=${end_lat}&end_longitude=${end_lng}&seat_count=1`;
  const result = fetch(URL, {
    method: "GET",
    headers: {
      Authorization: `Token ${UBER_KEY}`,
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(json => {
      if (json.prices) {
        return {
          status: "OK",
          prices: json.prices
        };
      }
      return {
        status: "Fail",
        message: json.message
      };
    })
    .catch(msg => console.log(msg));

  return result;
};
