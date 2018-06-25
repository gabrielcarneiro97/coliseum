import ColiseumProps from './ColiseumProps';

class ColiseumModel {
  constructor(data) {
    if (typeof data !== 'object') {
      throw new Error('The ColiseumModel argument must be a flat object or an instance of the ColiseumField class');
    } else if (!(data instanceof ColiseumProps.ColiseumField)) {
      Object.keys(data).forEach((key) => {
        if (!(data[key] instanceof ColiseumProps.ColiseumField)) {
          throw new Error(`The field ${key} isn't an instance of ColiseumField!`);
        }
      });
    }
    this.flatData = data;
  }
}

export default ColiseumModel;
