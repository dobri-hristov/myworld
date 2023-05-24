import React from "react";
import { Badge } from "react-bootstrap";
import { formatNumber } from "../../utils/common";

const SmallDataPiece = ({ classes, title, data, badge, value }) => {
  return (
    <h6 className={classes}>
      {title}:{" "}
      <Badge bg={badge}>
        {isNaN(data) ? "no information" : formatNumber(data)} {value}
      </Badge>
    </h6>
  );
};

export default SmallDataPiece;
