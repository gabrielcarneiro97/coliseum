import express from 'express';
import ColiseumModel from './ColiseumModel';
import ColiseumRouter from './ColiseumRouter';

class Coliseum {
  constructor({ dbHost }) {
    this.dbHost = dbHost;
    this.models = {};
    this.routers = {};
    this.expressApp = express();
    this.server = {
      close: () => {
        throw new Error('Server not started');
      },
    };
  }

  model(name, data, events) {
    this.models[name] = new ColiseumModel(data);
    this.routers[name] = new ColiseumRouter({
      routeName: name,
      expressApp: this.expressApp,
      events,
    });
  }

  start(port = 8080) {
    this.server = this.expressApp.listen(port, () => {
      console.log('Coliseum App listening at 8080');
    });
  }

  close() {
    this.server.close();
  }
}

export default Coliseum;
