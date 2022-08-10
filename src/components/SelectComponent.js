import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import PokeList from './PokeList';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';

const SelectComponent = ({ setRandomPoke, toggle }) => {
  const [inputName, setInputName] = useState('');
  const [cards, setCards] = useState([]);

  const localDex = JSON.parse(localStorage.getItem('localDex'));

  const hideElement = useSpring({
    to: { transition: 'opacity 2s', opacity: toggle ? 0 : 1 },
  });

  useEffect(() => {
    const getCards = async () => {
      if (localDex === null) {
        await axios.get(`http://localhost:3476/pokedex/`).then((response) => {
          localStorage.setItem('localDex', JSON.stringify(response.data));
        });
      }
    };
    getCards();
  }, [cards]);
  return (
    <animated.div style={hideElement}>
      <div className="max-w-[384px] m-5 h-[636px] ml-[200px]">
        <SearchInput setInputName={setInputName} />
        {/* <PokeList /> */}
        <PokeList localDex={localDex} inputName={inputName} setRandomPoke={setRandomPoke} />
        {/* <button onClick={() => console.log(localDex)}>Click</button> */}
        <button
          className=" mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setRandomPoke(Math.floor(Math.random() * 810));
          }}>
          RANDOM
        </button>
      </div>
    </animated.div>
  );
};

export default SelectComponent;
