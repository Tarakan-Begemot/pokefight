import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import Card from './Card';

const CompAnimationSwich = ({ toggle, setImageUrl, imageNum, card, fight }) => {
  const [attackStyle, setAttackStyle] = useState(false);
  const [damageTakenStyle, setDamageTakenStyle] = useState(false);

  useEffect(() => {
    fight ? setDamageTakenStyle('damage-taken') : setDamageTakenStyle(false);
  }, [fight]);

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
