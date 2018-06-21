class ColiseumField {
  constructor(fieldString) {
    this.fieldString = fieldString;
  }

  get() {
    return this.fieldString;
  }

  static String() {
    return new ColiseumField('String');
  }

  static Array() {
    return new ColiseumField('Array');
  }

  static Number() {
    return new ColiseumField('Number');
  }
}

export default ColiseumField;
