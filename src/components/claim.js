import { Title } from './title';
import gumgumMR_logo from '../gumgumMR_logo.png';

export const Claim = (props) => {
  const { onClick } = props;
  return (
    <>
      <img
        style={{ width: '88px', height: '100%' }}
        src={gumgumMR_logo}
        alt="Gumgum Market Research Logo"
      />
      <Title text="Tap to claim your $5 reward" />
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick('tremendous');
        }}
      >
        https://reward.tremendous.com/rewards/hyc0hzivc--mxcdiyshpqwvh5gtdiko9vzuw-h3lxni
      </a>
    </>
  );
};
