var checks = {};

module.exports = (src, callback) => {
  if (src in checks) {
    return callback(checks[src]);
  }

  var image = new Image();

  image.onload = () => {
    checks[src] = true;
    callback(true);
  };

  image.onerror = () => {
    checks[src] = false;
    callback(false);
  };

  image.src = src;
};