import React from "react";
import edit from "../edit.png";
import del from "../del.png";
import check from "../check.png";

export default ({ handleSort, list }) => (
  <>
    <button onClick={() => handleSort("index")} type="button" className="th">
      Index
    </button>
    <button onClick={() => handleSort("author")} type="button" className="th">
      {list === "books" ? "Author" : "Director"}
    </button>
    <button onClick={() => handleSort("title")} type="button" className="th">
      Title
    </button>

    <img src={edit} alt="edit pencil" height="16" />

    <img src={check} alt="check" height="16" />

    <img src={del} alt="delete button" height="16" />
  </>
);
