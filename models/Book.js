var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  edition: {
    type: String,
    required: true
  },
  genre : {
    type : String,
    required : true

  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author"
  }
});

// Create model from the schema
var Book = mongoose.model("Book", BookSchema);

// Export model
module.exports = Book;