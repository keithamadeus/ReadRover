import { gql } from '@apollo/client';
// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
        }
      }
    }
  }
`;
        
// ADD_USER will execute the addUser mutation.
export const ADD_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
        }
      }
    }
  }
`;
// SAVE_BOOK will execute the saveBook mutation.
export const SAVE_BOOK = gql`
mutation saveBook($input: BookInput!) {
  saveBook(input: $input) {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
      }
    }
  }
`;

// REMOVE_BOOK will execute the removeBook mutation.
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
      }
    }
  }
`;
