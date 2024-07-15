import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import Countries from './graphql/Countries';
import TodoList from './rxdb/TodoList';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <Countries />;
      case 'tab2':
        return <TodoList />;
      default:
        return <Countries />;
    }
  };

  return (
    <ApolloProvider client={client}>
    <div className="app">
      <div className="tabs">
        <div className={`tab ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => setActiveTab('tab1')}>
          Tab 1
        </div>
        <div className={`tab ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => setActiveTab('tab2')}>
          Tab 2
        </div>
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
    </ApolloProvider>
  );
};

export default App;