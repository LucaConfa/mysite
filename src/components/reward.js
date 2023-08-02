import { Title } from './title';
import gumgumMR_logo from '../gumgumMR_logo.png';

export const Reward = (props) => {
  const { onClick } = props;
  return (
    <>
      <img
        style={{ width: '88px', height: '100%' }}
        src={gumgumMR_logo}
        alt="Gumgum Market Research Logo"
      />
      <Title
        text="Thank you very much for participating in our study! We hope you enjoy
        your reward!"
      />
      <div
        className="textContainer"
        onClick={() => {
          onClick('controlSurvey');
        }}
      >
        <div className="textBold">Add $5 </div>
        <div>with another survey</div>
      </div>
      <a
        href="#"
        onClick={() => {
          onClick('claim');
        }}
      >
        Claim your $5 reward
      </a>
    </>
  );
};
