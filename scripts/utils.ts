import { resolve } from 'path'
import { fileURLToPath } from 'url'

export function resolvePath(...paths: string[]): string {
  return resolve(fileURLToPath(import.meta.url), '..', '..', ...paths)
}