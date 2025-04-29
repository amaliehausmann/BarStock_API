import { Sequelize } from "sequelize";
import dotenv from "dotenv";

//Giver adgang til variabler fra .env filen
dotenv.config();

if (
  !process.env.DB_NAME ||
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_HOST
) {
  console.error(
    "Error: Can not connect to database because of missing credentials."
  );
  process.exit(1);
}

const sequelize = new Sequelize(
  //Databasens navn
  process.env.DB_NAME,

  //Brugernavn til databasen
  process.env.DB_USER,

  //Adgangskode til databasen
  process.env.DB_PASSWORD,
  {
    //Database serverens addresse
    host: process.env.DB_HOST,

    //Porten til databasen
    port: process.env.DB_PORT || 3306,

    //Database type
    dialect: "mysql",
  }
);


sequelize.authenticate().then(() => {
  console.log("Connection to database has been established successfully.");
}).catch((err) => {
  console.error("Unable to connect to the database:", err);
});

export default sequelize;