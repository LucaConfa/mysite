/* eslint-disable default-case */
import { useState } from 'react';
import './index.css';
import { Survey } from './components/survey';
import { Reward } from './components/reward';
import { Tremendous } from './components/tremendous';
import { ControlSurvey } from './components/controlSurvey';
import { Claim } from './components/claim';

function App() {
  const [page, setPage] = useState('survey');

  const displayPage = () => {
    console.log('setpage', page);
    document.body.style.backgroundColor = '#FFF';
    switch (page) {
      case 'survey':
        return <Survey onClick={setPage} />;
      case 'reward':
        return <Reward onClick={setPage} />;
      case 'tremendous': {
        document.body.style.backgroundColor = '#0A2D45';
        return <Tremendous />;
      }
      case 'controlSurvey': {
        return <ControlSurvey onClick={setPage} />;
      }
      case 'claim': {
        return <Claim onClick={setPage} />;
      }
    }
  };

  return <div className="container">{displayPage()}</div>;
}

export default App;
