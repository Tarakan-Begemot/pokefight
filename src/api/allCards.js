// import axios from 'axios';

// const allCards = (setter) => {
//   axios.get(`https://pokefight-group3-backend.herokuapp.com/pokedex/`).then((response) => {
//     setter(response.data);
//   });
// };

// export default allCards;
import axios from 'axios';

const getCard = async (setter, randomPoke) => {
  const { data } = await axios.get(
    `https://pokefight-group3-backend.herokuapp.com/pokedex/${randomPoke}`,
  );
  setter(data);
};

export default getCard;
