import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';

const App = () => {
  const [card, setCard] = useState();
  const [randomPoke, setRandomPoke] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [confirm, setConfirm] = useState(false);

  const cardDiv = document.getElementById('player-card');
  // const cardProperty = window.getComputedStyle(cardDiv, null);
  console.log(cardDiv);

  const confirmProps = useSpring({
    // opacity: confirm ? 1 : 0,
    // marginTop: confirm ? 0 : -500,
  });

  useEffect(() => {
    const getCard = async () => {
      await axios.get(`http://localhost:3476/pokedex/${randomPoke}`).then((response) => {
        setCard(response.data[0]);
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
    <div className="app">
      POKE FIGHT
      {card ? (
        <animated.div style={confirmProps} id="player-card">
          <Card card={card} imageNum={imageUrl} setImageUrl={setImageUrl} />{' '}
        </animated.div>
      ) : (
        <p>Loading</p>
      )}
      <button
        className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          // window.location.reload(false)
          {
            setRandomPoke(Math.floor(Math.random() * 810));
          }
        }>
        RANDOM
      </button>
      {/* <button
        className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          // window.location.reload(false)
          console.log(imageUrl)
        }>
        LOG
      </button> */}
      <div className="flex justify-center">
        {' '}
        <button
          className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center"
          onClick={() => setConfirm((con) => !con)}>
          CONFIRM
        </button>
      </div>
      POKE FIGHT
    </div>
  );
};

export default App;
