import ColiseumField from './ColiseumField';

class ColiseumModel {
  constructor(data) {
    if ((data instanceof ColiseumField.ColiseumField)) {
      if (data.shape) {
        Object.keys(data.shape).forEach((key) => {
          if (!(data.shape[key] instanceof ColiseumField.ColiseumField)) {
            throw new Error(`The field ${key} isn't an instance of ColiseumField!`);
          }
        });
      }
    } else {
      Object.keys(data).forEach((key) => {
        if (!(data[key] instanceof ColiseumField.ColiseumField)) {
          throw new Error(`The field ${key} isn't an instance of ColiseumField!`);
        }
      });
    }
    this.flatData = data;
  }
}

export default ColiseumModel;
