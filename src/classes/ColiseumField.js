class ColiseumField {
  constructor(fieldString, required, shape, types) {
    this.fieldString = fieldString;
    this.required = required;

    if (shape && fieldString === 'object') {
      this.shape = shape;
    }

    if (types && fieldString === 'array') {
      this.types = types;
    }

    if (!required) {
      this.isRequired = new ColiseumField(fieldString, true, shape, types);
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

function arrayOf(types) {
  if (!Array.isArray(types)) {
    throw new Error('The argument passed to arrayOf must be an array of ColiseumFields');
  }
  types.forEach((type) => {
    if (!(type instanceof ColiseumField)) {
      throw new Error(`The type ${type} isn't an instance of ColiseumField!`);
    }
  });

  return new ColiseumField('array', false, undefined, types);
}

export default {
  ColiseumField,
  string,
  array,
  number,
  object,
  shapeOf,
  arrayOf,
};

