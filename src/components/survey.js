export const Survey = (props) => {
  const { onClick } = props;
  return (
    <>
      <p>Which of the following brands are you familiar with</p>
      <ul>
        <li>Mc Donalds</li>
        <li>KFC</li>
        <li>Guzman y Gomez</li>
        <li>Subaway</li>
      </ul>
      <button onClick={() => onClick('reward')}>Finish</button>
    </>
  );
};
