import { Sequelize } from "sequelize";
import pg from "pg"

// const sequelize = new Sequelize({
//   dialect: "postgres",
//   host: "your_postgres_container",
//   port: 5432,
//   password: "password",
//   username: "dhiran",
//   database: "dhiran",
//   dialectModule : pg
// });

const sequelize = new Sequelize(
  process.env.postgres_db,
  process.env.postgres_user,
  process.env.postgres_pass,
  {
    host: process.env.postgres_host,
    dialect: "postgres",
    dialectModule : pg
  }
  );

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
