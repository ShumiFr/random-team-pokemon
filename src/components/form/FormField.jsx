import React from "react";

const FormField = ({ type, value, onChange, label }) => (
  <div className="field">
    <label className="field_label">{label}</label>
    <input className="field_input" type={type} value={value} onChange={onChange} />
  </div>
);

export default FormField;
