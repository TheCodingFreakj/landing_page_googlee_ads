import { createConnection } from "mysql";
import variableEnv from "./db.config.js";

// Create a connection to the database
const connection = createConnection({
  host: variableEnv.HOST,
  user: variableEnv.USER,
  password: variableEnv.PASSWORD,
  database: variableEnv.DB,
  port: variableEnv.PORTDB,
});

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default connection;
