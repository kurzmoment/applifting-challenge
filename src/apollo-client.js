import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://camden.stepzen.net/api/cranky-manta/__graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Apikey ${process.env.REACT_APP_STEPZEN_KEY}`,
  },
});

export default client;
