export default {
  client: 'better-sqlite3',
  connection: {
    filename: './db/safetycerts.sqlite3',
  },
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
  useNullAsDefault: true
}