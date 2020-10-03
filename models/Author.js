var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var AuthorSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  }
});

// Create model from the schema
var Author = mongoose.model("Author", AuthorSchema);

// Export model
module.exports = Author;