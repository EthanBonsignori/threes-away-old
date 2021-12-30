import styled from "styled-components";

function Die({ roll, handleHold }) {
  return (
    <DieFace onClick={handleHold}>
      {[...Array(roll)].map((_, i) => (
        <DiePip key={i} className="pip" />
      ))}
    </DieFace>
  );
}

export default Die;

const DieFace = styled.div`
  display: grid;
  grid-template-areas:
    "a . c"
    "e g f"
    "d . b";

  flex: 0 0 auto;
  margin: 16px;
  padding: 10px;
  width: 104px;
  height: 104px;

  border-radius: 10%;
  background-color: #ab0200;
  box-shadow: inset 0 5px #c50300, inset 0 -5px #310100, inset 5px 0 #990300,
    inset -5px 0 #990300;

  .pip:nth-child(2) {
    grid-area: b;
  }

  .pip:nth-child(3) {
    grid-area: c;
  }

  .pip:nth-child(4) {
    grid-area: d;
  }

  .pip:nth-child(5) {
    grid-area: e;
  }

  .pip:nth-child(6) {
    grid-area: f;
  }

  .pip:nth-child(odd):last-child {
    grid-area: g;
  }
`;

const DiePip = styled.div`
  width: 22px;
  height: 22px;
  align-self: center;
  justify-self: center;
  border-radius: 50%;
  background-color: #333;
  box-shadow: inset 0 3px #111, inset 0 -3px #555;
`;
