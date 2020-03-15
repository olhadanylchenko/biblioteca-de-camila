import React from "react";
import PropTypes from "prop-types";
import edit from "../edit.png";
import del from "../del.png";
import check from "../check.png";
import Edit from "./Edit";

class BookList extends React.Component {
  static propTypes = {
    books: PropTypes.array,
    edit: PropTypes.number,
    onChange: PropTypes.func,
    onClickEdit: PropTypes.func,
    onCheck: PropTypes.func,
    onDelete: PropTypes.func,
    search: PropTypes.string,
    sortBy: PropTypes.string,
    sortReverse: PropTypes.bool
  };

  filteredBooks = () => {
    return this.props.books.filter(book => {
      const author = book.author.split(/,| /);
      const title = book.title.split(/,| /);
      const bookWords = [...author, ...title];
      const search = this.props.search.split(/,| /);
      // every word in the search matches some words in the bookWords

      return search.every(searchWord => {
        return bookWords.some(word => word.indexOf(searchWord) == 0);
      });
    });
  };

  render() {
    let filteredBooks = this.filteredBooks();
    if (this.props.sortBy === "index") {
      filteredBooks.sort((index1, index2) => {
        return index1 - index2;
      });
    } else {
      filteredBooks.sort((bookA, bookB) => {
        var x = bookA[this.props.sortBy].toLowerCase();
        var y = bookB[this.props.sortBy].toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }
    if (this.props.sortReverse) {
      filteredBooks.reverse();
    }

    return (
      <ul>
        {filteredBooks.map((book, index) => (
          <>
            {book.id}
            {this.props.edit === index ? (
              <Edit book={book} onChange={this.props.onChange} />
            ) : (
              <>
                {book.author}
                {book.title}
              </>
            )}
            <button
              className="table-button"
              type="button"
              onClick={this.props.onClickEdit(index)}
            >
              <img src={edit} alt="edit pencil" height="16" />
            </button>
            <button
              className="table-button"
              type="button"
              onClick={this.props.onCheck(book.id)}
            >
              {book.finished ? (
                <img src={check} alt="check" height="16" />
              ) : (
                <img
                  className="check-hide"
                  src={check}
                  alt="check"
                  height="16"
                />
              )}
            </button>
            <button
              className="table-button"
              type="button"
              onClick={this.props.onDelete(book.id)}
            >
              <img src={del} alt="delete button" height="16" />
            </button>
          </>
        ))}
      </ul>
    );
  }
}

export default BookList;
