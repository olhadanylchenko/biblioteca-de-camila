import React from "react";
import PropTypes from "prop-types";
import Search from "./Search";
import FormToAddAThing from "./FormToAddAThing";
import SortingHeaders from "./SortingHeaders";
import BookOrMovie from "./BookOrMovie";

class List extends React.Component {
  state = { search: "" };
  static propTypes = {
    books: PropTypes.array,
    edit: PropTypes.number,
    onChange: PropTypes.func,
    onClickEdit: PropTypes.func,
    onCheck: PropTypes.func,
    onDelete: PropTypes.func,
    sortBy: PropTypes.string,
    sortReverse: PropTypes.bool
  };

  searchOnChange = e => {
    this.setState({
      search: e.target.value
    });
  };

  filteredBooks = () => {
    return this.props.books.filter(book => {
      const author = book.author.split(/,| /);
      const title = book.title.split(/,| /);
      const bookWords = [...author, ...title];
      const search = this.state.search.split(/,| /);
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
      <ul className="table">
        <Search searchOnChange={this.searchOnChange} />

        <FormToAddAThing
          formRef={this.props.formRef}
          list={this.props.list}
          onSubmit={this.props.onSubmit}
          authorOrDirectorRef={this.props.authorOrDirectorRef}
          titleRef={this.props.titleRef}
        />
        <SortingHeaders
          handleSort={this.props.handleSort}
          list={this.props.list}
        />

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

export default List;
