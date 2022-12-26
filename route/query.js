const router = require("express").Router();
let mysql = require("mysql");
let config = require("../config.js");
let connection = mysql.createConnection(config);

router.get("/longest-duration-movies", async (req, res) => {
  let sql = `SELECT  tconst, primaryTitle, runtimeMinutes , genres FROM movies ORDER BY runtimeMinutes DESC LIMIT 10`;
  try {
    connection.query(sql, [true], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }

      res.status(200).json(results);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/new-movie", async (req, res) => {
  try {
    const tconst = mysql.escape(req.body.tconst);
    const titleType = mysql.escape(req.body.titleType);
    const primaryTitle = mysql.escape(req.body.primaryTitle);
    const runtimeMinutes = mysql.escape(req.body.runtimeMinutes);
    const genres = mysql.escape(req.body.genres);
    const averageRating = mysql.escape(req.body.averageRating);
    const numVotes = mysql.escape(req.body.numVotes);

    const sql = `INSERT INTO movies (tconst, titleType, primaryTitle, runtimeMinutes, genres) VALUES (${tconst}, ${titleType}, ${primaryTitle}, ${runtimeMinutes}, ${genres})`;
    const sql2 = `INSERT INTO ratings (tconst, averageRating, numVotes) VALUES (${tconst}, ${averageRating}, ${numVotes})`;
    // Execute the INSERT statement
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.error(error);
      }
    });
    connection.query(sql2, function (error, results, fields) {
      if (error) {
        console.error(error);
      }
    });

    res.status(200).json("success");
    // connection.end();
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/top-rated-movies", async (req, res) => {
  let sql = `SELECT movies.tconst, primaryTitle, genres , averageRating FROM movies INNER JOIN ratings ON movies.tconst=ratings.tconst WHERE averageRating > 6 ORDER BY averageRating`;
  try {
    connection.query(sql, [true], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }

      res.status(200).json(results);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
