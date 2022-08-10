import data from "./poke.json";

const [opponent1, opponent2] = data
//console.log("attack", poke1.base.Attack);

const atk = opponent1.base.Attack;
const defs = opponent2.base.Defense;
const hp = opponent2.base.HP;
const speed = opponent1.base.Speed;


const damage = (hp, speed, atk, defs) => {
  return Math.floor((((2 * hp) / 5 + 2) * speed * (atk / defs)) / 50 + 2);
};

console.log(damage(hp, speed, atk, defs));
