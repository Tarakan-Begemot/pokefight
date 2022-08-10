import OpponentsStats from './OpponentsStats';
import { useSpring, animated } from 'react-spring';

const StatsAnimation = ({ player }) => {
  const statsAppearance = useSpring({
    delay: 1500,
    from: {
      opacity: 0,
    },
    to: {
      transition: 'opacity 3s',
      opacity: 1,
    },
  });
  return (
    <animated.div style={statsAppearance}>
      <OpponentsStats player={player} />
    </animated.div>
  );
};
export default StatsAnimation;
