import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import StartPage from './components/StartPage';
import MoveAnimation from './components/MoveAnimation';
import SelectComponent from './components/SelectComponent';
import AppearanceAnimation from './components/AppearanceAnimation';
import StatsAnimation from './components/StatsAnimation';
import { useSpring, animated } from 'react-spring';

const App = () => {
  const [card, setCard] = useState();
  const [randomPoke, setRandomPoke] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [turnCounter, setTurnCounter] = useState(1);
  const [fight, setFight] = useState(false);
  const [prepare, setPrepare] = useState(false);
  const [position, setPosition] = useState('relative z-10');
  const [opponents, setOpponents] = useState([]);
  const [start, setStart] = useState(true);

  const FadeOut = useSpring({
    to: {
      transition: 'opacity 1s',
      opacity: confirm ? 0 : 1,
    },
  });

  const FadeIn = useSpring({
    to: {
      transition: 'opacity 3s',
      opacity: prepare ? 1 : 0,
    },
  });
  const damage = () => {
    setTimeout(() => {
      let opponentsArr = opponents;
      const [attaker, defender] = opponentsArr;
      let defenderHealth = defender.base.HP;
      const atk = attaker.base.Attack;
      const def = defender.base.Defense;
      const hp = defender.base.HP;
      const speed = attaker.base.Speed;
      if (defenderHealth > 0) {
        const hitValue = Math.floor((((2 * hp) / 5 + 2) * speed * (atk / def)) / 50 + 2);
        setTimeout(
          () => setOpponents((prev) => [...prev, (prev[1].base.HP = defenderHealth - hitValue)]),
          3000,
        );
        // setOpponents((prev) => [...prev, (prev[1].base.HP = defenderHealth - hitValue)]);
      }
    }, 1500);
  };

  useEffect(() => {
    const getCard = async () => {
      await axios.get(`http://localhost:3476/pokedex/${randomPoke}`).then((response) => {
        setCard(response.data[0]);
        setOpponents(
          opponents.length === 0 ? [response.data[0]] : [response.data[0], ...[opponents[1]]],
        );
      });
    };
    const pokeImage = () => {
      setTimeout(() => {
        const zerofilled = ('000' + randomPoke).slice((randomPoke + '').length);
        setImageUrl(zerofilled);
      }, 700);
    };
    getCard();
    pokeImage();
  }, [randomPoke]);

  return (
    <FightContext.Provider value={{ opponents, setOpponents }}>
      <div className="app">
        {!confirm ? (
          <p className="text-center m-[50px] text-5xl font-bold">Welcome Master USER</p>
        ) : fight ? (
          <h1 className="text-center m-[50px] text-5xl font-bold">Turn {turnCounter}</h1>
        ) : (
          <h1 className="text-center m-[50px] text-5xl font-bold">Click button Start</h1>
        )}
        {card ? (
          <div className={position}>
            <MoveAnimation
              card={card}
              imageNum={imageUrl}
              setImageUrl={setImageUrl}
              toggle={confirm}
              fight={fight}
            />
          </div>
        ) : (
          <p>Loading</p>
        )}
        {confirm ? <StatsAnimation player={card} /> : null}
        <SelectComponent setRandomPoke={setRandomPoke} toggle={confirm} />
        <div className="absolute top-[238px] right-[250px] mr-[200px] scale(0.8, 0.8)">
          <AppearanceAnimation toggle={confirm} fight={fight} />
        </div>
        {!prepare ? (
          <animated.div style={FadeOut}>
            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center"
                onClick={() => {
                  setConfirm((con) => !con);
                  setTimeout(() => setPrepare(true), 1500);
                  console.log(opponents);
                }}>
                CONFIRM
              </button>
            </div>
          </animated.div>
        ) : prepare ? (
          <animated.div style={FadeIn}>
            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center"
                onClick={() => {
                  setFight(true);
                  damage();
                }}>
                FIGHT
              </button>
            </div>
          </animated.div>
        ) : null}
      </div>
    </FightContext.Provider>
  );
};

export default App;

export const FightContext = createContext([]);
