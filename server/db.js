var mongoose = require("mongoose");
module.exports = function(cb) {
  const {NODE_ENV, MONGODB_URI} = process.env
  mongoose.set("debug", NODE_ENV === "development");
  mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/restful-link", {}, function(err) {
    if (err) console.log("error", err);
    if (typeof cb == "function") {
      cb(mongoose);
    }
  });
};
