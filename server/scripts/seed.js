const mongoose = require("mongoose");
require("dotenv").config();

const databaseUri = process.env.DATABASE_URI;

mongoose.connect(databaseUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Article = mongoose.model(
  "Article",
  new mongoose.Schema({
    title: String,
    content: String,
  })
);

mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB for seeding");

  // Clear existing data
  await Article.deleteMany({});

  // Seed new data
  await Article.create([
    { title: "Article 1", content: "Content for article 1" },
    { title: "Article 2", content: "Content for article 2" },
  ]);

  console.log("Seeding completed");
  process.exit(0);
});
