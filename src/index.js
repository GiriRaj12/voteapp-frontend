import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import VoterStore from './contextComponent/VoteContext.js';

ReactDOM.render(
  <React.StrictMode>
    <VoterStore>
      <App />
    </VoterStore>
  </React.StrictMode>,
  document.getElementById('root')
);
