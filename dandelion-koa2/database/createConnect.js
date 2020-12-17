const mysql = require("./node_modules/mysql");
const config = require("../config");
const dbConfig = config.database;

const pool = mysql.createPool({
  connectionLimit: dbConfig.connectionLimit,
  host: dbConfig.HOST,
  user: dbConfig.USERNAME,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE
});
// pool的监听事件，需要的话参考：https://www.npmjs.com/package/mysql#pool-events
pool.on("acquire", function(connection) {
  // console.log('Connection %d acquired', connection.threadId);
});
pool.on("release", function(connection) {
  // console.log('Connection %d released', connection.threadId);
});

let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};
// 查询 SELECT
let getUser = async () => {
  return await query(`SELECT * from user`);
};
// 插入 INSERT();
// 数组形式来传递参数
let addUser = async post => {
  await query(`INSERT INTO ?? set ?`, ["user", post]);
  return await getUser();
};
// 更新 PUT
let updateUser = async (table, values) => {
  let _sql = "UPDATE ?? SET ? WHERE id = ?";
  await query(_sql, [table, values, values.id]);
  // 更新之后似乎没法返回数据
  return await getUser();
};
// 删除 DELETE
let deleteUser = async (table, id) => {
  let _sql = "DELETE FROM ?? WHERE id = ?";
  await query(_sql, [table, id]);
  return await getUser();
};

module.exports = {
  query,
  getUser,
  addUser,
  updateUser,
  deleteUser
};
