/**
 * Class de gestion des erreurs de l'application
 */
class AppError extends Error {
  num: number

  constructor(num: number = 100, ...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }

    this.name = 'BackOfficeError'
    this.num = num
  }
}
