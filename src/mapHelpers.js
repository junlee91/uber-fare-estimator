import axios from "axios";
import config from "./config";

const MAPS_KEY = config.GOOGLE_MAP_API_KEY;

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
