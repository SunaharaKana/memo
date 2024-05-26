const express = require("express");

const app = express();

const sqlite3 = require("sqlite3");

const path = require("path");
const bodyParser = require("body-parser");
const { rejects } = require("assert");

const dbPath = "app/db/database.sqlite3";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/showdata/", (req, res) => {
  // Connect database
  const db = new sqlite3.Database(dbPath);

  db.all(`SELECT * FROM Memo`, (err, rows) => {
    res.json(rows);
  });

  db.close();
});

app.post("/", async (req, res) => {
  if (!req.body.name || req.body.name === "") {
    res.status(400).send({ error: "ユーザー名が指定されていません。" });
  }
  {
    const db = new sqlite3.Database(dbPath);

    const title = req.body.title;
    const memo = req.body.profile ? req.body.profile : "";

    try {
      await run(
        `insert into Memo (title, memo) values("${title}", "${memo}");`,
        db
      );
      res.status(201).send({ message: "新規メモを作成しました。" });
    } catch (e) {
      res.status(500).send({ error: e });
    }

    db.close();
  }
});
