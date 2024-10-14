import { DataSource } from 'typeorm';
import { Warehouses } from './entities/Warehouses';
import { Jobs } from './entities/Jobs';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../config.env') });


const isTestEnvironment = process.env.NODE_ENV === 'test';
const databaseName = isTestEnvironment ? 'sqOla1Test' : 'sqOla1';

console.log('Database name:', databaseName); // eslint-disable-line no-console
export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.DATABASE_URL,
  database: databaseName,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: true,
  entities: [Warehouses, Jobs],
});