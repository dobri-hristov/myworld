import React, { useState, useRef } from "react";
import { Button, Popover, Overlay, Image, Row, Col } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsWikipedia, BsInfoCircle } from "react-icons/bs";
import { GrMap } from "react-icons/gr";
import ButtonWithLink from "./common/ButtonWithLink";
import { btnWithLinkStyle, popoverPlacement } from "../utils/cities";
import { generateWikiLink, generateGoogleMapsLink } from "../utils/common";

function CityPopover({ city, country, btnId, setBtnId }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState();
  const [placement, setPlacement] = useState();
  const ref = useRef(null);
  const { name, flag, region } = country;
  const currentId = city + name;

  const handleClick = (event) => {
    setTarget(event.target);
    setShow(!show);
    setBtnId(ref.current.id);
    setPlacement(popoverPlacement(event));
  };

  return (
    <>
      <Button
        ref={ref}
        onClick={handleClick}
        variant="info"
        className="m-2"
        id={city}
      >
        {city}, {name} <Image src={flag} width={30} height={20} />
      </Button>

      <Overlay
        target={target || ""}
        show={show && currentId === btnId}
        placement={placement}
        transition={true}
      >
        <Popover>
          <Popover.Header as="h3">
            <Row>
              <Col>{city}</Col>
              <Col className="text-end">
                <AiOutlineCloseCircle
                  size={20}
                  cursor="pointer"
                  color="red"
                  onClick={() => setShow(false)}
                />
              </Col>
            </Row>
          </Popover.Header>
          <Popover.Body className="text-center">
            <div>
              <b>{city}</b> is city located in{" "}
              <b>
                {name}, {region}
              </b>
            </div>
            <div className="mt-1">
              <ButtonWithLink
                link={generateWikiLink(city)}
                title={`learn more about ${city}`}
                variant={"info"}
                style={btnWithLinkStyle}
              >
                <BsWikipedia />
              </ButtonWithLink>
              <ButtonWithLink
                link={generateGoogleMapsLink(city, name)}
                title={`see ${city} on Google Maps`}
                variant={"danger"}
                style={btnWithLinkStyle}
              >
                <GrMap />
              </ButtonWithLink>
              <ButtonWithLink
                link={`/countries/${name}`}
                title={`learn more about ${name}`}
                variant={"success"}
                style={btnWithLinkStyle}
              >
                <BsInfoCircle size={18} />
              </ButtonWithLink>
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
}

export default CityPopover;
