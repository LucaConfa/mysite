import { useState } from 'react';
import { Title } from './title';
import gumgumMR_logo from '../gumgumMR_logo.png';

export const ControlSurvey = (props) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const { onClick } = props;

  return (
    <>
      <img
        style={{ width: '88px', height: '100%' }}
        src={gumgumMR_logo}
        alt="Gumgum Market Research Logo"
      />
      <div className="progressBar">
        <svg
          width="144"
          height="8"
          viewBox="0 0 144 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="4.09753"
            y="1.71428"
            width="67.9024"
            height="4.57143"
            fill="#F2F6F7"
          />
          <rect
            x="72"
            y="1.71428"
            width="67.9024"
            height="4.57143"
            fill="#F2F6F7"
          />
          <ellipse cx="4.09756" cy="4" rx="4.09756" ry="4" fill="#49C2DE" />
          <ellipse cx="72" cy="4" rx="4.09756" ry="4" fill="#F2F6F7" />
          <ellipse cx="139.902" cy="4" rx="4.09756" ry="4" fill="#F2F6F7" />
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
            onClick('claim2');
          }
        }}
      >
        OK
      </div>
    </>
  );
};
