export const Reward = (props) => {
  const { onClick } = props;
  return (
    <>
      <p>
        Thank you very much for participating in our study! We hope you enjoy
        your reward!
      </p>

      <button onClick={() => onClick('tremendous')}>Redeem your prize</button>
    </>
  );
};
