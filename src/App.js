import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import StartPage from './components/StartPage';
import MoveAnimation from './components/MoveAnimation';
import SelectComponent from './components/SelectComponent';
import AppearanceAnimation from './components/AppearanceAnimation';
import StatsAnimation from './components/StatsAnimation';
import WinerWindow from './components/WinerWindow';
import { useSpring, animated } from 'react-spring';

const App = () => {
  const [card, setCard] = useState();
  const [randomPoke, setRandomPoke] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [turnCounter, setTurnCounter] = useState(0);
  const [fight, setFight] = useState(false);
  const [prepare, setPrepare] = useState(false);
  const [position, setPosition] = useState('relative z-10');
  const [opponents, setOpponents] = useState([]);
  const [first, setFirst] = useState(false);
  const [master, setMaster] = useState({});
  const [winer, setWiner] = useState(false);
  const [looser, setLooser] = useState(false);

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
  const [player, comp] = opponents;

  const masterAuth = async (m) => {
    await axios({
      method: 'post',
      url: 'https://pokefight-group3-backend.herokuapp.com/master-auth',
      data: {
        email: m.email,
        family_name: m.family_name,
        given_name: m.given_name,
        name: m.name,
        picture: m.picture,
        score: 0,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    });
  };

  const damage = () => {
    setTimeout(() => {
      let attaker = first ? comp : player;
      let defender = first ? player : comp;
      let defenderHealth = defender.base.HP;
      const atk = attaker.base.Attack;
      const def = defender.base.Defense;
      const hp = defender.base.HP;
      const speed = attaker.base.Speed;
      if (defenderHealth > 0) {
        const hitValue = Math.floor((((2 * hp) / 5 + 2) * speed * (atk / def)) / 50 + 2);
        setTimeout(() => {
          setOpponents((prev) => [
            ...prev,
            (prev[first ? 0 : 1].base.HP = defenderHealth - hitValue),
          ]);
        }, 3000);
      }
    }, 1500);
  };

  const handleCallbackResponse = async (response) => {
    let masterObj = jwt_decode(response.credential);
    setMaster(masterObj);
    setTimeout(() => {
      masterAuth(masterObj);
    }, 3000);
  };

  const handleSignOut = (event) => {
    setMaster({});
  };

  useEffect(() => {
    setTimeout(() => {
      if (opponents.length > 1) {
        if (opponents[0].base.HP < 1) {
          setWiner(true);
        }
        if (opponents[1].base.HP < 1) {
          setLooser(true);
        }
      }
    }, 2500);
  }, [opponents]);

  const you = 'win';
  const notYou = 'loose';

  useEffect(() => {
    // eslint-disable-next-line no-undef
    google.accounts.id.initialize({
      client_id: '106525054597-ug5pjadbt9n67ikmijn8desg4idflt89.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    // eslint-disable-next-line no-undef
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);

  useEffect(() => {
    const getCard = async () => {
      await axios
        .get(`https://pokefight-group3-backend.herokuapp.com/pokedex/${randomPoke}`)
        .then((response) => {
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
      <div className="app bg-my-image">
        {master.name === undefined ? (
          <StartPage master={master} />
        ) : (
          <>
            {!confirm ? (
              <p className="text-center m-[50px] text-5xl font-bold">
                Welcome Master {master.given_name}
              </p>
            ) : fight ? (
              <h1 className="text-center m-[50px] text-5xl font-bold">Turn {turnCounter}</h1>
            ) : (
              <h1 className="text-center m-[50px] text-5xl font-bold">Click button Start</h1>
            )}
            {card ? (
              <div className={position}>
                <MoveAnimation
                  first={first}
                  card={card}
                  imageNum={imageUrl}
                  setImageUrl={setImageUrl}
                  toggle={confirm}
                  fight={fight}
                  turnCounter={turnCounter}
                />
              </div>
            ) : (
              <p>Loading</p>
            )}
            {confirm ? <StatsAnimation player={card} /> : null}
            {winer ? <WinerWindow winer={notYou} /> : null}
            {looser ? <WinerWindow winer={you} /> : null}
            <SelectComponent setRandomPoke={setRandomPoke} toggle={confirm} />
            <div className="absolute top-[238px] right-[250px] mr-[200px] scale(0.8, 0.8)">
              <AppearanceAnimation
                toggle={confirm}
                fight={fight}
                first={first}
                turnCounter={turnCounter}
              />
            </div>
            {!prepare ? (
              <animated.div style={FadeOut}>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center"
                    onClick={() => {
                      setConfirm((con) => !con);
                      setTimeout(() => setPrepare(true), 1500);
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
                      setFirst(!first);
                      setTurnCounter(turnCounter + 1);
                    }}>
                    FIGHT
                  </button>
                </div>
              </animated.div>
            ) : null}
          </>
        )}
      </div>
    </FightContext.Provider>
  );
};

export default App;

export const FightContext = createContext([]);
