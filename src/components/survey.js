/* eslint-disable default-case */
import { useState } from 'react';
import { Title } from './title';
import gumgumMR_logo from '../gumgumMR_logo.png';

const defaultOptions = [
  {
    name: 'McDonalds',
    className: '',
  },
  {
    name: 'KFC',
    className: '',
  },
  {
    name: 'Guzman Y Gomez',
    className: '',
  },
  {
    name: 'Subway',
    className: '',
  },
  {
    name: 'Hungry Jacks',
    className: '',
  },
  {
    name: 'None of the Above',
    className: '',
  },
];

export const Survey = (props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState(defaultOptions);
  const [answer, setAnswer] = useState('');
  const { onClick } = props;
  const [selectedScaleItem, setSelectedScaleItem] = useState(0);

  const option = (optionItem) => {
    return (
      <div
        key={optionItem.name}
        className={`multipleOptions ${optionItem.className}`}
        onClick={(e) => {
          const classToSet = e.target.classList.contains('selected')
            ? ''
            : 'selected';

          const updatedOptions = options.map((item) => {
            if (item.name === optionItem.name) {
              item.className = classToSet;
            }
            return item;
          });

          setOptions([...updatedOptions]);
        }}
      >
        {optionItem.name}
      </div>
    );
  };

  const displayTitle = (text) => {
    return <Title text={text} />;
  };

  const displayMultipleOptions = () => {
    const optionsArray = [];
    options.forEach((optionItem) => {
      optionsArray.push(option(optionItem));
    });
    return optionsArray;
  };

  const scaleItem = (text) => {
    return (
      <div
        key={text}
        className={`scaleItem ${selectedScaleItem === text ? 'selected' : ''}`}
        onClick={(e) => {
          if (e.target.classList.contains('selected')) {
            setSelectedScaleItem(0);
          } else {
            setSelectedScaleItem(text);
          }
        }}
      >
        {text}
      </div>
    );
  };

  const displayScale = (startFrom, endAt) => {
    const scaleItems = [];

    for (let index = startFrom; index <= endAt; index++) {
      scaleItems.push(scaleItem(index));
    }
    return scaleItems;
  };

  const isOptionSelected = options.find(
    (item) => item.className === 'selected'
  );

  const questions = () => {
    switch (questionIndex) {
      case 0: {
        return (
          <>
          <img
            style={{ width: '88px', height: '100%' }}
            src={gumgumMR_logo}
            alt="Gumgum Market Research Logo"
          />
            <div className="progressBar">
            <svg width="144" height="8" viewBox="0 0 144 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4.09753" y="1.71428" width="67.9024" height="4.57143" fill="#F2F6F7"/>
              <rect x="72" y="1.71428" width="67.9024" height="4.57143" fill="#F2F6F7"/>
              <ellipse cx="4.09756" cy="4" rx="4.09756" ry="4" fill="#49C2DE"/>
              <ellipse cx="72" cy="4" rx="4.09756" ry="4" fill="#F2F6F7"/>
              <ellipse cx="139.902" cy="4" rx="4.09756" ry="4" fill="#F2F6F7"/>
            </svg>

            </div>

            {displayTitle(
              'Which of the following brands are you familiar with'
            )}
            {displayMultipleOptions()}
            <div
              className={`button ${isOptionSelected ? '' : 'disabled'}`}
              onClick={() => {
                if (isOptionSelected) {
                  const newIndex = questionIndex + 1;
                  setQuestionIndex(newIndex);
                }
              }}
            >
              OK
            </div>
          </>
        );
      }
      case 1: {
        return (
          <>
          <img
            style={{ width: '88px', height: '100%' }}
            src={gumgumMR_logo}
            alt="Gumgum Market Research Logo"
          />
            <div className="progressBar">
            <svg width="144" height="8" viewBox="0 0 144 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4.09753" y="1.71428" width="67.9024" height="4.57143" fill="#49C2DE"/>
              <rect x="72" y="1.71428" width="67.9024" height="4.57143" fill="#F2F6F7"/>
              <ellipse cx="4.09756" cy="4" rx="4.09756" ry="4" fill="#49C2DE"/>
              <ellipse cx="72" cy="4" rx="4.09756" ry="4" fill="#49C2DE"/>
              <ellipse cx="139.902" cy="4" rx="4.09756" ry="4" fill="#F2F6F7"/>
            </svg>

            </div>
            {displayTitle(
              'In three words or less now would you describe subway'
            )}
            <textarea
              type="text"
              rows="4"
              cols="40"
              onChange={(e) => {
                setAnswer(e.target.value.trim() || '');
              }}
            />
            <div
              className={`button ${answer.trim().length ? '' : 'disabled'}`}
              onClick={() => {
                if (answer && answer.length < 1) {
                  return;
                }
                const newIndex = questionIndex + 1;
                setQuestionIndex(newIndex);
              }}
            >
              OK
            </div>
          </>
        );
      }
      case 2: {
        return (
          <>
          <img
            style={{ width: '88px', height: '100%' }}
            src={gumgumMR_logo}
            alt="Gumgum Market Research Logo"
          />
            <div className="progressbar">
            <svg width="144" height="8" viewBox="0 0 144 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4.09753" y="1.71428" width="67.9024" height="4.57143" fill="#49C2DE"/>
              <rect x="72" y="1.71428" width="67.9024" height="4.57143" fill="#49C2DE"/>
              <ellipse cx="4.09756" cy="4" rx="4.09756" ry="4" fill="#49C2DE"/>
              <ellipse cx="72" cy="4" rx="4.09756" ry="4" fill="#49C2DE"/>
              <ellipse cx="139.902" cy="4" rx="4.09756" ry="4" fill="#49C2DE"/>
            </svg>

            </div>
            {displayTitle(
              'On a scale of 1 to 10 how likely are you to choose Subway next time you order fast food'
            )}
            <div className="scale">{displayScale(1, 5)}</div>
            <div className="scale">{displayScale(6, 10)}</div>
            <div
              className={`button ${selectedScaleItem > 0 ? '' : 'disabled'}`}
              onClick={() => {
                if (selectedScaleItem) {
                  onClick('reward');
                }
              }}
            >
              Finish
            </div>
          </>
        );
      }
    }
  };

  return <>{questions()}</>;
};
