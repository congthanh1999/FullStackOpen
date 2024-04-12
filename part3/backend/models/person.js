const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log(`provide password`);
//   process.exit(1);
// }

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

console.log(`connecting to ${process.env.MONGODB_URI}`);

mongoose
  .connect(url)
  .then((result) => console.log(`connected to mongodb`))
  .catch((error) => console.log(`error connecting to mongodb`, error.message));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
