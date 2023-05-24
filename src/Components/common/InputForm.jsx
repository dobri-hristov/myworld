import React from "react";
import { Form } from "react-bootstrap";

const InputForm = ({ value, disabled, placeholder, classes, onChange }) => {
  return (
    <Form>
      <Form.Control
        value={value}
        type="search"
        disabled={disabled}
        placeholder={placeholder}
        className={`rounded-pill text-center ${classes}`}
        aria-label="Search"
        maxLength="15"
        onChange={onChange}
      />
    </Form>
  );
};

export default InputForm;
