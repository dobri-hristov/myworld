import React, { useState } from "react";
import CityPopover from "./CityPopover";
import { generateMessage } from "../utils/cities";

const CitiesContainer = ({ cities, totalCities, cityName }) => {
  const [btnId, setBtnId] = useState();
  return (
    <>
      {cities && cities.length > 0
        ? cities.slice(0, 30).map((country) =>
            country.cities
              .slice(0, totalCities < 50 ? country.cities.length : 3)
              .map((city, index) => (
                <span
                  key={city + index}
                  onClick={() => setBtnId(city + country.name)}
                >
                  <CityPopover
                    city={city}
                    country={country}
                    btnId={btnId}
                    setBtnId={setBtnId}
                  />
                </span>
              ))
          )
        : generateMessage(cityName)}
    </>
  );
};

export default CitiesContainer;
