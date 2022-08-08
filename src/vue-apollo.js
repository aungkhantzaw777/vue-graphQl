import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

let url = ''

if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
{
  url = 'http://localhost:3000/graphql'
}else {
  url = 'https://limitless-retreat-78506.herokuapp.com/graphql'
}

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: url,
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

export {
  apolloClient
}
