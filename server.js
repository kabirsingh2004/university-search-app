import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = `http://universities.hipolabs.com`;

// Database Configuration
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Kabir@315116",
  database: "university_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.render("search");
});

app.post("/search", async (req, res) => {
  const { searchQuery } = req.body;

  const { data } = await axios.get(
    `${BASE_URL}/search?name=${searchQuery}&country=India`
  );

  res.render("search-results", { universities: data });
});

app.get("/favorites", async (req, res) => {
  try {
    const [favorites] = await pool.query(
      "SELECT * FROM Universities WHERE isFavorite = ?",
      [true]
    );
    res.render("favorites", { favorites });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/favorite", async (req, res) => {
  const { universityId, name, stateProvince, country, url } = req.body;

  try {
    // Check if the table exists
    const [tables] = await pool.query("SHOW TABLES LIKE 'Universities'");

    if (tables.length === 0) {
      // If the table doesn't exist, create it
      await pool.query(`
        CREATE TABLE Universities (
          id INT AUTO_INCREMENT PRIMARY KEY,
          universityId VARCHAR(255) UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          stateProvince VARCHAR(255) NOT NULL,
          country VARCHAR(255) NOT NULL,
          isFavorite BOOLEAN DEFAULT false,
          url VARCHAR(255) NOT NULL
        )
      `);
      console.log("Universities table created.");
    }

    // Check if the university is already in favorites
    const [existingUniversity] = await pool.query(
      "SELECT * FROM Universities WHERE universityId = ?",
      [universityId]
    );

    if (!existingUniversity.length) {
      // University not in favorites, proceed with INSERT or UPDATE
      await pool.query(
        "INSERT INTO Universities (universityId, name, stateProvince, country, isFavorite, url) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE isFavorite = ?",
        [universityId, name, stateProvince, country, true, url, true]
      );

      return res.send(`Marked ${name} as a favorite.`);
    } else {
      return res.send(`${name} is already in favorites.`);
    }

    // res.redirect("/favorites");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
