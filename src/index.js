import Coliseum from './classes/Coliseum';
import ColiseumProps from './classes/ColiseumProps';

// const app = new Coliseum({ dbHost: '' });

const person = ColiseumProps.shapeOf({
  name: ColiseumProps.string.isRequired,
  age: ColiseumProps.number,
  address: ColiseumProps.shapeOf({
    street: ColiseumProps.string.isRequired,
    number: ColiseumProps.number.isRequired,
  }),
  cell: ColiseumProps.arrayOf([
    ColiseumProps.string,
    ColiseumProps.number,
  ]).isRequired,
});

console.log(person.is({ name: 'Gabriel', age: 20, address: { street: 'rua', number: 404 } }));
console.log(person.is({ name: 'Gabriel', cell: ['11', 11] }));
