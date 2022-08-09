import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import PokeList from './PokeList';
import axios from 'axios';

const SelectComponent = () => {
  const [inputName, setInputName] = useState('');
  const [cards, setCards] = useState([]);

  const localDex = JSON.parse(localStorage.getItem('localDex'));

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
    <div className="max-w-[384px] m-5 h-[636px]">
      <SearchInput setInputName={setInputName} />
      {/* <PokeList /> */}
      <PokeList localDex={localDex} inputName={inputName} />
      <button onClick={() => console.log(localDex)}>Click</button>
    </div>
  );
};

export default SelectComponent;
