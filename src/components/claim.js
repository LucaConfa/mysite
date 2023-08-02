import { Title } from './title';

export const Claim = (props) => {
  const { onClick } = props;
  return (
    <>
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
