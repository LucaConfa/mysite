/* eslint-disable default-case */
import { useState } from 'react';

export const Survey = (props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const { onClick } = props;

  const questions = () => {
    switch (questionIndex) {
      case 0: {
        return (
          <>
            <p>Which of the following brands are you familiar with</p>
            <ul>
              <li>Mc Donalds</li>
              <li>KFC</li>
              <li>Guzman y Gomez</li>
              <li>Subaway</li>
            </ul>
            <button
              onClick={() => {
                const newIndex = questionIndex + 1;
                setQuestionIndex(newIndex);
              }}
            >
              Next
            </button>
          </>
        );
      }
      case 1: {
        return (
          <>
            <p>In three words or less now would you describe subway</p>
            <input type="text" />
            <button
              onClick={() => {
                const newIndex = questionIndex + 1;
                setQuestionIndex(newIndex);
              }}
            >
              Next
            </button>
          </>
        );
      }
      case 2: {
        return (
          <>
            <p>
              In a scale 1 to 10 how likely are you to choose Subway next time
              you order food
            </p>
            <input type="text" />
            <button onClick={() => onClick('reward')}>Finish</button>
          </>
        );
      }
    }
  };

  return <>{questions()}</>;
};
