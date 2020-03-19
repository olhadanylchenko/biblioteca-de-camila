import React from "react";
import PropTypes from "prop-types";
import BookOrMovie from "./BookOrMovie";

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
          <BookOrMovie
            beingEdited={this.props.edit}
            key={book.id}
            index={index}
            book={book}
            onChange={this.props.onChange}
            onClickEdit={this.props.onClickEdit}
            onCheck={this.props.onCheck}
            onDelete={this.props.onDelete}
          />
        ))}
      </ul>
    );
  }
}

export default BookList;
