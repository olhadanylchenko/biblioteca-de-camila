import React from "react";
import "./App.css";
import db from "localforage";
import BookList from "./components/BookList";
import DragBar from "./components/DragBar";
import Tabs from "./components/Tabs";
import Search from "./components/Search";
import FormToAddAThing from "./components/FormToAddAThing";
import SortingHeaders from "./components/SortingHeaders";

class App extends React.Component {
  state = {
    list: "books",
    books: [],
    movies: [],
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
    db.getItem("movies").then(movies => {
      if (movies) {
        this.setState({ movies });
      } else {
        db.setItem("movies", this.state.movies);
      }
    });
  }

  authorOrDirectorRef = React.createRef();
  titleRef = React.createRef();
  formRef = React.createRef();

  onSubmit = e => {
    e.preventDefault();
    const books = [...this.state.books];
    const book = {
      id: books[books.length - 1] ? books[books.length - 1].id + 1 : 1,
      author: this.authorOrDirectorRef.current.value,
      title: this.titleRef.current.value,
      finished: false
    };
    books.push(book);
    this.setState({
      books
    });
    db.setItem("books", books);
    this.formRef.current.reset();
    // focusing on the first input again after you saved a book
    this.authorOrDirectorRef.current.focus();
  };

  onDelete = id => () => {
    const books = this.state.books.filter(book => book.id !== id);
    this.setState({
      books,
      edit: -1
    });
    db.setItem("books", books);
  };

  onCheck = id => () => {
    const book = this.state.books.filter(book => book.id === id)[0];
    book.finished = book.finished ? false : true;
    const books = [...this.state.books];
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

  toggleTab = tabName => {
    console.log(tabName);
    this.setState({
      list: tabName
    });
  };

  render() {
    return (
      <div className="App">
        <DragBar />
        <h1>Biblioteca de Camila</h1>
        <Tabs toggleTab={this.toggleTab} />

        <Search searchOnChange={this.searchOnChange} />

        <FormToAddAThing
          formRef={this.formRef}
          list={this.list}
          onSubmit={this.onSubmit}
          authorOrDirectorRef={this.authorOrDirectorRef}
          titleRef={this.titleRef}
        />

        <SortingHeaders handleSort={this.handleSort} list={this.state.list} />

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
      </div>
    );
  }
}

export default App;
