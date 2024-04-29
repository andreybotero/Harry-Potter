const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "harry_potter",
  password: "ds564",
  PORT: 5432,
});

app.use(express.json());

// CRUD DOS BRUXOS

// get all bruxos

app.get("/bruxos", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM bruxos");
    res.json(rows);
  } catch (error) {
    res.json({ error: error.message }, { message: "Erro ao buscar bruxos" });
  }
});

// get bruxo by id

app.get("/bruxos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM bruxos WHERE id = $1", [
      id,
    ]);
    res.json(rows);
  } catch (error) {
    res.json({ error: error.message }, { message: "Erro ao buscar bruxo" });
  }
});

// create bruxo

let sangues = ["Puro", "Mestiço", "Trouxa"];
let casas = ["Grifinória", "Sonserina", "Corvinal", "Lufa-Lufa"];

app.post("/bruxos", async (req, res) => {
  const {
    nome_bruxo,
    idade,
    casa,
    habilidade_especial,
    status_sangue,
    patrono,
  } = req.body;

  if (!sangues.includes(status_sangue)) {
    return res.json({
      message: "Status de sangue inválido. (Puro, Mstiço, Trouxa) ",
    });
  }

  if (!casas.includes(casa)) {
    return res.json({
      message: "Casa inválida. (Grifinória, Sonserina, Corvinal, Lufa-Lufa",
    });
  }

  try {
    const { rows } = await pool.query(
      "INSERT INTO bruxos (nome_bruxo, idade, casa, habilidade_especial, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [nome_bruxo, idade, casa, habilidade_especial, status_sangue, patrono]
    );
    res.json(rows);
  } catch (error) {
    res.json({ error: error.message }, { message: "Erro ao criar bruxo" });
  }
});

// update bruxo

app.put("/bruxos/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nome_bruxo,
    idade,
    casa,
    habilidade_especial,
    status_sangue,
    patrono,
  } = req.body;

  if (!sangues.includes(status_sangue)) {
    return res.json({
      message: "Status de sangue inválido. (Puro, Mstiço, Trouxa) ",
    });
  }

  if (!casas.includes(casa)) {
    return res.json({
      message: "Casa inválida. (Grifinória, Sonserina, Corvinal, Lufa-Lufa",
    });
  }

  try {
    const { rows } = await pool.query(
      "UPDATE bruxos SET nome_bruxo = $1, idade = $2, casa = $3, habilidade_especial = $4, status_sangue = $5, patrono = $6 WHERE id = $7 RETURNING *",
      [nome_bruxo, idade, casa, habilidade_especial, status_sangue, patrono, id]
    );
    res.json(rows);
  } catch (error) {
    res.json({ error: error.message }, { message: "Erro ao atualizar bruxo" });
  }
});

// delete bruxo

app.delete("/bruxos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query("DELETE FROM bruxos WHERE id = $1", [
      id,
    ]);
    if (rowCount === 0) {
      res.status(404).json({ message: "Nenhum bruxo encontrado para deletar" });
    } else {
      res.json({ message: "Bruxo deletado com sucesso" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao deletar bruxo", message: error.message });
  }
});

// CRUD DAS VARINHAS

// get all varinhas

app.get("/varinhas", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM varinhas");
    res.json(rows);
  } catch (error) {
    res.json({ error: error.message }, { message: "Erro ao buscar varinhas" });
  }
});

// get varinha by id

app.get("/varinhas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM varinhas WHERE id = $1", [
      id,
    ]);
    res.json(rows);
  } catch (error) {
    res.json({ error: error.message }, { message: "Erro ao buscar varinha" });
  }
});

// create varinha, data_fabricacao = ano

app.post("/varinhas", async (req, res) => {
  const { material, comprimento, nucleo, data_fabricacao } = req.body;

  try {
    const { rows } = await pool.query(
      "INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4) RETURNING *",
      [material, comprimento, nucleo, data_fabricacao]
    );
    res.json(rows);
  } catch (error) {
    res.json({ error: error.message }, { message: "Erro ao criar varinha" });
  }
});

// update varinha

app.put("/varinhas/:id", async (req, res) => {
  const { id } = req.params;
  const { material, comprimento, nucleo, data_fabricacao } = req.body;

  try {
    const { rows } = await pool.query(
      "UPDATE varinhas SET material = $1, comprimento = $2, nucleo = $3, data_fabricacao = $4 WHERE id = $5 RETURNING *",
      [material, comprimento, nucleo, data_fabricacao, id]
    );
    res.json(rows);
  } catch (error) {
    res.json(
      { error: error.message },
      { message: "Erro ao atualizar varinha" }
    );
  }
});

// delete varinha

app.delete("/varinhas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM varinhas WHERE id = $1",
      [id]
    );
    if (rowCount === 0) {
      res
        .status(404)
        .json({ message: "Nenhuma varinha encontrada para deletar" });
    } else {
      res.json({ message: "Varinha deletada com sucesso" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao deletar varinha", message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
