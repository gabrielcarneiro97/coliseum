import ColiseumField from './ColiseumField';

class ColiseumModel {
  constructor(data) {
    Object.keys(data).forEach((key) => {
      if (!(data[key] instanceof ColiseumField)) {
        throw new Error(`The field ${key} isn't an ColiseumField Tipe!`);
      }
    });

    this.flatData = data;
  }
}

export default ColiseumModel;
