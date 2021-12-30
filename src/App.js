import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Die from "./components/Die";
import useEventListener from "./hooks/useEventListener";

const START_DICE = 5;
const unique_ids = ["alpha", "beta", "gamma", "delta", "epsilon"];

function App() {
  const [heldDice, setHeldDice] = useState([]);
  const [rolledDice, setRolledDice] = useState([...Array(START_DICE).fill()]);
  const [heldScore, setHeldScore] = useState(0);
  const [rolledScore, setRolledScore] = useState(0);

  useEventListener("keyup", ({ code, keyCode }) => {
    if (code === "Space" && keyCode === 32) {
      initDice();
    }
  });

  const initDice = () => {
    const dice = [];
    for (let i = 0; i < START_DICE; i++) {
      dice.push({
        id: unique_ids[i],
        value: 1 + Math.floor(Math.random() * 6),
        isHeld: false,
      });
    }
    setRolledDice(dice);
  };

  useEffect(() => {
    initDice();
  }, []);

  useEffect(() => {
    const setScores = (reset = false) => {
      let held = 0;
      let rolled = 0;

      if (reset) {
        setHeldScore(0);
        setRolledScore(0);
        return;
      }

      for (let i = 0; i < 5; i++) {
        if (heldDice[i] && Number.isInteger(heldDice[i]?.value)) {
          held += heldDice[i].value;
        }
        if (rolledDice[i] && Number.isInteger(rolledDice[i]?.value)) {
          rolled += rolledDice[i].value;
        }
      }

      setHeldScore(held);
      setRolledScore(rolled);
    };

    setScores();
    return () => {
      setScores(true);
    };
  }, [rolledDice, heldDice]);

  const handleHold = (id, isHeld) => {
    if (!isHeld) {
      const dieIndex = rolledDice.findIndex((die) => die.id === id);
      setHeldDice([...heldDice, rolledDice[dieIndex]]);
      const filteredRolledDice = rolledDice.filter((die) => die.id === id);
      setRolledDice(filteredRolledDice);
    }

    if (isHeld) {
      const dieIndex = heldDice.findIndex((die) => die.id === id);
      setRolledDice([...rolledDice, heldDice[dieIndex]]);
      const filteredHeldDice = heldDice.filter((die) => die.id === id);
      setHeldDice(filteredHeldDice);
    }
  };

  return (
    <div className="App">
      <Layout>
        <DiceLayout held>
          <DiceScore>Total: {heldScore}</DiceScore>
          {heldDice?.length > 0 &&
            heldDice.map((die) => (
              <Die
                key={die?.id}
                roll={die?.value}
                handleHold={() => handleHold(die?.id, true)}
              />
            ))}
        </DiceLayout>
        <DiceLayout>
          <DiceScore>Roll: {rolledScore}</DiceScore>
          {rolledDice?.length &&
            rolledDice.map((die) => (
              <Die
                key={die?.id}
                roll={die?.value}
                handleHold={() => handleHold(die?.id, false)}
              />
            ))}
        </DiceLayout>
        <RollButton onClick={initDice}>
          Roll ({START_DICE - heldDice?.length})
        </RollButton>
      </Layout>
    </div>
  );
}

export default App;

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
`;

const DiceLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr), repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  border-radius: 3px;
  min-width: 780px;
  min-height: 333px;

  ${(props) =>
    props.held &&
    css`
      background-color: #888;
    `};
`;

const DiceScore = styled.div`
  grid-column: 1 / span 5;
  align-self: center;
  justify-self: center;
`;

const RollButton = styled.button`
  width: 30%;
  height: 40px;
  border: none;
  background: #;
`;
