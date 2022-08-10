import { useState } from 'react';

const PokeList = ({ localDex, inputName, setRandomPoke }) => {
  const [pokeList, setPokeList] = useState([localDex]);

  const filteredList = pokeList[0].filter(
    (el) => el.name.english.toLowerCase().startsWith(inputName.toLowerCase()) === true,
  );

  const settingPokeIndex = (i) => {
    setRandomPoke(i);
  };

  console.log(filteredList);
  return (
    <div className="text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white my-4 mx-[50px] overflow-auto max-h-[536px]">
      {filteredList.map((poke, index) => (
        <button
          key={index}
          type="button"
          className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
          onClick={() => settingPokeIndex(poke.id)}>
          {poke.name.english}
        </button>
      ))}
    </div>
  );
};

export default PokeList;
