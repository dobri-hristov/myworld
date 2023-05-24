import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CURRENT_PATH } from "../utils/constants";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { countriesActions } from "../store/slices/countries";
import { citiesActions } from "../store/slices/cities";
import PlacesPopover from "../Components/PlacesPopover";
import InputForm from "./common/InputForm";
import Loading from "../Components/common/Loading";
import { useLoading } from "../hooks/useLoading";

const Navigation = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.allCountries);
  const cities = useSelector((state) => state.cities);
  const { loading } = useLoading();

  useEffect(() => {
    if (country) {
      setCity("");
      dispatch(
        countriesActions.getCountriesByName({
          name: country,
        })
      );
    }
  }, [country]);

  useEffect(() => {
    if (city) {
      setCountry("");
      dispatch(
        citiesActions.getCitiesByRequest({
          city,
        })
      );
    }
  }, [city]);

  return (
    <Navbar className="position-absolute w-100 m-0" variant="dark">
      <Row className="w-100 mx-auto">
        {CURRENT_PATH === "/" && (
          <Col lg={3} md={{ order: 1, span: 4 }} xs={{ order: 2 }} className="p-1">
            <InputForm
              value={country}
              placeholder="Quick search, enter country name..."
              onChange={(e) => setCountry(e.target.value)}
              classes="light-shadow text-primary bg-transparent"
            />
            {countries.length > 0 &&
              country &&
              (!loading ? (
                <PlacesPopover isCountry places={countries} />
              ) : (
                <Loading />
              ))}
          </Col>
        )}
        <Col md={{ order: 2 }} xs={{ order: 1 }}>
          <Nav className="justify-content-center">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/countries">Countries</Nav.Link>
            <Nav.Link href="/cities">Cities</Nav.Link>
          </Nav>
        </Col>
        {CURRENT_PATH === "/" && (
          <Col lg={3} md={4} xs={{ order: 3 }} className="p-1">
            <InputForm
              value={city}
              placeholder="Quick search, enter city name..."
              onChange={(e) => setCity(e.target.value)}
              classes="light-shadow text-primary bg-transparent"
            />
            {city &&
              (!loading ? (
                <PlacesPopover places={cities} isCity city={city} />
              ) : (
                <Loading />
              ))}
          </Col>
        )}
      </Row>
    </Navbar>
  );
};

export default Navigation;
