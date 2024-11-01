const yearFromdate = (date: Date) => {
  return date.getFullYear()
}

const monthFromDate = (date: Date) => {
  return date.toLocaleDateString().substring(3, 5)
}

const dayFromDate = (date: Date) => {
  return date.toLocaleDateString().substring(7, 9)
}

export { yearFromdate, monthFromDate, dayFromDate }
