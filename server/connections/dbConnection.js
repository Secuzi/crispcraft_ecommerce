const sql = require("mssql");

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: "BLESSY",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};
// let pool;
// const connectionString = async () => {
//   try {
//     if (!pool) {
//       pool = await sql.connect(sqlConfig);
//       console.log(`Connected to the database!`);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

const poolPromise = new sql.ConnectionPool(sqlConfig)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Database Connection Failed! Bad Config:", err);
    throw err;
  });

module.exports = { sql, poolPromise };
