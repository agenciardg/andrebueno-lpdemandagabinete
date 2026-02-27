import express from "express";
import cors from "cors";
import multer from "multer";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import db from "./db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;

// ---------------------------------------------------------------------------
// App setup
// ---------------------------------------------------------------------------
const app = express();

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"] }));
app.use(express.json());

// ---------------------------------------------------------------------------
// File-upload setup (multer)
// ---------------------------------------------------------------------------
const uploadsDir = resolve(__dirname, "uploads");
if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true });
}

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".pdf", ".docx", ".xlsx"]);
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, uploadsDir);
  },
  filename(_req, file, cb) {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = extname(file.originalname).toLowerCase();
    cb(null, `${unique}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter(_req, file, cb) {
    const ext = extname(file.originalname).toLowerCase();
    if (ALLOWED_EXTENSIONS.has(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Tipo de arquivo nao permitido: ${ext}`));
    }
  },
});

// Serve uploaded files statically
app.use("/uploads", express.static(uploadsDir));

// ---------------------------------------------------------------------------
// Prepared statements
// ---------------------------------------------------------------------------
const insertStmt = db.prepare(`
  INSERT INTO demandas (
    nome, email, whatsapp, nascimento, indicacao,
    cep, logradouro, bairro, cidade, uf, numero_ref,
    natureza, assunto, detalhamento, anexos
  ) VALUES (
    @nome, @email, @whatsapp, @nascimento, @indicacao,
    @cep, @logradouro, @bairro, @cidade, @uf, @numero_ref,
    @natureza, @assunto, @detalhamento, @anexos
  )
`);

const updateProtocoloStmt = db.prepare(`
  UPDATE demandas SET protocolo = @protocolo WHERE id = @id
`);

const selectAllStmt = db.prepare(`
  SELECT * FROM demandas ORDER BY data_criacao DESC
`);

const selectByIdStmt = db.prepare(`
  SELECT * FROM demandas WHERE id = ?
`);

// ---------------------------------------------------------------------------
// Helper: generate protocolo string  GAB-YYYY-NNNNN
// ---------------------------------------------------------------------------
function gerarProtocolo(id) {
  const year = new Date().getFullYear();
  const padded = String(id).padStart(5, "0");
  return `GAB-${year}-${padded}`;
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// POST /api/demandas  --  create a new demanda
app.post("/api/demandas", upload.array("anexos", 10), (req, res) => {
  try {
    const {
      nome,
      email,
      whatsapp,
      nascimento,
      indicacao,
      cep,
      logradouro,
      bairro,
      cidade,
      uf,
      numero_ref,
      natureza,
      assunto,
      detalhamento,
    } = req.body;

    // Basic validation
    const required = { nome, email, whatsapp, nascimento, cep, logradouro, bairro, cidade, uf, natureza, assunto, detalhamento };
    const missing = Object.entries(required)
      .filter(([, v]) => !v || String(v).trim() === "")
      .map(([k]) => k);

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Campos obrigatorios ausentes: ${missing.join(", ")}`,
      });
    }

    // Collect uploaded file names
    const fileNames = (req.files || []).map((f) => f.filename);

    // Insert into database (wrapped in a transaction for atomicity)
    const result = db.transaction(() => {
      const info = insertStmt.run({
        nome: nome.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        nascimento: nascimento.trim(),
        indicacao: indicacao ? indicacao.trim() : null,
        cep: cep.trim(),
        logradouro: logradouro.trim(),
        bairro: bairro.trim(),
        cidade: cidade.trim(),
        uf: uf.trim(),
        numero_ref: numero_ref ? numero_ref.trim() : null,
        natureza: natureza.trim(),
        assunto: assunto.trim(),
        detalhamento: detalhamento.trim(),
        anexos: fileNames.length > 0 ? JSON.stringify(fileNames) : null,
      });

      const id = Number(info.lastInsertRowid);
      const protocolo = gerarProtocolo(id);

      updateProtocoloStmt.run({ protocolo, id });

      return { id, protocolo };
    })();

    return res.status(201).json({
      success: true,
      id: result.id,
      protocolo: result.protocolo,
    });
  } catch (err) {
    console.error("Erro ao criar demanda:", err);
    return res.status(500).json({ success: false, error: "Erro interno do servidor." });
  }
});

// GET /api/demandas  --  list all demandas
app.get("/api/demandas", (_req, res) => {
  try {
    const rows = selectAllStmt.all();

    // Parse the anexos JSON string back into an array for each row
    const demandas = rows.map((row) => ({
      ...row,
      anexos: row.anexos ? JSON.parse(row.anexos) : [],
    }));

    return res.json(demandas);
  } catch (err) {
    console.error("Erro ao listar demandas:", err);
    return res.status(500).json({ success: false, error: "Erro interno do servidor." });
  }
});

// GET /api/demandas/:id  --  get single demanda
app.get("/api/demandas/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ success: false, error: "ID invalido." });
    }

    const row = selectByIdStmt.get(id);
    if (!row) {
      return res.status(404).json({ success: false, error: "Demanda nao encontrada." });
    }

    return res.json({
      ...row,
      anexos: row.anexos ? JSON.parse(row.anexos) : [],
    });
  } catch (err) {
    console.error("Erro ao buscar demanda:", err);
    return res.status(500).json({ success: false, error: "Erro interno do servidor." });
  }
});

// ---------------------------------------------------------------------------
// Global error handler (catches multer errors, etc.)
// ---------------------------------------------------------------------------
app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ success: false, error: "Arquivo excede o limite de 50 MB." });
    }
    return res.status(400).json({ success: false, error: err.message });
  }

  if (err) {
    console.error("Erro nao tratado:", err);
    return res.status(500).json({ success: false, error: err.message || "Erro interno do servidor." });
  }
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
