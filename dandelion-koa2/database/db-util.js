const { query } = require("./createConnect");

let createTable = function(sql) {
  return query(sql, []);
};

let findDataById = function(table, id) {
  let _sql = "SELECT * FROM ?? WHERE id = ? ";
  return query(_sql, [table, id, start, end]);
};

let findDataByPage = function(table, keys, start, end) {
  let _sql = "SELECT ?? FROM ??  LIMIT ? , ?";
  return query(_sql, [keys, table, start, end]);
};

let insertData = function(table, values) {
  let _sql = "INSERT INTO ?? SET ?";
  return query(_sql, [table, values]);
};

let updateData = function(table, values, id) {
  let _sql = "UPDATE ?? SET ? WHERE id = ?";
  return query(_sql, [table, values, id]);
};
// 增量更新
let insertOrUpdateData = async function(table, values, id) {
  id = id || values.id;
  try {
    await insertData(table, values);
  } catch (e) {
    if (!id) {
      throw Error(e);
    }
    console.log("update: ******************* ", e.sqlMessage);
    await updateData(table, values, id);
  }
};

let deleteDataById = function(table, id) {
  let _sql = "DELETE FROM ?? WHERE id = ?";
  return query(_sql, [table, id]);
};

let select = function(table, keys) {
  let _sql = "SELECT ?? FROM ?? ";
  return query(_sql, [keys, table]);
};

let count = function(table) {
  let _sql = "SELECT COUNT(*) AS total_count FROM ?? ";
  return query(_sql, [table]);
};

module.exports = {
  query,
  createTable,
  findDataById,
  findDataByPage,
  deleteDataById,
  insertData,
  updateData,
  insertOrUpdateData,
  select,
  count
};
