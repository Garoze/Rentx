import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: port,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
  entities: [`${__dirname}/../../../../src/modules/**/infra/typeorm/entities/*.{ts,js}`],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
})

export function createConnection(host = process.env.DB_HOST || 'localhost'): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}
