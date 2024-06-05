import React from "react";
import PropTypes from "prop-types";

const Column = ({ tasks }) => {
  return <div>Column</div>;
};

Column.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Column;
