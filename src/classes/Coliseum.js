import ColiseumModel from './ColiseumModel';

class Coliseum {
  constructor({ dbHost }) {
    this.dbHost = dbHost;
    this.models = {};
  }

  model(name, data) {
    this.models[name] = new ColiseumModel(data);
  }
}

export default Coliseum;
