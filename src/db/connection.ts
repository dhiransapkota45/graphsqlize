import { Sequelize } from "sequelize";
// import pg from "pg";

export const sequelize = new Sequelize(
  process.env.postgres_db || "Graphql",
  process.env.postgres_user || "postgres",
  process.env.postgres_pass || "admin",
  {
    host: process.env.postgres_host || "localhost",
    dialect: "postgres",
    //this is used when the default postgres driver given by sequelize is not enough
    //i was using it beacuse it is causing some error while running on docker
    // dialectModule : pg
  }
);

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
