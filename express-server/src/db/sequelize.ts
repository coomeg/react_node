import * as fs from 'fs';
import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';

const env       = process.env.NODE_ENV || 'test';
const config    = require('../config/db_config.json')[env];

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: config.host,
    username: config.username,
    password: config.password,
    database: config.database,
    modelPaths: [__dirname + '/models/*.model.*'],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    },
});
sequelize.sync();