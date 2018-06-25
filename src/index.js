import Coliseum from './classes/Coliseum';
import ColiseumField from './classes/ColiseumField';

const app = new Coliseum({ dbHost: '' });

app.model(
  'Person',
  ColiseumField.shapeOf({
    name: ColiseumField.string.isRequired,
    age: ColiseumField.number.isRequired,
  }),
);

console.log(ColiseumField.shapeOf({
  name: ColiseumField.string.isRequired,
  age: ColiseumField.number.isRequired,
}).isRequired);
