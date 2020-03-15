import React from "react";

export default ({ formRef, list, onSubmit, authorOrDirectorRef, titleRef }) => (
  <form ref={formRef} onSubmit={onSubmit}>
    <input
      type="text"
      placeholder={list === "books" ? "author" : "director"}
      ref={authorOrDirectorRef}
    />
    <input type="text" placeholder="title" ref={titleRef} />
    <button id="add" type="submit">
      Save
    </button>
  </form>
);
