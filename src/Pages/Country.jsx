import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { countriesActions } from "../store/slices/countries";
import { citiesActions } from "../store/slices/cities";
import { Row, Col, Button, Container, Image } from "react-bootstrap";
import SmallDataPiece from "../Components/common/SmallDataPiece";
import ButtonWithLink from "../Components/common/ButtonWithLink";
import CustomMap from "../Components/CustomMap";
import CustomModal from "../Components/CustomModal";
import CustomCard from "../Components/CustomCard";
import { GrMap } from "react-icons/gr";
import { SiGooglemaps } from "react-icons/si";
import { SiOpenstreetmap } from "react-icons/si";
import { IoPeopleSharp } from "react-icons/io5";
import { btnWithLinkStyle } from "../utils/countries";
import { SYMBOLS } from "../utils/constants";
import notAvaliable from "../assets/images/notAvaliable.jpg";
import { isEmpty } from "lodash";

const Country = ({ pageStyle }) => {
  const { country } = useParams();
  const exactCountry = useSelector((state) => state.countries.country.data);
  const countryInfo = useSelector((state) => state.countries.country.info);
  const cityInfo = useSelector((state) => state.cities.city.info);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispatch(
      countriesActions.getExactCountryByName({
        name: country,
      })
    );
    dispatch(
      countriesActions.getCountryInfo({
        name: country,
      })
    );
  }, []);

  useEffect(() => {
    exactCountry.capital &&
      dispatch(
        citiesActions.getCityInfo({
          name: exactCountry.capital,
        })
      );
  }, [exactCountry.capital]);

  return (
    <>
      <div className={`country-page bg-container dark-shadow ${pageStyle}`}>
        {!isEmpty(exactCountry) && (
          <Row className="align-items-center m-2">
            <Col className="text-center m-2">
              <Image src={exactCountry.flag || notAvaliable} width={300} />
            </Col>
            <Col className="text-center text-dark m-2">
              <h1>{exactCountry.name}</h1>
              <h3>{exactCountry.region}</h3>
              <h4>{exactCountry.subregion}</h4>
              <SmallDataPiece
                classes={"mt-3"}
                title="Population"
                value={<IoPeopleSharp />}
                data={exactCountry.population}
              />
              <SmallDataPiece
                title="Area"
                value={SYMBOLS.AREA}
                data={exactCountry.area}
                badge="success"
              />
              <SmallDataPiece
                title="Cities"
                data={exactCountry.cities && exactCountry.cities?.length}
                badge="secondary"
              />
              <ButtonWithLink
                link={exactCountry.maps?.googleMaps}
                popoverText={`see ${exactCountry.name} on Google Maps`}
                popoverPosition={"left"}
                style={btnWithLinkStyle}
                variant={"info"}
                withPopover={true}
              >
                <SiGooglemaps size={20} />
              </ButtonWithLink>
              <ButtonWithLink
                link={exactCountry.maps?.openStreetMaps}
                popoverText={`see ${exactCountry.name} on OpenStreetMap`}
                popoverPosition={"right"}
                style={btnWithLinkStyle}
                variant={"info"}
                withPopover={true}
              >
                <SiOpenstreetmap size={20} />
              </ButtonWithLink>
            </Col>
            <Col className="text-center m-2">
              <Image
                src={exactCountry.coatOfArms || notAvaliable}
                width={250}
                height={250}
              />
            </Col>
          </Row>
        ) }
      </div>
      {countryInfo && (
        <div style={{ marginTop: "-5.6vh" }}>
          <CustomCard
            place={country}
            text={countryInfo.extract}
            link={countryInfo.content_urls?.desktop?.page}
          />
        </div>
      )}
      {exactCountry.capital && (
        <div className="mt-5 mb-5">
          <CustomCard
            place={exactCountry.capital}
            text={cityInfo.extract}
            link={cityInfo.content_urls?.desktop?.page}
          >
            <Container className="mb-2">
              <Image src={cityInfo.originalimage?.source} fluid />
            </Container>
            {exactCountry.capitalInfo && (
              <Button
                title={`view ${exactCountry.capital} on map`}
                variant="warning"
                onClick={() => setModalShow(true)}
                className="m-2"
              >
                <GrMap size={20} />
              </Button>
            )}
          </CustomCard>
          <CustomModal
            title={`${exactCountry.capital} on OpenStreetMap`}
            show={modalShow}
            hide={() => setModalShow(false)}
          >
            <CustomMap
              link={exactCountry.maps.openStreetMaps}
              latlng={exactCountry.capitalInfo}
              capital={exactCountry.capital}
              country={exactCountry.name}
              zoom={11}
            />
          </CustomModal>
        </div>
      )}
    </>
  );
};

export default Country;
