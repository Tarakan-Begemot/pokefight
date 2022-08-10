import { useSpring, animated } from 'react-spring';
import Card from './Card';

const MoveAnimation = ({ toggle, setImageUrl, imageNum, card }) => {
  const movingCard = useSpring({
    to: {
      transition: 'transform 2s',
      transform: toggle ? 'translateX(-500px) translateY(80px) scale(0.8, 0.8)' : '0',
    },
  });

  return (
    <animated.div style={movingCard}>
      <Card toggle={toggle} card={card} imageNum={imageNum} setImageUrl={setImageUrl} />
    </animated.div>
  );
};

export default MoveAnimation;
