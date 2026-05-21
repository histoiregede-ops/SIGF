const mysql = require('mysql2/promise');
async function main() {
  const connection = await mysql.createConnection({host:'localhost', user:'root', password:'', database:'nlf'});
  const [rows] = await connection.query('DESCRIBE aut_utilisateurs');
  console.log(rows);
  process.exit();
}
main();
