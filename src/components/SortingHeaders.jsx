import React from "react";
import edit from "../edit.png";
import del from "../del.png";
import check from "../check.png";

export default ({ handleSort, list }) => (
  <header className="table-header">
    <button
      ariaLabel="sort by index"
      onClick={() => handleSort("index")}
      type="button"
      className="th"
    >
      Index
    </button>
    <button
      ariaLabel={`sort by ${list === "books" ? "author" : "director"}`}
      onClick={() => handleSort("author")}
      type="button"
      className="th"
    >
      {list === "books" ? "Author" : "Director"}
    </button>
    <button
      ariaLabel="sort by title"
      onClick={() => handleSort("title")}
      type="button"
      className="th"
    >
      Title
    </button>

    <img src={edit} alt="edit pencil" height="16" />

    <img src={check} alt="check" height="16" />

    <img src={del} alt="delete button" height="16" />
  </header>
);
