CREATE DATABASE harry_potter;

CREATE TABLE bruxos (
  id SERIAL PRIMARY KEY,
  nome_bruxo VARCHAR(100) NOT NULL,
  idade INTEGER NOT NULL,
  casa VARCHAR(50),
  habilidade_especial VARCHAR(100) NOT NULL,
  status_sangue VARCHAR(50) NOT NULL,
  patrono VARCHAR(100)
);

CREATE TABLE varinhas (
  id SERIAL PRIMARY KEY,
  material VARCHAR(100) NOT NULL,
  comprimento DECIMAL NOT NULL,
  nucleo VARCHAR(100) NOT NULL,
  data_fabricacao DATE NOT NULL
);

--Teste dos bruxos
INSERT INTO
  bruxos (
    nome_bruxo,
    idade,
    casa,
    habilidade_especial,
    status_sangue,
    patrono
  )
VALUES
  (
    'Harry Potter',
    17,
    'Grifinória',
    'Voar em uma vassoura',
    'Mestiço',
    'Cervo'
  );

--Teste das varinhas
INSERT INTO
  varinhas (material, comprimento, nucleo, data_fabricacao)
VALUES
  (
    'Madeira de Teixo',
    30,
    'Pena de Fênix',
    '1991-07-31'
  );