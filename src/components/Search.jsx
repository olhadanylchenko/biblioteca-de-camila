import React from "react";
import search from "../search.png";

export default ({ searchOnChange }) => (
  <>
    <input
      id="search"
      type="text"
      className="search"
      onChange={searchOnChange}
    />
    <label htmlFor="search" className="searchLabel">
      <img src={search} alt="search" height="16" />
    </label>
  </>
);
