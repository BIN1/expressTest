let env=process.env.NODE_ENV;
let Sequelize=require('sequelize');
let mysql=require('mysql');
const configDebug=require('debug')('exdebug:config');
configDebug(env);
const { sql, port, glh_sql } = require(`./${env}.config.js`);

const connection = mysql.createConnection({
  host:sql.host,
  user:sql.user,
  password:sql.password,
  database:sql.database,
  port:sql.port
});
module.exports = {
  connection,
  sql,
  port,
  glh_sql,
  mysql
};