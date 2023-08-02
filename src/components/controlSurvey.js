import { useState } from 'react';
import { Title } from './title';

export const ControlSurvey = (props) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const { onClick } = props;

  return (
    <>
      <div className="progressBar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="246"
          height="14"
          viewBox="0 0 246 14"
          fill="none"
        >
          <line x1="238" y1="7.5" x2="5" y2="7.5" stroke="black" />
          <circle cx="7" cy="7" r="7" fill="black" />
          <circle cx="123" cy="7" r="7" fill="#D9D9D9" />
          <circle cx="239" cy="7" r="7" fill="#D9D9D9" />
        </svg>
      </div>
      <Title text="Have you seen an add for BMW in the last 24 hours?" />
      <div className="scale">
        <div
          className={`inRow ${selectedItem === 1 ? 'selected' : ''}`}
          onClick={(e) => {
            console.log('e.target.classList :>> ', e.target.classList);
            if (e.target.classList.contains('selected')) {
              setSelectedItem(0);
              return;
            }
            setSelectedItem(1);
          }}
        >
          YES
        </div>
        <div
          className={`inRow ${selectedItem === 2 ? 'selected' : ''}`}
          onClick={(e) => {
            if (e.target.classList.contains('selected')) {
              setSelectedItem(0);
              return;
            }
            setSelectedItem(2);
          }}
        >
          NO
        </div>
      </div>
      <div
        className={`button ${selectedItem ? '' : 'disabled'}`}
        onClick={() => {
          if (selectedItem) {
            onClick('claim');
          }
        }}
      >
        OK
      </div>
    </>
  );
};
