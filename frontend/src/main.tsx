
import { createRoot } from 'react-dom/client'
import App from './components/App/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/',
  cache: new InMemoryCache(
    
   
  ),
});


createRoot(document.getElementById('root')!).render(
<ApolloProvider client={client}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</ApolloProvider>
)
