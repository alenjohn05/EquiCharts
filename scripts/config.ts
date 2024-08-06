import { version } from '../package.json'

export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV === 'production'
export const env = process.env.NODE_ENV
export { version }