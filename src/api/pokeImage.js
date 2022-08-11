import axios from 'axios';

const pokeImage = (setter, id) => {
  const zerofilled = ('000' + id).slice((id + '').length);
  axios
    .get(
      `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${zerofilled}.png`,
    )
    .then((response) => {
      setter(response.data);
    });
};

export default pokeImage;
