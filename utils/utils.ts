export function removeNullOrUndefined(update){
    for (const key in update) {
        if (update[key] === null || update[key] === undefined) {
          delete update[key];
        }
      }
      return update
}

export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
  }
