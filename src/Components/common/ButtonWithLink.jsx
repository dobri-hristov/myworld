import React, { useState, useRef } from "react";
import { Button, Popover, Overlay } from "react-bootstrap";
import { Link } from "react-router-dom";

const ButtonWithLink = ({
  link,
  popoverPosition,
  variant,
  popoverText,
  children,
  style,
  title,
  withPopover,
}) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setTarget(event.target);
    setShow(!show);
  };

  return (
    <Link to={link}>
      <Button
        variant={variant}
        className={style}
        ref={ref}
        onMouseEnter={handleClick}
        onMouseLeave={() => setShow(false)}
        title={title}
      >
        {children}
      </Button>
      <Overlay
        show={show && withPopover}
        placement={popoverPosition}
        target={target}
        rootClose={true}
      >
        <Popover className="dark-shadow">
          <Popover.Body className="p-2">
            <b>{popoverText}</b>
          </Popover.Body>
        </Popover>
      </Overlay>
    </Link>
  );
};

export default ButtonWithLink;
