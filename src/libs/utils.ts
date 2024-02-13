export const handleError = (error: unknown) => {
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}
