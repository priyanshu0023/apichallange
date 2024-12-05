import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import './BookAdd.css';

function BookAdd() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationyear, setPublicationyear] = useState('');

  const addBook = (e) => {
    e.preventDefault();
    const book = { title, author, publicationyear: parseInt(publicationyear, 10) };
    const token = localStorage.getItem('token');

    axios.post('http://localhost:8080/api/books/addbook', book, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        alert('Book added successfully');
      })
      .catch((error) => {
        console.error('There was an error adding the book!', error);
        alert('Failed to add book. Please check your input.');
      });
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>
      <Form onSubmit={addBook}>
        <Form.Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Form.Input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <Form.Input
          type="number"
          placeholder="Publication Year"
          value={publicationyear}
          onChange={(e) => setPublicationyear(e.target.value)}
          required
          min="1850"
        />
        <Button type="submit" primary>
          Add Book
        </Button>
      </Form>
    </div>
  );
}

export default BookAdd;
