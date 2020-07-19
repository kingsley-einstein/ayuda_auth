import express from "express";
import morgan from "morgan";
import db from "./db";
import config from "./config";
import { CloudConfig, Eureka } from "./spring-cloud";
import env from "./env";

/**
 * 
 * @param {void} callback 
 */
const configure = (callback) => callback(morgan, express);

const app = express();
const { sequelize } = db;

configure(config(app));

const conf = new CloudConfig();

app.listen(process.env.PORT, async () => {
  console.log(`Express server is running`);
  if (process.env.NODE_ENV !== "test") {
    console.log("Running in " + process.env.NODE_ENV + " on port " + process.env.PORT);
    const s = await sequelize.sync();
    // console.log(s);
    if (s) console.log("Sequelize connected");
    console.log(s);
    await conf.load(env.cloud.url, env.cloud.name, env.cloud.profiles);
    // console.log(conf.getProperty("eureka.instance.id"), "-----");
    const eureka = new Eureka(
      conf.getProperty("eureka.instance.id"),
      conf.getProperty("eureka.instance.name"),
      conf.getProperty("eureka.instance.ip"),
      conf.getProperty("eureka.instance.vipAddress"),
      conf.getProperty("eureka.instance.hostname"),
      conf.getProperty("eureka.url")
    );
    eureka.start();
  }
});

export default app;
