// services/ModelService.js
const { poolPromise } = require("../connections/dbConnection");

class ModelService {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async getAll() {
    try {
      console.log(`Table name: ${this.tableName}`);
      const pool = await poolPromise;
      const query = `SELECT * FROM ${this.tableName}`;
      const result = await pool.request().query(query);
      return result.recordset;
    } catch (e) {
      console.log(e);
    }
  }

  async create(data) {
    try {
      const pool = await poolPromise;
      const columns = Object.keys(data).join(", ");

      const values = Object.values(data)
        .map((val) => `'${val}'`)
        .join(", ");
      console.log(`Columns: ${columns}`);
      console.log(`Values: ${values}`);

      const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${values}); SELECT SCOPE_IDENTITY() AS id;`;
      const result = await pool.request().query(query);
      return result.recordset[0];
    } catch (e) {
      console.log(e);
    }
  }

  async read(id, primaryKey = "id") {
    try {
      console.log(`Table name: ${this.tableName}`);
      const pool = await poolPromise;
      const query = `SELECT * FROM ${this.tableName} WHERE ${primaryKey} = @id`;
      const result = await pool.request().input("id", id).query(query);
      console.log(`Record set: ${result.recordset}`);
      return result.recordset[0];
    } catch (e) {
      console.log(e);
    }
  }

  async update(id, data, primaryKey = "id") {
    const pool = await poolPromise;
    const updates = Object.keys(data)
      .map((key) => `${key} = '${data[key]}'`)
      .join(", ");
    const query = `UPDATE ${this.tableName} SET ${updates} WHERE ${primaryKey} = @id`;
    await pool.request().input("id", id).query(query);
    return { message: "Update successful" };
  }

  async delete(id, primaryKey = "id") {
    const pool = await poolPromise;
    const query = `DELETE FROM ${this.tableName} WHERE ${primaryKey} = @id`;
    await pool.request().input("id", id).query(query);
    return { message: "Delete successful" };
  }
}

module.exports = ModelService;
