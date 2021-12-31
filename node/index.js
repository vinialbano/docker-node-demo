const express = require("express");
const mysql = require("mysql");
const faker = require("faker");
const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

app.get("/", (req, res) => {
  const connection = mysql.createConnection(config);
  try {
    connection.query(
      `INSERT INTO people(name) values('${faker.name.findName()}')`,
      (error, result, fields) => {
        if (error) {
          throw error;
        }
        connection.query("SELECT * FROM people", (error, results, fields) => {
          if (error) {
            throw error;
          }
          const names = results.map((r) => `<li>${r.name}</li>`).join("");
          res.send(`<h1>Full Cycle Rocks!</h1><ul>${names}</ul>`);
          connection.end();
        });
      }
    );
  } catch (error) {
    res.send("<h1>Um erro ocorreu</h1>");
    console.log(error);
    connection.end();
  }
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
