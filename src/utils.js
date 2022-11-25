import { app } from './stores.js'

export function buildUrl(action) {
  return `${$app.baseUrl}/${action}?u=${$app.username}&p=${$app.password}${$app.defaultQuerySrings}`
}
