import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, "events.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

/** Čisté SQL – jen DB model (“CREATE TABLE…”) */
db.exec(`
CREATE TABLE IF NOT EXISTS events (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  title      TEXT    NOT NULL,
  location   TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS event_dates (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id  INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  timestamp INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS votes (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  date_id INTEGER NOT NULL REFERENCES event_dates(id) ON DELETE CASCADE,
  name    TEXT    NOT NULL,
  answer  TEXT    NOT NULL CHECK (answer IN ('yes','no','maybe'))
);

CREATE INDEX IF NOT EXISTS idx_event_dates_event ON event_dates(event_id);
CREATE INDEX IF NOT EXISTS idx_votes_date ON votes(date_id);
`);

export default db;
