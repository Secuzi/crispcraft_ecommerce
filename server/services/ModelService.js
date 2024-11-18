// services/ModelService.js
const { poolPromise } = require("../connections/dbConnection");

class ModelService {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async getAll() {
    try {
      const pool = await poolPromise;
      const query = `SELECT * FROM ${this.tableName}`;
      const result = await pool.request().query(query);
      return result.recordset;
    } catch (e) {
      console.log(e);
    }
  }

  async getByField(fieldName, value) {
    try {
      const pool = await poolPromise;

      // Construct the SQL query to select a record by a specified field
      const query = `SELECT * FROM ${this.tableName} WHERE ${fieldName} = @value`;

      // Set up the request with the specified value as a parameter
      const request = pool.request();
      request.input("value", value); // Automatically infers the SQL type
      // Execute the query and get the result
      const result = await request.query(query);

      // Return the record if found, or null if no record matches the criteria
      return result.recordset.length ? result.recordset[0] : null;
    } catch (e) {
      console.log(e);
      return null; // Return null if there was an error
    }
  }

  async create(data) {
    try {
      const pool = await poolPromise;
      const columns = Object.keys(data).join(", ");
      const valuesPlaceholders = Object.keys(data)
        .map((_, index) => `@val${index}`)
        .join(", ");

      const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${valuesPlaceholders}); SELECT SCOPE_IDENTITY() AS id;`;

      const request = pool.request();
      Object.values(data).forEach((val, index) => {
        request.input(`val${index}`, val);
      });

      const result = await request.query(query);
      return result.recordset[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getAllWithProperty(propertyName) {
    try {
      const pool = await poolPromise;

      const query = `SELECT * FROM ${this.tableName} WHERE ${propertyName} = @value`;
      const result = await pool
        .request()
        .input("value", propertyName)
        .query(query);
      return result.recordset;
    } catch (e) {
      console.log(e);
    }
  }

  // First parameter is the value of the id
  //Second parameter is the name of the primary key
  async read(id, primaryKey = "id") {
    try {
      const pool = await poolPromise;

      const query = `SELECT * FROM ${this.tableName} WHERE ${primaryKey} = @id`;
      const result = await pool.request().input("id", id).query(query);
      return result.recordset[0];
    } catch (e) {
      console.log(e);
    }
  }

  async update(id, data, primaryKey = "id") {
    try {
      const pool = await poolPromise;

      const updates = Object.keys(data)
        .map((key, index) => `${key} = @val${index}`) // Use indexed placeholders
        .join(", ");

      const query = `UPDATE ${this.tableName} SET ${updates} WHERE ${primaryKey} = @id`;
      const request = pool.request();
      request.input("id", id);

      Object.values(data).forEach((value, index) => {
        request.input(`val${index}`, value);
      });
      await request.query(query);
      return { message: "Update successful" };
    } catch (e) {
      console.log(e);
      throw new Error("Update failed");
    }
  }

  async delete(id, primaryKey = "id") {
    const pool = await poolPromise;
    const query = `DELETE FROM ${this.tableName} WHERE ${primaryKey} = @id`;
    await pool.request().input("id", id).query(query);
    return { message: "Delete successful" };
  }
}

module.exports = ModelService;
