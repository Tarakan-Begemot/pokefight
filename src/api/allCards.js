// import axios from 'axios';

// const allCards = (setter) => {
//   axios.get(`http://localhost:3476/pokedex/`).then((response) => {
//     setter(response.data);
//   });
// };

// export default allCards;
import axios from 'axios';

const getCard = async (setter, randomPoke) => {
  const { data } = await axios.get(`http://localhost:3476/pokedex/${randomPoke}`);
  setter(data);
};

export default getCard;
