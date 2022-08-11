import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import Card from './Card';

const CompAnimationSwich = ({ toggle, setImageUrl, imageNum, card, fight, first, turnCounter }) => {
  const [attackStyle, setAttackStyle] = useState(false);
  const [damageTakenStyle, setDamageTakenStyle] = useState(false);

  useEffect(() => {
    fight && !first ? setAttackStyle('player-attack-reverse') : setAttackStyle(false);
    fight && first ? setDamageTakenStyle('damage-taken') : setDamageTakenStyle(false);
  }, [turnCounter]);

  return (
    <Card
      toggle={toggle}
      card={card}
      imageNum={imageNum}
      setImageUrl={setImageUrl}
      attackStyle={attackStyle}
      damageTakenStyle={damageTakenStyle}
      fight={fight}
    />
  );
};

export default CompAnimationSwich;
