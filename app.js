var express = require("express");
var mongoose = require("mongoose");

// Require all models
var db = require("./models");
console.log(db);

// Connect to MongoDB
mongoose.connect("mongodb://localhost/librarydb", { useNewUrlParser: true },{useUnifiedTopology: true });
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

var PORT = 3000;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public static folder
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.send("Hello from demo app!");
  });
// Routes
app.get("/books", function(req,res) {
    db.Book.find({})
    .then(function(dbBooks) {
      res.json(dbBooks);
    })
    .catch(function(err) {
      res.json(err);
    })
  });

  // Route to get all reviews
app.get("/authors", function(req,res) {
    db.Author.find({})
    .then(function(dbAuthors) {
      res.json(dbAuthors);
    })
    .catch(function(err) {
      res.json(err);
    })
  });

  // Route for creating a new Product
app.post("/book", function(req, res) {
    db.Book.create(req.body)
      .then(function(dbBook) {
        // If we were able to successfully create a Product, send it back to the client
        res.json(dbBook);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for creating a new Review and updating Product "review" field with it
app.post("/book/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Author.create(req.body)
      .then(function(dbAuthor) {
        // If a Review was created successfully, find one Product with an `_id` equal to `req.params.id`. Update the Product to be associated with the new Review
        // { new: true } tells the query that we want it to return the updated Product -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Book.findOneAndUpdate({ _id: req.params.id }, { author: dbAuthor._id }, { new: true });
      })
      .then(function(dbBook) {
        // If we were able to successfully update a Product, send it back to the client
        res.json(dbBook);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for retrieving a Product by id and populating it's Review.
app.get("/books/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Book.findOne({ title: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("author")
      .then(function(dbBook) {
        // If we were able to successfully find an Product with the given id, send it back to the client
        res.json(dbBook);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.get("/booksgen/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Book.find({ genre: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("author")
      .then(function(dbBook) {
        // If we were able to successfully find an Product with the given id, send it back to the client
        res.json(dbBook);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });




// Start the server
app.listen(PORT, function() {
  console.log("Listening on port " + PORT + ".");
});