// import Coliseum from './classes/Coliseum';
import ColiseumProps from './classes/ColiseumProps';

// const app = new Coliseum({ dbHost: '' });

const person = ColiseumProps.shapeOf({
  name: ColiseumProps.string.isRequired,
  age: ColiseumProps.number.isRequired,
});

console.log(ColiseumProps.string.isNullable.is(null));
