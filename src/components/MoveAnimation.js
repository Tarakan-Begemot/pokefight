import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import Card from './Card';

const MoveAnimation = ({ toggle, setImageUrl, imageNum, card, fight }) => {
  const [attackStyle, setAttackStyle] = useState(false);
  const [damageTakenStyle, setDamageTakenStyle] = useState(false);

  useEffect(() => {
    fight ? setAttackStyle('player-attack') : setAttackStyle(false);
    console.log(fight);
  }, [fight]);

  const movingCard = useSpring({
    to: {
      transition: 'transform 2s',
      transform: toggle ? 'translateX(-500px) translateY(80px) scale(0.8, 0.8)' : '0',
    },
  });

  return (
    <animated.div style={movingCard}>
      <Card
        toggle={toggle}
        card={card}
        imageNum={imageNum}
        setImageUrl={setImageUrl}
        attackStyle={attackStyle}
        damageTakenStyle={damageTakenStyle}
      />
    </animated.div>
  );
};

export default MoveAnimation;
