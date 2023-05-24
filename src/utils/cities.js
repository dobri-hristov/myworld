import { BsEmojiFrown, BsEmojiSmile } from "react-icons/bs";

const nameFilter = (name, value) => {
  return (
    name.startsWith(value) ||
    name.toLowerCase().startsWith(value) ||
    name.toUpperCase().startsWith(value)
  );
};

export const filterCities = (data, city, country) => {
  return data
    .map((onePiece) => ({
      ...onePiece,
      cities: onePiece.cities.filter((name) => nameFilter(name, city)),
    }))
    .filter((onePiece) => onePiece.cities.length > 0)
    .filter((onePiece) =>
      country ? nameFilter(onePiece.name, country) : onePiece
    );
};

export const getAllCities = (data) => {
  let totalCities = 0;
  let leftCities = 0;

  data.length > 0 &&
    data.map(
      (country, index) => (
        (totalCities += country.cities.length),
        (leftCities +=
          index >= 30
            ? country.cities.length
            : country.cities.length >= 3
            ? country.cities.length - 3
            : 0)
      )
    );

  return { totalCities, leftCities };
};

export const btnWithLinkStyle = "p-3 pb-1 pt-1 m-1 mt-2 mb-0";

export const getDefaultCityAndCountry = () => {
  const defaultSelectedColumn = JSON.parse(
    localStorage.getItem(`selectedCityAndCountry`)
  );
  return defaultSelectedColumn || [];
};

export const setDefaultCityAndCountry = (city, country) => {
  let defaultSelectedColumn =
    JSON.parse(localStorage.getItem(`selectedCityAndCountry`)) || [];

  defaultSelectedColumn &&
    (defaultSelectedColumn = { city: city, country: country });

  localStorage.setItem(
    `selectedCityAndCountry`,
    JSON.stringify(defaultSelectedColumn)
  );
};

export const generateMessage = (name) => {
  return (
    <div>
      <h5>
        {name ? (
          <span>
            Sorry, we can't find city with name
            <span className="text-danger fw-bold"> {name}</span>...
          </span>
        ) : (
          "Welcome"
        )}
      </h5>
      {name ? <BsEmojiFrown size={30} /> : <BsEmojiSmile size={30} />}
    </div>
  );
};

export const popoverPlacement = (event) => {
  return window.innerHeight / 2 > event.clientY ? "bottom" : "top";
};
