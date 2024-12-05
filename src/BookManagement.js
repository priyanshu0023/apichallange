import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BookManagement.css';

function BookManagement() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get('http://localhost:8080/api/books/getallbooks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBooks(response.data); // Assuming response.data is an array of BookDTO
  } catch (error) {
    console.error('Error fetching books:', error.response || error.message);
  }
};

  const deleteBook = (isbn) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:8080/api/books/deletebook/${isbn}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert('Book deleted successfully');
        fetchBooks();
      })
      .catch((error) => console.error('Error deleting book:', error));
  };

  return (
    <div>
      <h1>Book Management</h1>
      <Link to="/books/add">Add New Book</Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Year</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.isbn}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publicationyear}</td>
              <td>{book.isbn}</td>
              <td>
                <Link to={`/books/${book.isbn}`}>Edit</Link>
                <button onClick={() => deleteBook(book.isbn)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookManagement;
