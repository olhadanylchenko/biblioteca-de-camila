import React from "react";
import search from "../search.png";

export default ({ searchOnChange }) => (
  <div className="search">
    <input
      id="search"
      type="text"
      className="searchInput"
      onChange={searchOnChange}
    />
    <label htmlFor="search" className="searchLabel">
      <img src={search} alt="search" height="16" />
    </label>
  </div>
);
