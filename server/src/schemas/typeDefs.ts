// Query type:
// me: Which returns a User type.
// Mutation type:
// login: Accepts an email and password as parameters; returns an Auth type.
// addUser: Accepts a username, email, and password as parameters; returns an Auth type.
// saveBook: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type. (Look into creating what's known as an input type to handle all of these parameters!)
// removeBook: Accepts a book's bookId as a parameter; returns a User type.
// User type:
//  _id
// username
// email
// bookCount
// savedBooks (This will be an array of the Book type.)
// Book type:
// bookId (Not the _id, but the book's id value returned from Google's Book API.)
// authors (An array of strings, as there may be more than one author.)
// description
// title
// image
// link
// Auth type:
// token
// user (References the User type.)

const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me(user_id: ID!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: Book!): User
    removeBook(bookId: String!): User
  }

  input BookInput {
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RemoveBookInput {
    bookId: String!
  }

  input MeInput {
    user_id: ID!
  }

  input SaveBookInput {
    book: BookInput!
  }

  input AddUserInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input RemoveBookUserInput {
    bookId: String!
  }

  input SaveBookUserInput {
    book: BookInput!
  }

  type Query {
    me(input: MeInput!): User
  }

  type Mutation {
    login(input: LoginInput!): Auth
    addUser(input: AddUserInput!): Auth
    saveBook(input: SaveBookInput!): User
    removeBook(input: RemoveBookInput!): User
  }
`;

export default typeDefs;
