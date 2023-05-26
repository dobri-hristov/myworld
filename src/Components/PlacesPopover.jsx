import React from "react";
import { Popover, Nav, Image } from "react-bootstrap";
import { generateWikiLink } from "../utils/common";
import { generateMessage } from "../utils/cities";
import { Link } from "react-router-dom";

const PlacesPopover = ({ places, isCountry, isCity, city, setCountry }) => {
  return (
    <Popover className="text-center m-auto bg-transparent border-0">
      <Popover.Body className="p-2 text-white-50">
        {places.length > 0 &&
          (isCountry
            ? places.slice(0, 10).map((el, index) => (
                <Nav.Link
                  as={Link}
                  to={`countries/${el.name}`}
                  onClick={() => setCountry("")}
                  className="link mb-3"
                  key={index}
                >
                  <h5>
                    {el.name}, {el.region}{" "}
                    <Image src={el.flag} width={30} height={20} />
                  </h5>
                </Nav.Link>
              ))
            : places.slice(0, 10).map((data) =>
                data.cities.map(
                  (el, index) =>
                    index < 1 && (
                      <Nav.Link
                        as={Link}
                        to={generateWikiLink(el)}
                        className="link mb-3"
                        key={index}
                      >
                        <h5>
                          {el}, {data.name}{" "}
                          <Image src={data.flag} width={30} height={20} />,{" "}
                          {data.region}
                        </h5>
                      </Nav.Link>
                    )
                )
              ))}
        {isCity && places.length === 0 && (
          <div className="empty">{generateMessage(city)}</div>
        )}
      </Popover.Body>
    </Popover>
  );
};

export default PlacesPopover;
