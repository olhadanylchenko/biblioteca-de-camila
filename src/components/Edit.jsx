import React from "react";
import PropTypes from "prop-types";

class Edit extends React.Component {
  static propTypes = {
    edit: PropTypes.number,
    onChange: PropTypes.func,
    onClickEdit: PropTypes.func
  };

  render() {
    return (
      <>
        <input
          value={this.props.book.author}
          className="edit editInput"
          name="author"
          onChange={this.props.onChange}
        />
        <input
          value={this.props.book.title}
          className="edit editInput"
          name="title"
          onChange={this.props.onChange}
        />
      </>
    );
  }
}

export default Edit;
