// import Coliseum from './classes/Coliseum';
import ColiseumProps from './classes/ColiseumProps';

// const app = new Coliseum({ dbHost: '' });

const person = ColiseumProps.shapeOf({
  name: ColiseumProps.string.isRequired,
  age: ColiseumProps.number,
  address: ColiseumProps.shapeOf({
    street: ColiseumProps.string.isRequired,
    number: ColiseumProps.number.isRequired,
  }).isRequired,
  cell: ColiseumProps.arrayOf([
    ColiseumProps.string,
  ]),
});

console.log(person.is({ name: 'Gabriel', age: 20, address: { street: 'rua', number: 404 } }));
console.log(ColiseumProps.array.is([]));
