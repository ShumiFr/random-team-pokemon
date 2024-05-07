import React from "react";

const ErrorMessage = ({ message }) => message && <p className="error-message">{message}</p>;

export default ErrorMessage;
