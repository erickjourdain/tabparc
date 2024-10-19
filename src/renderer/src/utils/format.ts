/**
 * Première lettre de chaque mot en majuscule
 * @param chaine string chaine à formater
 * @returns chaine formatée
 */
const wordLetterUpperCase = (chaine: string) => {
  return chaine.trim().replace(/(^\w{1})|(\s+\w{1})|(-+\w{1})/g, (letter) => letter.toUpperCase())
}

export { wordLetterUpperCase }
