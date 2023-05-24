import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card, Col, Row } from "react-bootstrap";
import {
  generateColumns,
  getDefaultCountry,
  setDefaultCountry,
} from "../utils/countries";
import { paginationOptions } from "../utils/pagination";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { countriesActions } from "../store/slices/countries";
import { defaultSettings, getDefaultColumn } from "../utils/bootstrap-table";
import { COLUMN_NAMES } from "../utils/constants";
import Loading from "../Components/common/Loading";
import { useLoading } from "../hooks/useLoading";
import InputForm from "../Components/common/InputForm";

const Countries = ({ pageStyle }) => {
  const defaultCountry = getDefaultCountry();
  const [country, setCountry] = useState(defaultCountry);
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.allCountries);
  let navigate = useNavigate();
  const { loading } = useLoading();
  const defaultColumn = getDefaultColumn(COLUMN_NAMES.COUNTRIES);

  useEffect(() => {
    country
      ? dispatch(
          countriesActions.getCountriesByName({
            name: country,
          })
        )
      : dispatch(countriesActions.getAllCountries());
  }, [country]);

  const handleChange = (val) => {
    setDefaultCountry(val);
    setCountry(val);
  };

  return (
    <div className={`default-page bg-container ${pageStyle}`}>
      <Row className="m-3">
        <Col xs md={6} lg={4} className="mx-auto">
          <InputForm
            value={country}
            placeholder="Enter country name..."
            onChange={(e) => handleChange(e.target.value)}
          />
        </Col>
      </Row>
      <Card className="w-75 mx-auto mb-4">
        <Card.Body>
          {loading ? (
            <Loading />
          ) : (
            <BootstrapTable
              {...defaultSettings}
              keyField="uniqueKey"
              data={countries}
              columns={generateColumns(COLUMN_NAMES.COUNTRIES)}
              rowEvents={{
                onClick: (e, row) => {
                  navigate(`${row.name}`);
                },
              }}
              rowStyle={{ cursor: "pointer" }}
              sort={{
                dataField: defaultColumn?.field || "population",
                order: defaultColumn?.order || "desc",
              }}
              pagination={paginationFactory(paginationOptions(countries))}
            />
          )}
        </Card.Body>
      </Card>
      <div className="text-light text-center">
        <p className="m-0">
          * Population data vary and is approximately accurate
        </p>
        <p className="m-0">
          * We show the total number of the most densely populated cities
        </p>
      </div>
    </div>
  );
};

export default Countries;
