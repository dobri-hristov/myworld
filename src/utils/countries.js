import { Badge, Image } from "react-bootstrap";
import { formatNumber } from "./common";
import { setDefaultColumn } from "../utils/bootstrap-table";
import { SYMBOLS } from "./constants";
import { IoPeopleSharp } from "react-icons/io5";
import notAvaliable from "../assets/images/notAvaliable.jpg";

export const mergeCountriesData = (countries, cities) => {
  return countries.map((country) => ({
    area: country.area,
    population: country.population,
    region: country.region,
    subregion: country.subregion,
    name: country.name.common,
    capital: country.capital,
    languages: country.languages,
    flag: country.flags.svg,
    coatOfArms: country.coatOfArms.svg,
    maps: country.maps,
    latlng: country.latlng,
    capitalInfo: country.capitalInfo.latlng,
    cities:
      cities.data.find((city) => city.country === country.name.common)
        ?.cities || [],
    uniqueKey: `${country.name.common}-${country.capital}`,
  }));
};

const formatCities = (cities) => {
  return (
    <Badge bg="secondary">
      {cities && cities.length > 0
        ? formatNumber(cities.length)
        : "no information"}
    </Badge>
  );
};

const formatLanguages = (data) => {
  const languages = data ? Object.values(data) : [];
  return languages.map((x, i) => <li key={i}>{x}</li>);
};

const formatPopulation = (cell) => {
  return (
    <Badge bg="primary" className="text-wrap">
      {formatNumber(cell)} <IoPeopleSharp />
    </Badge>
  );
};

const formatArea = (cell) => {
  return (
    <Badge bg="success" className="text-wrap">
      {formatNumber(cell)} {SYMBOLS.AREA}
    </Badge>
  );
};

const formatCapitalAndSubregion = (cell) => {
  return cell ? cell : <Badge bg="danger">none</Badge>;
};

const centerColumn = { textAlign: "center" };

export const generateColumns = (title) => {
  return [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "capital",
      text: "Capital",
      sort: true,
      formatter: formatCapitalAndSubregion,
    },
    {
      dataField: "region",
      text: "Region",
      sort: true,
    },
    {
      dataField: "subregion",
      text: "Subregion",
      sort: true,
      formatter: formatCapitalAndSubregion,
    },
    {
      dataField: "cities",
      text: "Cities",
      formatter: formatCities,
      headerStyle: {
        ...centerColumn,
      },
      style: {
        ...centerColumn,
      },
    },
    {
      dataField: "languages",
      text: "Languages",
      formatter: formatLanguages,
    },
    {
      dataField: "area",
      text: "Area",
      sort: true,
      formatter: formatArea,
      headerStyle: {
        ...centerColumn,
      },
      style: {
        ...centerColumn,
      },
    },
    {
      dataField: "population",
      text: "Population",
      sort: true,
      formatter: formatPopulation,
      headerStyle: {
        ...centerColumn,
      },
      style: {
        ...centerColumn,
      },
    },
    {
      dataField: "flag",
      text: "Flag",
      formatter: (flag) => <Image src={flag} width={50} className="border" />,
      headerStyle: {
        ...centerColumn,
      },
      style: {
        ...centerColumn,
      },
    },
    {
      dataField: "coatOfArms",
      text: "Coat Of Arms",
      formatter: (flag) => (
        <Image src={flag || notAvaliable} width={40} height={40} />
      ),
      headerStyle: {
        ...centerColumn,
      },
      style: {
        ...centerColumn,
      },
    },
  ].map((column) => ({
    ...column,
    onSort: (field, order) => {
      const selectedColumn = { field, order };
      setDefaultColumn(title, selectedColumn);
    },
  }));
};

export const btnWithLinkStyle = "p-4 pt-1 pb-1 m-1";

export const getDefaultCountry = () => {
  const defaultCountry = JSON.parse(localStorage.getItem(`selectedCountry`));
  return defaultCountry || "";
};

export const setDefaultCountry = (country) => {
  localStorage.setItem(`selectedCountry`, JSON.stringify(country));
};
