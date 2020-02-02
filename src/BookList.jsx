import React from "react";
import PropTypes from "prop-types";
import edit from "./edit.png";
import del from "./del.png";
import check from "./check.png";

class BookList extends React.Component {
  static propTypes = {
    books: PropTypes.array,
    edit: PropTypes.number,
    onChange: PropTypes.func,
    onClickEdit: PropTypes.func,
    onCheck: PropTypes.func,
    onDelete: PropTypes.func,
    search: PropTypes.string
  };

  render() {
    let filteredBooks = this.props.books.filter(book => {
      const author = book.author.split(/,| /);
      const title = book.title.split(/,| /);
      const bookWords = [...author, ...title];
      const search = this.props.search.split(/,| /);
      // every word in the search matches some words in the bookWords

      return search.every(searchWord => {
        return bookWords.some(word => word.indexOf(searchWord) == 0);
      });
    });
    console.log(filteredBooks);
    return (
      <>
        {filteredBooks.map((book, index) => (
          <tr key={index}>
            <td>{book.id}</td>
            {this.props.edit === index ? (
              <>
                <td>
                  <input
                    value={book.author}
                    className="edit"
                    name="author"
                    onChange={this.props.onChange}
                    className="editInput"
                  ></input>
                </td>
                <td>
                  <input
                    value={book.title}
                    className="edit"
                    name="title"
                    onChange={this.props.onChange}
                    className="editInput"
                  ></input>
                </td>
              </>
            ) : (
              <>
                <td>{book.author}</td>
                <td>{book.title}</td>
              </>
            )}
            <td>
              <button
                className="table-button"
                type="button"
                onClick={this.props.onClickEdit(index)}
              >
                <img src={edit} alt="edit pencil" height="16" />
              </button>
            </td>
            <td>
              <button
                className="table-button"
                type="button"
                onClick={this.props.onCheck(index)}
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
            </td>
            <td>
              <button
                className="table-button"
                type="button"
                onClick={this.props.onDelete(book.id)}
              >
                <img src={del} alt="delete button" height="16" />
              </button>
            </td>
          </tr>
        ))}
      </>
    );
  }
}

export default BookList;
