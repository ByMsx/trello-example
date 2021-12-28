const config = require('../config/config.json');
import { Sequelize } from "sequelize";

const environment = process.env.NODE_ENV ?? 'development';

export const sequelize = new Sequelize(config[environment]);
