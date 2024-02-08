export const handleError = (error: unknown) => {
  console.log('🚀 ~ handleError ~ error:', error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}
