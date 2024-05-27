const error = (err) => {
  if (err.errors) {
    for (var k in err.errors) return err.errors[k].message;
  }
  if (err.code) {
    for (var k in err.keyValue) return `"${err.keyValue[k]}" is already exist.`;
  }
  return err.message;
};

module.exports = error;
