import Coliseum from './classes/Coliseum';
import ColiseumField from './classes/ColiseumField';

const app = new Coliseum({ dbHost: '' });

app.model(
  'Test',
  { array: ColiseumField.Array(), string: ColiseumField.String() },
  {
    onGet: () => console.log('onGet'),
    onDelete: () => console.log('onDelete'),
  },
);

app.start();
app.close();
