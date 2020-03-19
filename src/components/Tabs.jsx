import React from "react";

export default ({ toggleTab, list }) => (
  <nav>
    <ul className="tabs">
      <li>
        <button
          onClick={() => toggleTab("books")}
          type="button"
          className={`tab ${list === "books" ? "active" : ""}`}
        >
          Books
        </button>
      </li>
      <li>
        <button
          onClick={() => toggleTab("movies")}
          type="button"
          className={`tab ${list === "movies" ? "active" : ""}`}
        >
          Movies
        </button>
      </li>
    </ul>
  </nav>
);
