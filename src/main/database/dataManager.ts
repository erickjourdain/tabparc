import BetterSqlite from 'better-sqlite3'

const dbPath = '/Users/erickjourdain/Programmation/Data/tabparc.db'

const db: BetterSqlite.Database = new BetterSqlite(dbPath)
db.pragma('journal_mode = WAL')

export default db
