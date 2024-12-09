import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

// Create an HTTP link to connect to the GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql", // The URI of the GraphQL server
});

// Set the authorization headers for every request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create an Apollo Client instance, combining the auth link and HTTP link
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          savedBooks: {
            merge(existing = [], incoming = []) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

// Define the main App component
function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

// Export the App component for use in other parts of the application
export default App;