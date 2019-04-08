import React, { Component } from 'react';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  handleQueryChange = (e) => {
    this.setState({ query: e.target.value });

  }
  handleSearch = () => {
    console.log("Query: " + this.state.query);

    var url = 'https://www.googleapis.com/books/v1/volumes?q=' + this.state.query
    console.log(url);
    fetch(url).then(
      response => response.json()
    ).then(
      json => {
        console.log(json);
        this.setState({ data: json });
      })
  }
  displayBooks = (books) => {
    if (books === undefined) {
      return null
    } else {
      const htmlBooks = [];

      books.forEach((book) => {
        htmlBooks.push(
          <div id="allbooks">
            <p>Title: {book.volumeInfo.title}</p>
            <p>Author: {book.volumeInfo.authors[0]}</p>
            <p>description: {book.volumeInfo.description}</p>
            <a href={book.saleInfo.buyLink}>Purchase link: {book.saleInfo.buyLink}</a>

            <div class="books">
              <div class="bookdesign">
                <img src={book.volumeInfo.imageLinks.thumbnail} alt="book image" />
              </div>
            </div>
          </div>)
      })

      return <div>
        {htmlBooks}
            </div>
    }
  }
  render() {
    console.log("data", this.state.data.items);
    return (
      <div>
        <div class="component">
          <ul class="align">
            <li>
              <figure class='book'>

                <ul class='hardcover_front'>
                  <li>
                    <div class="coverDesign blue">
                      <h1>CSS</h1>
                      <p>BOOK</p>
                    </div>
                  </li>
                  <li></li>
                </ul>

                <ul class='page'>
                  <li></li>
                  <li>
                    <a class="btn">BookFinder APP!   </a> <p>Andrew J Bagwell</p>
                  </li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>

                <ul class='hardcover_back'>
                  <li></li>
                  <li></li>
                </ul>
                <ul class='book_spine'>
                  <li></li>
                  <li></li>
                </ul>
                <figcaption>
                  <h1>BookFinder! App</h1>
                  <span>Search any book you would like though Google Books</span>

                </figcaption>
              </figure>
            </li>
          </ul>
        </div>

        <div className="topheader">

          <form class="searchbooks">
            <input type="text" className="query" placeholder="Search a book ?" value={this.state.query} onChange={this.handleQueryChange} />
            <button type="button" onClick={this.handleSearch}>Search</button>
          </form>
          {this.displayBooks(this.state.data.items)}

        </div>
        <footer>
          BookFinder - Google Book Search App <br></br>
          Andrew J Bagwell
        </footer>
         </div>
    );
  }
}
export default App;
