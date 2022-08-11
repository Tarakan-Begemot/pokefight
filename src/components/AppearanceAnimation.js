import { useState, useEffect, useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import CompAnimationSwich from './CompAnimationSwich';
import Card from './Card';
import axios from 'axios';
import { FightContext } from '../App';

const AppearanceAnimation = ({ toggle, fight, first, turnCounter }) => {
  const [compCard, setCompCard] = useState();
  const [compImageUrl, setCompImageUrl] = useState();
  const [compRandomPoke, setCompRandomPoke] = useState(Math.floor(Math.random() * 810));
  const [attackStyle, setAttackStyle] = useState(false);
  const [damageTakenStyle, setDamageTakenStyle] = useState(false);

  const movingCard = useSpring({
    to: {
      transition: 'transform 2s',
      transform: toggle ? 'scale(0.8, 0.8)' : 'scale(0, 0)',
    },
  });
  const opponents = useContext(FightContext);

  useEffect(() => {
    const getCard = async () => {
      await axios.get(`http://localhost:3476/pokedex/${compRandomPoke}`).then((response) => {
        setCompCard(response.data[0]);
        setTimeout(() => {
          opponents.setOpponents((prev) => [...prev, response.data[0]]);
        }, 1000);
      });
    };
    const pokeImage = () => {
      setTimeout(() => {
        const zerofilled = ('000' + compRandomPoke).slice((compRandomPoke + '').length);
        setCompImageUrl(zerofilled);
      }, 700);
    };
    console.log('proverka');
    getCard();
    pokeImage();
    // }
  }, []);

  return compCard && compImageUrl ? (
    <animated.div style={movingCard}>
      <CompAnimationSwich
        card={compCard}
        toggle={toggle}
        imageNum={compImageUrl}
        attackStyle={attackStyle}
        damageTakenStyle={damageTakenStyle}
        fight={fight}
        first={first}
        turnCounter={turnCounter}
      />
    </animated.div>
  ) : null;
};

export default AppearanceAnimation;
