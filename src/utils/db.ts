import knex from "knex";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexfile = require("../../knexfile");

const environment = process.env.NODE_ENV || "development";
const config = knexfile[environment];

const db = knex(config);

db.raw("SELECT 1")
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err.message);
  });

 export default db as any;

