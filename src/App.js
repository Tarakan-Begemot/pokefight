import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import MoveAnimation from './components/MoveAnimation';
import SearchInput from './components/SearchInput';
import SelectComponent from './components/SelectComponent';

const App = () => {
  const [card, setCard] = useState();
  const [randomPoke, setRandomPoke] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [confirm, setConfirm] = useState(false);

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
        <MoveAnimation card={card} imageNum={imageUrl} setImageUrl={setImageUrl} toggle={confirm} />
      ) : (
        <p>Loading</p>
      )}
      <SelectComponent />
      <button
        className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setRandomPoke(Math.floor(Math.random() * 810));
        }}>
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
          className="mt-[660px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center"
          onClick={() => setConfirm((con) => !con)}>
          CONFIRM
        </button>
      </div>
      POKE FIGHT
    </div>
  );
};

export default App;
