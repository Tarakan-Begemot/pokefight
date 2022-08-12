import { useState } from 'react';

const PokeList = ({ localDex, inputName, setRandomPoke }) => {
  const [pokeList, setPokeList] = useState([localDex]);

  const filteredList = pokeList[0].filter(
    (el) => el.name.english.toLowerCase().startsWith(inputName.toLowerCase()) === true,
  );

  const settingPokeIndex = (i) => {
    setRandomPoke(i);
  };

  return (
    <div className="min-h-[536px]">
      <div className="text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-amber-300 dark:border-gray-600 dark:text-black my-4 mx-[50px] overflow-auto max-h-[536px]">
        {filteredList.map((poke, index) => (
          <button
            key={index}
            type="button"
            className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium rounded-t-lg border-b border-gray-200 hover:bg-amber-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-amber-300 dark:hover:text-black dark:focus:ring-gray-500 dark:focus:text-green"
            onClick={() => settingPokeIndex(poke.id)}>
            {poke.name.english}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PokeList;
