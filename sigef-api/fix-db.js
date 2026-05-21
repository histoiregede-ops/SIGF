const mysql = require('mysql2/promise');

async function main() {
  const connection = await mysql.createConnection({host:'localhost', user:'root', password:'', database:'nlf'});
  try {
    console.log("Fixing aut_centres_conservation_fonciere...");
    await connection.query('ALTER TABLE aut_centres_conservation_fonciere CHANGE COLUMN nom libelle VARCHAR(255) NOT NULL');
    await connection.query('ALTER TABLE aut_centres_conservation_fonciere ADD COLUMN adresse TEXT');
    await connection.query('ALTER TABLE aut_centres_conservation_fonciere ADD COLUMN contact VARCHAR(20)');
    console.log("Done.");
  } catch (e) { console.error(e.message); }

  try {
    console.log("Fixing aut_roles_profil...");
    await connection.query('ALTER TABLE aut_roles_profil DROP PRIMARY KEY');
    await connection.query('ALTER TABLE aut_roles_profil ADD COLUMN id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT FIRST');
    console.log("Done.");
  } catch (e) { console.error(e.message); }

  process.exit();
}
main();
