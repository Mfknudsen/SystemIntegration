import { DataSource } from 'typeorm';
import { Address, Booking, Customer, Insurance, Location, OtherInfo, PaymentDetails, Trailer } from './entities/entities';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../config.env') });

const databaseName = 'sqOla1';

console.log('Database name:', databaseName); // eslint-disable-line no-console
export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.DATABASE_URL,
  database: databaseName,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: true,
  entities: [ Address, Booking, Customer, Insurance, Location, OtherInfo, PaymentDetails, Trailer ],
});