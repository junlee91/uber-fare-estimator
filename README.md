# Uber Fare Estimator
Cloning [Uber Estimate](https://www.uber.com/us/en/price-estimate/) with React, [Uber Price Estimate API](https://developer.uber.com/docs/riders/references/api/v1.2/estimates-price-get), and [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)

![Screenshot](src/images/screenshot.png)

### Get API Keys for Google and Uber
#### Uber (_deprecated_)
- ~Create new project from [Uber Developer Dashboard](https://developer.uber.com/dashboard/) and get Server Token.~
- ~Set this key to `UBER_TOKEN` in source files.~
#### Google
- Create new project from [Google Cloud Platform](https://console.cloud.google.com) and enable following APIs
  - Maps JavaScript API
  - Geocoding API
  - Directions API
- Create credentials and set this key to `GOOGLE_MAP_API_KEY` in source files.

### Start Development
```
yarn
yarn start
```

### Limitations
- Uber Fare Estimate API does not reflect real-time availability of the products.
- No location suggestions when entering pickup & destinations.
- Sadly, the page is not responsive.
- Only support North America and USD.
