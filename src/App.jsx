import React from "react";
import "./App.css";
import edit from "./edit.png";
import search from "./search.png";
import del from "./del.png";
import check from "./check.png";
import db from "localforage";
import BookList from "./BookList";

class App extends React.Component {
  state = {
    books: [],
    edit: -1,
    search: "",
    sortBy: "index",
    sortReverse: false
  };
  constructor(props) {
    super(props);

    db.getItem("books").then(books => {
      if (books) {
        this.setState({ books });
      } else {
        db.setItem("books", this.state.books);
      }
    });
  }

  authorRef = React.createRef();
  titleRef = React.createRef();
  formRef = React.createRef();

  onSubmit = e => {
    e.preventDefault();
    const books = [...this.state.books];
    const book = {
      id: books[books.length - 1] ? books[books.length - 1].id + 1 : 1,
      author: this.authorRef.current.value,
      title: this.titleRef.current.value,
      finished: false
    };
    books.push(book);
    this.setState({
      books
    });
    db.setItem("books", books);
    this.formRef.current.reset();
  };

  onDelete = id => () => {
    const books = this.state.books.filter(book => book.id !== id);
    this.setState({
      books,
      edit: -1
    });
    db.setItem("books", books);
  };

  onCheck = index => () => {
    const book = {
      ...this.state.books[index]
    };
    book.finished = book.finished ? false : true;
    this.toggleBookFinished(index, book);
  };

  toggleBookFinished = (index, book) => {
    const books = [...this.state.books];
    books[index] = book;
    this.setState({
      books
    });
    db.setItem("books", books);
  };

  onClickEdit = index => event => {
    if (this.state.edit !== index) {
      this.setState({
        edit: index
      });
    } else {
      this.setState({
        edit: -1
      });
    }
  };

  onChange = e => {
    const books = [...this.state.books];
    const book = {
      ...this.state.books[this.state.edit],
      [e.currentTarget.name]: e.currentTarget.value
    };
    books.splice(this.state.edit, 1, book);
    this.setState({
      books
    });
  };

  searchOnChange = e => {
    this.setState({
      search: e.target.value
    });
  };

  handleSort = sortBy => {
    const sortReverse = sortBy === this.state.sortBy && !this.state.sortReverse;

    this.setState({
      sortBy,
      sortReverse
    });
  };

  render() {
    return (
      <div className="App">
        <header></header>
        <h1>Biblioteca de Camila</h1>

        <form onSubmit={this.onSubmit} ref={this.formRef}>
          <table>
            <tbody>
              <tr className="addingBooks">
                <td></td>
                <td></td>
                <td></td>
                <td colSpan="3" className="searchTd">
                  <input
                    id="search"
                    type="text"
                    className="search"
                    onChange={this.searchOnChange}
                  />
                  <label htmlFor="search" className="searchLabel">
                    <img src={search} alt="search" height="16" />
                  </label>
                </td>
              </tr>

              <tr className="addingBooks">
                <td></td>
                <td>
                  <input
                    type="text"
                    placeholder="author"
                    ref={this.authorRef}
                  />
                </td>
                <td>
                  <input type="text" placeholder="title" ref={this.titleRef} />
                </td>
                <td colSpan="3">
                  <button id="add" type="submit">
                    Save
                  </button>
                </td>
              </tr>
              <tr>
                <th>
                  <button
                    onClick={() => this.handleSort("index")}
                    type="button"
                    className="th"
                  >
                    Index{" "}
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => this.handleSort("author")}
                    type="button"
                    className="th"
                  >
                    {" "}
                    Author
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => this.handleSort("title")}
                    type="button"
                    className="th"
                  >
                    {" "}
                    Title
                  </button>
                </th>
                <th className="img-button">
                  <img src={edit} alt="edit pencil" height="16" />
                </th>
                <th className="img-button">
                  <img src={check} alt="check" height="16" />
                </th>
                <th className="img-button">
                  <img src={del} alt="delete button" height="16" />
                </th>
              </tr>

              <BookList
                sortBy={this.state.sortBy}
                books={this.state.books}
                edit={this.state.edit}
                onCheck={this.onCheck}
                onClickEdit={this.onClickEdit}
                onDelete={this.onDelete}
                onChange={this.onChange}
                filteredBooks={this.filteredBooks}
                search={this.state.search}
                sortReverse={this.state.sortReverse}
              />
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default App;
