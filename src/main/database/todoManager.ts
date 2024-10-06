import dbMgr from './dataManager'

const readAllTodo = (): unknown[] => {
  try {
    const query = `SELECT * FROM todo`
    const readQuery = dbMgr.prepare(query)
    const rowList = readQuery.all()
    return rowList
  } catch (err) {
    console.error(err)
    throw err
  }
}

const insertTodo = (titre: string, statut: string): void => {
  try {
    const insertQuery = dbMgr.prepare(
      'INSERT INTO todo (titre, statut, created_at, updated_at) VALUES (? , ?, ?, ?)'
    )

    const transaction = dbMgr.transaction(() => {
      const now = Date.now()
      insertQuery.run(titre, statut, now, now)
    })
    transaction()
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default {
  readAllTodo,
  insertTodo
}
