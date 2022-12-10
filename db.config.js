import * as dotenv from "dotenv";
dotenv.config();

const variableEnv = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  PORTDB: process.env.PORTDB,
};

export default variableEnv;
