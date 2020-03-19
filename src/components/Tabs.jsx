import React from "react";

export default ({ toggleTab }) => (
  <nav class="tabs">
    <ul>
      <li>
        <button onClick={() => toggleTab("books")} type="button" class="tab">
          Books
        </button>
      </li>
      <li>
        <button onClick={() => toggleTab("movies")} type="button" class="tab">
          Movies
        </button>
      </li>
    </ul>
  </nav>
);
