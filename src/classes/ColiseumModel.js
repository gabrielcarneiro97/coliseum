import ColiseumProps from './ColiseumProps';

class ColiseumModel {
  constructor(data) {
    if (typeof data !== 'object') {
      throw new Error('The ColiseumModel argument must be a flat object or an instance of ColiseumField');
    } else if (!(data instanceof ColiseumProps.ColiseumField)) {
      if (Object.keys(data) === 0) throw new Error('The ColiseumModel argument must have some property');

      const notField = Object
        .keys(data)
        .forEach(key => !(data[key] instanceof ColiseumProps.ColiseumField));

      if (notField) throw new Error(`${notField} isn't an instance of ColiseumField`);
      this.shape = data;
    } else {
      this.shape = this.data.shape;
    }
  }
}

export default ColiseumModel;
