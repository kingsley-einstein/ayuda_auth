import { Sequelize, DataTypes } from "sequelize";
import { AuthModel, TokenModel } from "./model";
import configure from "./config";

const models = { AuthModel, TokenModel };

// console.log(configure[process.env.NODE_ENV]);

const sequelize = new Sequelize(
  configure[process.env.NODE_ENV]
);   
const db = { sequelize };

Object.keys(models).forEach((key) => {
  db[key] = models[key](sequelize, DataTypes);
});

export default db;
