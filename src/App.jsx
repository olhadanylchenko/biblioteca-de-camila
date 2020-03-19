import React from "react";
import "./App.css";
import db from "localforage";
import List from "./components/List";
import DragBar from "./components/DragBar";
import Tabs from "./components/Tabs";

class App extends React.Component {
  state = {
    list: "books",
    books: [],
    movies: [],
    edit: -1,
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
    if (this.state.list === "books") {
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
    } else {
      const movies = [...this.state.movies];
      const movie = {
        id: movies[movies.length - 1] ? movies[movies.length - 1].id + 1 : 1,
        director: this.authorOrDirectorRef.current.value,
        title: this.titleRef.current.value,
        finished: false
      };
      movies.push(movie);
      this.setState({
        movies
      });
      db.setItem("movies", movies);
    }

    this.formRef.current.reset();
    // focusing on the first input again after you saved a book
    this.authorOrDirectorRef.current.focus();
  };

  onDelete = id => () => {
    if (this.state.list === "books") {
      const books = this.state.books.filter(book => book.id !== id);
      this.setState({
        books,
        edit: -1
      });
      db.setItem("books", books);
    } else {
      const movies = this.state.movies.filter(movie => movie.id !== id);
      this.setState({
        movies,
        edit: -1
      });
      db.setItem("movies", movies);
    }
  };

  onCheck = id => () => {
    if (this.state.list === "books") {
      const book = this.state.books.filter(book => book.id === id)[0];
      book.finished = book.finished ? false : true;
      const books = [...this.state.books];
      this.setState({
        books
      });
      db.setItem("books", books);
    } else {
      const movie = this.state.movies.filter(movie => movie.id === id)[0];
      movie.finished = movie.finished ? false : true;
      const movies = [...this.state.movies];
      this.setState({
        movies
      });
      db.setItem("movies", movies);
    }
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
    if (this.state.list === "books") {
      const books = [...this.state.books];
      const book = {
        ...this.state.books[this.state.edit],
        [e.currentTarget.name]: e.currentTarget.value
      };
      books.splice(this.state.edit, 1, book);
      this.setState({
        books
      });
    } else {
      const movies = [...this.state.movies];
      const movie = {
        ...this.state.movies[this.state.edit],
        [e.currentTarget.name]: e.currentTarget.value
      };
      movies.splice(this.state.edit, 1, movie);
      this.setState({
        movies
      });
    }
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
        <Tabs toggleTab={this.toggleTab} list={this.state.list} />

        <List
          toggleTab={this.toggleTab}
          onSubmit={this.onSubmit}
          handleSort={this.handleSort}
          onCheck={this.onCheck}
          onClickEdit={this.onClickEdit}
          onDelete={this.onDelete}
          onChange={this.onChange}
          formRef={this.formRef}
          authorOrDirectorRef={this.authorOrDirectorRef}
          titleRef={this.titleRef}
          list={this.state.list}
          sortBy={this.state.sortBy}
          books={this.state[this.state.list]}
          edit={this.state.edit}
          sortReverse={this.state.sortReverse}
        />
      </div>
    );
  }
}

export default App;
