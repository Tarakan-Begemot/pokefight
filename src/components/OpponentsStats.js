import { useState, useContext } from 'react';
import Sword from './card-images/icons8-sword-50.png';
import Shield from './card-images/icons8-shield-50.png';
import Health from './card-images/icons8-heart-60.png';
import Speed from './card-images/icons8-next-page-64.png';
import { FightContext } from '../App';

const OpponentsStats = () => {
  const opponents = useContext(FightContext);
  const [opponentsStats, setOpponentsStats] = useState(opponents.opponents);

  const images = [Health, Speed, Sword, Shield];

  return (
    <>
      <div className="w-[384px] border text-5xl p-5 absolute left-[768px] top-[200px] mt-[80px] shadow-xl rounded-lg">
        <p className="text-center mb-2">Fighters Stats</p>
        <div className="flex text-7xl">
          <div className="w-[40%] text-right p-2">
            <p>{opponentsStats[0].base.HP}</p>
            <p>{opponentsStats[0].base.Speed}</p>
            <p>{opponentsStats[0].base.Attack}</p>
            <p>{opponentsStats[0].base.Defense}</p>
          </div>

          <div className="w-[20%] p-2">
            {images.map((img, index) => (
              <div key={index} className="h-[72px]">
                <img src={img} alt="" className="m-auto mt-[4px]" />
              </div>
            ))}
          </div>
          <div className="w-[40%] p-2 text-7xl">
            <p>{opponentsStats[1].base.HP}</p>
            <p>{opponentsStats[1].base.Speed}</p>
            <p>{opponentsStats[1].base.Attack}</p>
            <p>{opponentsStats[1].base.Defense}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpponentsStats;
