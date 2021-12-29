// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../config/config.json');
import { Sequelize } from 'sequelize';

const environment = process.env.NODE_ENV ?? 'development';
const connectionOptions = config[environment];

const connectionOptionsFromEnv = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
};

Object.keys(connectionOptionsFromEnv)
  .filter((key) => !!connectionOptionsFromEnv[key])
  .forEach((key) => (connectionOptions[key] = connectionOptionsFromEnv[key]));

export const sequelize = new Sequelize(connectionOptions);
