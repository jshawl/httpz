var mongoose = require("mongoose");
module.exports = function(cb) {
  const { NODE_ENV, MONGODB_URI } = process.env;

  console.log('starting')
  mongoose.set("debug", NODE_ENV !== "production");
  mongoose.connect(
    MONGODB_URI,
    {},
    function(err) {
      if (err) console.log("error", err);
      if (typeof cb == "function") {
        cb(mongoose);
      }
    }
  );
};
