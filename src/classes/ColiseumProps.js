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

  is(data) {
    if (data instanceof ColiseumField) {
      throw new Error('Method is expects anything except an instance of ColiseumField');
    } else {
      const dataType = typeof data;

      if (dataType === 'object' && this.fieldString === 'array') {
        if (Array.isArray(data)) {
          if (this.types) {
            for (let i = 0; i < data.length; i += 1) {
              const el = data[i];

              let someType = false;
              for (let iTypes = 0; iTypes < this.types.length; iTypes += 1) {
                const type = this.types[iTypes];

                if (type.is(el)) {
                  someType = true;
                  break;
                }
              }

              if (!someType) return false;

              someType = false;
            }
          }
          return true;
        }
      }
      if (dataType === 'object' && this.fieldString === 'object') {
        if (this.shape) {
          const dataKeys = Object.keys(data);
          const shapeKeys = Object.keys(this.shape);

          if ((dataKeys.length < shapeKeys.length) &&
            shapeKeys.find(elKey => this.shape[elKey].required && !dataKeys.includes(elKey))) {
            return false;
          }

          const diff = dataKeys.find((elKey) => {
            const el = data[elKey];
            const cField = this.shape[elKey];

            if (!cField.is(el)) return true;

            return false;
          });

          if (!diff) return true;

          return false;
        }
        return true;
      }

      return dataType === this.fieldString;
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

