import { Title } from './title';

export const Reward = (props) => {
  const { onClick } = props;
  return (
    <>
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
        <span style={{ fontWeight: 'bold' }}> Add $5 </span> <br /> with another
        survey
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
