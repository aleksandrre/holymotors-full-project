const mongoose = require("mongoose");
require("dotenv").config();

const databaseUri = process.env.DATABASE_URI;

mongoose.connect(databaseUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB for migration");

  // Define your migration logic here
  // For example, create a new collection or update documents

  console.log("Migration completed");
  process.exit(0);
});
