class ColiseumField {
  constructor(fieldString, required, shape) {
    this.fieldString = fieldString;
    this.required = required;

    if (shape && fieldString === 'object') {
      this.shape = shape;
    }

    if (!required) {
      this.isRequired = new ColiseumField(fieldString, true, shape);
    }
  }

  get() {
    return this.fieldString;
  }
}

const string = new ColiseumField('string', false);
const array = new ColiseumField('array', false);
const number = new ColiseumField('number', false);
const object = new ColiseumField('object', false);

function shapeOf(shape) {
  Object.keys(shape).forEach((key) => {
    if (!(shape[key] instanceof ColiseumField)) {
      throw new Error(`The field ${key} isn't an instance of ColiseumField!`);
    }
  });

  return new ColiseumField('object', false, shape);
}

export default {
  ColiseumField,
  string,
  array,
  number,
  object,
  shapeOf,
};

