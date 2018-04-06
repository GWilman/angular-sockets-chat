function globalToJSON(schema) {
  schema.set('toJSON', {
    getters: true,
    virtuals: true,
    transform(obj, json) {
      delete json.id;
      delete json.__v;
      delete json.password;
      delete json.passwordConfirmation;
    }
  });
}

module.exports = globalToJSON;
