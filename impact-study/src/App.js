/* eslint-disable default-case */
import { useState } from 'react';
import './App.css';
import { Survey } from './components/survey';
import { Reward } from './components/reward';
import { Tremendous } from './components/tremendous';

function App() {
  const [page, setPage] = useState('survey');

  const displayPage = () => {
    switch (page) {
      case 'survey':
        return <Survey onClick={setPage} />;
      case 'reward':
        return <Reward onClick={setPage} />;
      case 'tremendous': {
        return <Tremendous />;
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">{displayPage()}</header>
    </div>
  );
}

export default App;
