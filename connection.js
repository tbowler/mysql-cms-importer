import _  from 'lodash';
import tables from './table_definitions.js';
import mysql  from 'mysql';
class Connection {
  constructor(host, user, password, database, table) {
    this.host = host;
    this.user = user;
    this.password = password;
    this.database = database;
    this.connection = null;
    this.table = tables[table];
  }

  create () {
    return new Promise(async (resolve, reject) => {
      try {
        var connection = mysql.createConnection({
          host: this.host,
          user: this.user,
          password: this.password,
          database: this.database,
        });
        connection.connect();
        console.log('DB Connected');
        this.connection = connection;
        await this.createTable();
        resolve();
      } catch (error) {
        console.error('Unable to connect to database');
        console.error(error);
        reject(error);
      } 
    });
  }

  runQuery (query) {
    return new Promise((resolve, reject) => {
      try {
        this.connection.query(query, function (error, results, fields) {
          if (error) {
            console.error('result error', error);
            throw error;
          }

          resolve();
        });
      } catch (error) {
        console.error('Unable to connect to database');
        console.error(error);
        reject(error);
      } 
    })
  }

  runInsertQuery(values) {
    return new Promise(async (resolve, reject) => {
      try {
        const q = `INSERT INTO ${this.database}.${this.table.name} (${this.table.fields}) VALUES (${values})`;
        await this.runQuery(q);
        resolve();  
      } catch (error) {
        console.error(error);
        throw error;
        reject(error);
      }
    });
  }

  createTable () {
    return new Promise(async(resolve, reject) => {
      try {
        const query = `CREATE TABLE IF NOT EXISTS ${this.database}.${this.table.name} (${this.table.structure}) ENGINE=${this.table.engine}`;
        await this.runQuery(query);
        resolve();
      } catch (error) {
        console.error('Unable to connect to database');
        console.error(error);
        reject(error);
      } 
    });
  }
  
  close () {
    this.connection.end();
    this.connection = null;
    console.log('DB Closed');
  }  
}

export default Connection
