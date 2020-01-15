import React from "react";
import "./App.css";
import edit from "./edit.png";
import del from "./del.png";
import check from "./check.png";
import db from "localforage";

class App extends React.Component {
  state = {
    books: []
  };
  constructor(props) {
    super(props);

    db.getItem("books").then(books => {
      this.setState({ books });
    });
  }

  authorRef = React.createRef();
  titleRef = React.createRef();
  formRef = React.createRef();

  onSubmit = e => {
    e.preventDefault();
    const books = [...this.state.books];
    const book = {
      index: books[books.length - 1] ? books[books.length - 1].index + 1 : 1,
      author: this.authorRef.current.value,
      title: this.titleRef.current.value
    };
    books.push(book);
    this.setState({
      books
    });
    db.setItem("books", books);
    this.formRef.current.reset();
  };

  onDelete = e => {
    const books = [...this.state.books];
    books.splice(0, 1);
    this.setState({
      books
    });
    db.setItem("books", books);
  };

  render() {
    return (
      <div className="App">
        <header></header>
        <h1>Biblioteca de Camila</h1>
        <button type="button" onClick={this.onDelete}>
          DELETE
        </button>
        <form onSubmit={this.onSubmit} ref={this.formRef}>
          <table>
            <tr className="addingBooks">
              <td></td>
              <td>
                <input type="text" placeholder="author" ref={this.authorRef} />
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
              <th>Index</th>
              <th>Author</th>
              <th>Title</th>
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

            {this.state.books.map(book => (
              <tr>
                <td>{book.index}</td>
                <td>{book.author}</td>
                <td>{book.title}</td>
                <td>✏️</td>
                <td>✔</td>
                <td>❌</td>
              </tr>
            ))}
          </table>
        </form>
      </div>
    );
  }
}

export default App;
