import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import Countries from './graphql/Countries';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <Countries />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
