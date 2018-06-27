class ColiseumField {
  constructor(fieldString = '', required = false, shape = null, types = null, nullable = false) {
    this.fieldString = fieldString;
    this.required = required;
    this.nullable = !required || nullable;

    if (fieldString === 'object') {
      if (shape) {
        const notField = Object.keys(shape).find(key => !(shape[key] instanceof ColiseumField));

        if (notField) throw new Error(`${notField} isn't an instance of ColiseumField`);
        this.shape = shape;
      }

      if (!nullable && !required) {
        this.isNullable = new ColiseumField(fieldString, true, shape, types, true);
      }
    }

    if (types && fieldString === 'array') {
      this.types = types;
    }

    if (!required && !nullable) {
      this.isRequired = new ColiseumField(fieldString, true, shape, types, false);
    }
  }

  is(data) {
    if (data instanceof ColiseumField) {
      throw new Error('Method ColiseumField.is() expects anything except an instance of ColiseumField');
    } else {
      const dataType = typeof data;

      if (dataType === 'object' && this.fieldString === 'array') {
        if (Array.isArray(data)) {
          if (this.types) {
            const notListed = data.find(el => !this.types.find(type => type.is(el)));
            if (notListed) return false;
          }
          return true;
        }
      }
      if (dataType === 'object' && this.fieldString === 'object') {
        if (!data) {
          return this.nullable;
        } else if (this.shape) {
          const dataKeys = Object.keys(data);
          const shapeKeys = Object.keys(this.shape);

          if (dataKeys.length < shapeKeys.length) {
            const checkKeys = shapeKeys.find((elKey) => {
              const checkRequirement = this.shape[elKey].required && !dataKeys.includes(elKey);
              const checkNullability = this.shape[elKey].fieldString === 'object' && !this.shape[elKey].nullable && !data[dataKeys];

              return checkRequirement || checkNullability;
            });

            if (checkKeys) return false;
          }

          const diff = dataKeys.find((elKey) => {
            const el = data[elKey];
            const cField = this.shape[elKey];

            if (!cField) return true;
            return !cField.is(el);
          });

          return !diff;
        }
        return true;
      }

      if (!this.required && !data) {
        return true;
      }

      return dataType === this.fieldString;
    }
  }
}

function createField(type) {
  return new ColiseumField(type);
}

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
    throw new Error('The argument passed to arrayOf must be an array of ColiseumField instances');
  }
  types.forEach((type) => {
    if (!(type instanceof ColiseumField)) {
      throw new Error(`The type ${type} isn't an instance of ColiseumField!`);
    }
  });

  return new ColiseumField('array', false, null, types);
}

export default {
  ColiseumField,
  undef: createField('undefined'),
  bool: createField('boolean'),
  number: createField('number'),
  string: createField('string'),
  array: createField('array'),
  object: createField('object'),
  symbol: createField('symbol'),
  func: createField('function'),
  shapeOf,
  arrayOf,
};

