import React, { useState, useEffect } from "react";
import {
  getAllCities,
  setDefaultCityAndCountry,
  getDefaultCityAndCountry,
} from "../utils/cities";
import { Button, Row, Col, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { citiesActions } from "../store/slices/cities";
import { BsEmojiSmile } from "react-icons/bs";
import { GiModernCity } from "react-icons/gi";
import Loading from "../Components/common/Loading";
import { useLoading } from "../hooks/useLoading";
import { formatNumber } from "../utils/common";
import CitiesContainer from "../Components/CitiesContainer";
import InputForm from "../Components/common/InputForm";
import { generateMessage } from "../utils/cities";

const Cities = ({ pageStyle }) => {
  const dispatch = useDispatch();
  const defaultData = getDefaultCityAndCountry();
  const [disabledCountry, setDisabledCountry] = useState(
    defaultData.city ? false : true
  );
  const [city, setCity] = useState(defaultData.city);
  const [country, setCountry] = useState(defaultData.country);
  const cities = useSelector((state) => state.cities);
  const { loading } = useLoading();
  const { leftCities, totalCities } = getAllCities(cities);

  useEffect(() => {
    setDefaultCityAndCountry(city, country);
    dispatch(
      citiesActions.getCitiesByRequest({
        city,
        country,
      })
    );
  }, [city, country]);

  const handleCity = (city) => {
    setCity(city);
    setDisabledCountry(!city);
  };

  return (
    <div className={`default-page bg-container text-center ${pageStyle}`}>
      <Row className="m-3 mx-auto justify-content-md-center align-items-center">
        <Col xs lg={3}>
          <InputForm
            value={city}
            placeholder="Enter city name..."
            onChange={(e) => handleCity(e.target.value)}
          />
        </Col>
        <Col md="auto">
          <Badge bg="info" className="m-2">
            {formatNumber(totalCities)} <GiModernCity size={16} />
          </Badge>
        </Col>
        <Col xs lg={3}>
          <InputForm
            value={country}
            disabled={disabledCountry}
            placeholder={
              disabledCountry
                ? "First enter city name!"
                : "Enter country name..."
            }
            onChange={(e) => setCountry(e.target.value)}
          />
        </Col>
      </Row>
      <div className="">
        {loading ? (
          <Loading />
        ) : city ? (
          <CitiesContainer
            cities={cities}
            totalCities={totalCities}
            cityName={city}
          />
        ) : (
          generateMessage()
        )}
        {cities.length > 0 && totalCities > 50 && (
          <Button variant={"info"} disabled>
            {formatNumber(leftCities)} more cities... <BsEmojiSmile size={25} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Cities;
