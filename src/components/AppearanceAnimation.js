import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import Card from './Card';
import axios from 'axios';

const AppearanceAnimation = ({ toggle }) => {
  const [compCard, setCompCard] = useState();
  const [compImageUrl, setCompImageUrl] = useState();
  const [compRandomPoke, setCompRandomPoke] = useState(Math.floor(Math.random() * 810));

  const movingCard = useSpring({
    // from: { scale: 1 },
    to: {
      transition: 'transform 2s',
      transform: toggle ? 'scale(0.8, 0.8)' : 'scale(0, 0)',
    },
  });

  useEffect(() => {
    const getCard = async () => {
      await axios.get(`http://localhost:3476/pokedex/${compRandomPoke}`).then((response) => {
        setCompCard(response.data[0]);
      });
    };
    const pokeImage = () => {
      setTimeout(() => {
        const zerofilled = ('000' + compRandomPoke).slice((compRandomPoke + '').length);
        setCompImageUrl(zerofilled);
      }, 700);
    };
    console.log(toggle);
    getCard();
    pokeImage();
  }, [compRandomPoke]);
  return compCard && compImageUrl ? (
    <animated.div style={movingCard} className="damage-taken">
      <Card card={compCard} toggle={toggle} imageNum={compImageUrl} />
    </animated.div>
  ) : null;
};

export default AppearanceAnimation;
