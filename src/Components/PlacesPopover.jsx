import React from "react";
import { Popover, Nav, Image } from "react-bootstrap";
import { generateWikiLink } from "../utils/common";
import { generateMessage } from "../utils/cities";

const PlacesPopover = ({ places, isCountry, isCity, city }) => {
  return (
    <Popover className="text-center m-auto bg-transparent border-0">
      <Popover.Body className="p-2 text-white-50">
        {places.length > 0 &&
          (isCountry
            ? places.slice(0, 10).map((el, index) => (
                <Nav.Link
                  href={`countries/${el.name}`}
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
                        href={generateWikiLink(el)}
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
