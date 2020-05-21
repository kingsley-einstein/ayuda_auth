import express from "express";
import morgan from "morgan";
import db from "./db";
import config from "./config";

/**
 * 
 * @param {void} callback 
 */
const configure = (callback) => callback(morgan, express);

const app = express();
const { sequelize } = db;

configure(config(app));

app.listen(process.env.PORT, async () => {
  console.log(`Express server is running`);
  if (process.env.NODE_ENV !== "test") {
    const s = await sequelize.sync();
    if (s) console.log("Sequelize connected");
  }
});

export default app;
