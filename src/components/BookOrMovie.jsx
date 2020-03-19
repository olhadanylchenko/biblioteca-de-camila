import React from "react";
import edit from "../edit.png";
import del from "../del.png";
import check from "../check.png";
import Edit from "./Edit";

const BookOrMovie = ({
  book,
  onChange,
  onClickEdit,
  onCheck,
  onDelete,
  index,
  beingEdited
}) => (
  <li className="table-row" key={book.id}>
    <div className="content">{book.id}</div>
    {beingEdited === index ? (
      <Edit book={book} onChange={onChange} />
    ) : (
      <>
        <div className="content">{book.author}</div>
        <div className="content">{book.title}</div>
      </>
    )}
    <button className="table-button" type="button" onClick={onClickEdit(index)}>
      <img src={edit} alt="edit pencil" height="16" />
    </button>
    <button className="table-button" type="button" onClick={onCheck(book.id)}>
      {book.finished ? (
        <img src={check} alt="check" height="16" />
      ) : (
        <img className="check-hide" src={check} alt="check" height="16" />
      )}
    </button>
    <button className="table-button" type="button" onClick={onDelete(book.id)}>
      <img src={del} alt="delete button" height="16" />
    </button>
  </li>
);

export default BookOrMovie;
