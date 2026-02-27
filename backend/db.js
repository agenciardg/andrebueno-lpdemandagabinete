import Database from "better-sqlite3";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, "data");

if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const dbPath = resolve(dataDir, "demandas.db");
const db = new Database(dbPath);

// Enable WAL mode for better concurrent read performance
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS demandas (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    nome           TEXT NOT NULL,
    email          TEXT NOT NULL,
    whatsapp       TEXT NOT NULL,
    nascimento     TEXT NOT NULL,
    indicacao      TEXT,
    cep            TEXT NOT NULL,
    logradouro     TEXT NOT NULL,
    bairro         TEXT NOT NULL,
    cidade         TEXT NOT NULL,
    uf             TEXT NOT NULL,
    numero_ref     TEXT,
    natureza       TEXT NOT NULL,
    protocolo      TEXT,
    assunto        TEXT NOT NULL,
    detalhamento   TEXT NOT NULL,
    anexos         TEXT,
    data_criacao   TEXT DEFAULT (datetime('now', 'localtime')),
    status         TEXT DEFAULT 'novo'
  );
`);

export default db;
