module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    'dist/entities/*.entity{.ts,.js}'
  ],
  migrations: [
    'dist/migrations/*{.ts,.js}'
  ],
  seeds: [
    'seeders/**/*{.ts,.js}'
  ],
  cli: {
    migrationsDir: 'migrations',
    entitiesDir: 'entities',
  },
}