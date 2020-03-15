import React from "react";

export default ({ toggleTab }) => (
  <div class="tabs">
    <button onClick={() => toggleTab("books")} type="button" class="tab">
      Books
    </button>
    <button onClick={() => toggleTab("movies")} type="button" class="tab">
      Movies
    </button>
  </div>
);
