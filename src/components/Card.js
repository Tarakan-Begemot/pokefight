import React, { useState, useEffect } from 'react';
import typesBG from './typesBG';
import Sword from './card-images/icons8-sword-50.png';
import Shield from './card-images/icons8-shield-50.png';
import Health from './card-images/icons8-heart-60.png';
import Speed from './card-images/icons8-next-page-64.png';
import SpAttack from './card-images/icons8-star-50.png';
import SpDefense from './card-images/icons8-query-50.png';
import { useSpring, animated, config } from 'react-spring';

const Card = ({ card, imageNum }) => {
  // console.log(card);
  // const [cardNum, setCardNum] = useState();

  const infoStyle = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: false,
    reverse: false,
    delay: 800,
    config: config.molasses,
  });

  const imageStyle = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: false,
    reverse: false,
    delay: 1000,
    config: config.molasses,
  });

  const pokeballStyle = useSpring({
    to: { opacity: 0 },
    from: { opacity: 1 },
    reset: false,
    reverse: false,
    delay: 800,
    config: config.molasses,
  });
  const DataValueAnimation = (num) => {
    const { number } = useSpring({
      reverse: false,
      from: { number: 0 },
      number: num,
      delay: 800,
      config: config.molasses,
    });
    return number;
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCardNum(imageNum);
  //     console.log(imageNum);
  //   });
  // }, []);

  return (
    <div className="flex justify-center">
      <div className="rounded-[30px] shadow-2xl bg-white max-w-sm">
        <div className="mx-auto bg-amber-300 p-10 rounded-t-[30px] min-h-[384px] min-w-[384px]">
          {imageNum !== '' ? (
            <animated.div style={imageStyle}>
              <img
                className="rounded-t-lg"
                src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${imageNum}.png`}
                alt=""
              />
            </animated.div>
          ) : (
            <animated.div className="mt-10" style={pokeballStyle}>
              <img
                className="rounded-t-lg m-auto"
                src={'https://thumbs.gfycat.com/DampSpanishCleanerwrasse.webp'}
                alt=""
              />
            </animated.div>
          )}
        </div>
        <div className="p-6 relative border-solid border-2 border-black rounded-b-[30px] ">
          <animated.h1
            className="text-gray-900 text-[32px] font-black my-2 text-center"
            style={infoStyle}>
            {card.name.english}
          </animated.h1>
          <animated.div className="flex justify-items-center px-10" style={infoStyle}>
            {card.type.map((type, index) => (
              <div
                className={
                  typesBG(type) + ' flex-1 px-2 py-2 rounded-lg shadow-lg text-center mx-2 mb-2'
                }
                key={index}>
                <span className="font-medium">{type}</span>
              </div>
            ))}
          </animated.div>
          <animated.div
            className="flex justify-around text-center m-4 p-2 mb-8 bg-slate-200 rounded-lg shadow-lg"
            style={infoStyle}>
            <img src={SpAttack} alt="" className="w-5 h-5 my-auto" />
            <span className="my-auto font-medium">Sp. Attack: {card.base['Sp. Attack']}</span>
            <img src={SpDefense} alt="" className="w-5 h-5 my-auto" />
            <span className="my-auto font-medium">Sp. Defense:{card.base['Sp. Defense']}</span>
          </animated.div>
          <div className="absolute top-0 left-0 flex">
            <div className="border rounded-full shadow-lg m-2">
              <img src={Health} alt="sword" className="w-8" />
            </div>
            <div className="my-2">
              {' '}
              <animated.p className="text-xl my-auto w-100%">
                {DataValueAnimation(card.base.HP).to((n) => n.toFixed(0))}
              </animated.p>
            </div>
          </div>
          <div className="absolute top-0 right-0 flex">
            <div className="my-2">
              {' '}
              <animated.p className="text-xl my-auto w-100%">
                {DataValueAnimation(card.base.Speed).to((n) => n.toFixed(0))}
              </animated.p>
            </div>
            <div className="border rounded-full shadow-lg m-2">
              <img src={Speed} alt="sword" className="w-8" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 flex">
            <div className="border rounded-full shadow-lg m-2">
              <img src={Sword} alt="sword" className="w-8" />
            </div>
            <div className="my-2">
              {' '}
              <animated.p className="text-xl my-auto w-100%">
                {DataValueAnimation(card.base.Attack).to((n) => n.toFixed(0))}
              </animated.p>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 flex">
            <div className="my-2">
              {' '}
              <animated.p className="text-xl my-auto w-100%">
                {DataValueAnimation(card.base.Defense).to((n) => n.toFixed(0))}
              </animated.p>
            </div>
            <div className="border rounded-full shadow-lg m-2">
              <img src={Shield} alt="sword" className="w-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
